import { Request, Response } from 'express';
import { singleton } from 'tsyringe';
import { Get, Post } from '@libs/decorators';
import { AppService } from '@/services';

@singleton()
export class AppController {
  constructor(private readonly _appService: AppService) {}

  @Get()
  public sayHello(_req: Request, res: Response): void {
    res.send(this._appService.sayHello());
  }

  @Post('/health')
  public async healthCheck(_req: Request, res: Response): Promise<void> {
    const health = await this._appService.health();
    res.send(health);
  }
}
