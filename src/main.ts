import 'reflect-metadata';
import { container, singleton } from 'tsyringe';

interface IBar {
  info(): string;
}

@singleton()
class Foo {
  constructor() {
    console.log('Foo instantiated');
  }

  public info(): string {
    return `This instance is Foo`;
  }
}

class Bar implements IBar {
  private name = 'John';

  constructor() {
    console.log('Bar instantiated');
  }

  public info(): string {
    return `This Bar name is ${this.name}`;
  }
}

const foo = container.resolve(Foo);
const bar: IBar = container
  .register<IBar>('Bar', { useClass: Bar })
  .resolve('Bar');

console.log(foo.info());
console.log(bar.info());
