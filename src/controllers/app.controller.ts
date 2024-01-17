import { Request, Response } from 'express';
import { AppService } from '@/services';
import { Controller, Get } from '@libs/decorators';

@Controller()
export class AppController {
  constructor(private readonly _appService: AppService) {}

  @Get()
  public sayHello(_req: Request, res: Response): void {
    res.send(this._appService.sayHello());
  }

  @Get('/health')
  public async health(_req: Request, res: Response): Promise<void> {
    const health = await this._appService.health();
    res.send(health);
  }
}
