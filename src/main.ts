import 'reflect-metadata';
import express from 'express';
import { RouterRegister } from './router.register';
import { AppController } from './controllers';
import { env } from '@config/index';
import { initDb } from '@libs/database';
import { container } from 'tsyringe';

env();
async function bootstrap(): Promise<void> {
  const pgClient = await initDb({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });

  container.register('pgClient', { useValue: pgClient });

  const app = express();
  const routerRegister = RouterRegister.create(app);
  routerRegister.explore([AppController]);

  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}

bootstrap();
