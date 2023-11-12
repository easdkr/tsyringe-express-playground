import { singleton } from 'tsyringe';

@singleton()
export class AppService {
  constructor() {
    console.log('AppService constructor');
  }

  public sayHello(): string {
    return 'hello world!';
  }
}
