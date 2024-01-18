import { BaseDatasourceException } from '@libs/database/exceptions';
import { Injectable } from '@libs/decorators';
import { Pool, PoolConfig, PoolClient } from 'pg';

@Injectable()
export class DataSource {
  private readonly _pool: Pool;

  public constructor(config: PoolConfig) {
    this._pool = new Pool(config);
  }

  public async query<T = unknown>(query: string, param?: unknown[]): Promise<T[]> {
    return await this._pool
      .query(query, param)
      .then((res) => res.rows)
      .catch((err) => {
        console.error(err);
        throw err;
      });
  }

  public async transaction<T>(callback: (client: PoolClient) => Promise<T>): Promise<T> {
    const client = await this._createTransactionClient();
    try {
      await client.query('BEGIN');
      const result = await callback(client);
      await client.query('COMMIT');

      return result;
    } catch (e) {
      await client.query('ROLLBACK');
      throw new BaseDatasourceException(e.message, 'E-DATASOURCE-001');
    } finally {
      client.release();
    }
  }

  private async _createTransactionClient(): Promise<PoolClient> {
    return await this._pool.connect();
  }

  public async close(): Promise<void> {
    await this._pool.end();
  }
}
