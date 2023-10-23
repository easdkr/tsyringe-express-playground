import 'reflect-metadata';
import express from 'express';
import { RouterRegister } from './router.register';
import { AppController } from './controllers';

const app = express();
const routerRegister = RouterRegister.create(app);
routerRegister.explore([AppController]);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
