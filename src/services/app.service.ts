import { AppRepository } from '@/repositories';
import { Injectable } from '@libs/decorators';

@Injectable()
export class AppService {
  constructor(private readonly _appRepository: AppRepository) {}

  public sayHello(): string {
    return 'hello world!';
  }

  public async health(): Promise<boolean> {
    return await this._appRepository.now();
  }
}
