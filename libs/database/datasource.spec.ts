/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';
import { DataSource } from '@libs/database';
import { BaseDatasourceException } from '@libs/database/exceptions';
import { env } from '@config/index';

env();

describe('DataSource', () => {
  let dataSource: DataSource;

  beforeAll(async () => {
    dataSource = new DataSource({
      user: process.env.POSTGRES_USER,
      host: process.env.POSTGRES_HOST,
      database: process.env.POSTGRES_DB,
      password: process.env.POSTGRES_PASSWORD,
    });
  });

  beforeAll(async () => {
    // create test table
    const query = `
        CREATE TABLE IF NOT EXISTS test (
          id SERIAL PRIMARY KEY,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          title VARCHAR(255) NOT NULL,
          content TEXT NOT NULL
        );
      `;
    await dataSource.query(query);

    // insert test data
    const insert = `
        INSERT INTO test (title, content)
        VALUES ('test title', 'test content'), ('test title 2', 'test content 2')
      `;
    await dataSource.query(insert);
  });

  afterAll(async () => {
    // drop test table
    const query = `DROP TABLE IF EXISTS test;`;
    await dataSource.query(query);
    await dataSource.close();
  });

  describe('query', () => {
    it('simple query', async () => {
      // given
      const query = 'SELECT * FROM test';

      // when
      const queryres = await dataSource.query(query);

      // then
      expect(queryres.length).toBeGreaterThan(1);
    });
  });

  describe('transaction', () => {
    it('transaction success', async () => {
      // given
      const query1 = 'INSERT INTO test (title, content) VALUES ($1, $2) RETURNING *';
      const values1 = ['test title 3', 'test content 3'];

      const query2 = 'INSERT INTO test (title, content) VALUES ($1, $2) RETURNING *';
      const values2 = ['test title 4', 'test content 4'];

      // when
      const result = await dataSource.transaction(async (client) => {
        const res1 = await client.query(query1, values1);
        const res2 = await client.query(query2, values2);

        return [res1.rows, res2.rows];
      });

      // then
      expect(result.length).toBeGreaterThan(1);
    });

    it('transaction fail', async () => {
      // given
      const query1 = 'INSERT INTO test (title, content) VALUES ($1, $2) RETURNING *';
      const values1 = ['test title 5', 'test content 3'];

      const query2 = 'INSERT INTO test (title, content) VALUES ($1, $2) RETURNING *';
      const values2 = ['test title 6', 'test content 4'];

      // when
      try {
        await dataSource.transaction(async (client) => {
          await client.query(query1, values1);
          await client.query(query2, values2);

          throw new Error('test');
        });
      } catch (e) {
        console.error(e);
      }

      // then
      const query = 'SELECT * FROM test';
      const queryres = await dataSource.query(query);
      expect(queryres.find((item: any) => item.title === 'test title 5')).toBeUndefined();
      expect(queryres.find((item: any) => item.title === 'test title 6')).toBeUndefined();
    });

    it('should be throw BaseDatasourceException on fail', async () => {
      // given
      const query1 = 'INSERT INTO test (title, content) VALUES ($1, $2) RETURNING *';
      const values1 = ['test title 7', 'test content 3'];

      const query2 = 'INSERT INTO test (title, content) VALUES ($1, $2) RETURNING *';
      const values2 = ['test title 8', 'test content 4'];

      // when
      const transaction = dataSource.transaction(async (client) => {
        await client.query(query1, values1);
        await client.query(query2, values2);

        throw new Error('test');
      });

      // then
      await expect(transaction).rejects.toThrow(BaseDatasourceException);
    });
  });
});
