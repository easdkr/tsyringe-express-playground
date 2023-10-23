import { injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { AppService } from '../services';
import { Get } from '../decorators/requests/request-method.decorator';

@injectable()
export class AppController {
  constructor(private readonly _appService: AppService) {}

  @Get()
  public sayHello(_req: Request, res: Response): void {
    res.send(this._appService.sayHello());
  }
}
