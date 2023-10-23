import { injectable } from 'tsyringe';

@injectable()
export class AppService {
  constructor() {
    console.log('AppService constructor');
  }

  public sayHello(): string {
    return 'hello world!';
  }
}
