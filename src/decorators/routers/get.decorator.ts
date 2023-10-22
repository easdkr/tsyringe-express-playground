import { IRouter } from './interfaces';
import { ROUTE_METADATA, VALID_ROUTE_PATH_REGEX } from './router.constants';

export const Get = (path = '/'): MethodDecorator => {
  return (target: unknown, propertyKey: string | symbol): void => {
    if (!Reflect.hasMetadata(ROUTE_METADATA, target.constructor)) {
      Reflect.defineMetadata(ROUTE_METADATA, [], target.constructor);
    }

    const routers = Reflect.getMetadata(
      ROUTE_METADATA,
      target.constructor,
    ) as IRouter[];

    const isDuplicatePath = routers.some(
      (router) => router.path === path && router.requestMethod === 'get',
    );

    const isValidPathFormat = VALID_ROUTE_PATH_REGEX.test(path);

    if (isDuplicatePath || !isValidPathFormat) return;

    routers.push({
      path,
      requestMethod: 'get',
      methodName: propertyKey as string,
    });

    Reflect.defineMetadata(ROUTE_METADATA, routers, target.constructor);
  };
};
