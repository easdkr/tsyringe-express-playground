import { Request, Response } from 'express';
import { AppService } from '../services';
import { singleton } from 'tsyringe';
import { Get } from '@libs/decorators';

@singleton()
export class AppController {
  constructor(private readonly _appService: AppService) {}

  @Get()
  public sayHello(_req: Request, res: Response): void {
    res.send(this._appService.sayHello());
  }
}
