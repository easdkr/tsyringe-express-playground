/* eslint-disable @typescript-eslint/ban-types */
import { container } from 'tsyringe';
import { IRequest, REQUEST_METHOD_METADATA } from './libs/decorators/requests';

export class RouterRegister {
  readonly #app: Express.Application;

  constructor(app: Express.Application) {
    this.#app = app;
  }

  public static create(app: Express.Application): RouterRegister {
    return new RouterRegister(app);
  }

  public explore(controllers: unknown[]): void {
    controllers.map(container.resolve.bind(container)).map((controller) => {
      const routers: IRequest[] = Reflect.getMetadata(
        REQUEST_METHOD_METADATA,
        controller.constructor,
      );

      routers.forEach((route) => {
        this.#app[route.requestMethod](
          route.path,
          controller[route.methodName].bind(controller),
        );
      });
    });
  }
}
