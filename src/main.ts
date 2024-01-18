import 'reflect-metadata';
import express from 'express';
import { env } from '@config/index';
import { appRouter } from '../libs';
import { DATASOURCE, DataSource } from '@libs/database';
import { container } from 'tsyringe';

env();

async function bootstrap(): Promise<void> {
  const dataSource = new DataSource({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    max: 20,
  });

  container.register(DATASOURCE, { useValue: dataSource });
  require('./controllers');
  const app = express();
  app.use(appRouter);
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}

bootstrap();
