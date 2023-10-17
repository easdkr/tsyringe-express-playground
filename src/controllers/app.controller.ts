import { injectable } from 'tsyringe';
import { Get } from '../decorators/routers';
import { Request, Response } from 'express';

@injectable()
export class AppController {
  @Get()
  public sayHello(_req: Request, res: Response): void {
    res.send('hello world!');
  }
}
