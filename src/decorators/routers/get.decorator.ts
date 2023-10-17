import { IRouter } from './interfaces';
import { ROUTE_METADATA } from './router.constants';

export const Get = (path = '/'): MethodDecorator => {
  return (target: unknown, propertyKey: string | symbol): void => {
    if (!Reflect.hasMetadata(ROUTE_METADATA, target.constructor)) {
      Reflect.defineMetadata(ROUTE_METADATA, [], target.constructor);
    }

    const routers = Reflect.getMetadata(
      ROUTE_METADATA,
      target.constructor,
    ) as IRouter[];

    routers.push({
      path,
      requestMethod: 'get',
      methodName: propertyKey as string,
    });

    Reflect.defineMetadata(ROUTE_METADATA, routers, target.constructor);
  };
};
