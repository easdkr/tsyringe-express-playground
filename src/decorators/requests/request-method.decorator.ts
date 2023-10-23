import { IRequest, REQUEST_METHOD_METADATA, VALID_PATH_REGEX } from '.';
import { RequestMethod } from './enums';

export interface RequestMethodOptions {
  method: RequestMethod;
  path?: string;
}

export const defaultPath = '/';

export const requestMethod = ({
  method,
  path = defaultPath,
}: RequestMethodOptions): MethodDecorator => {
  return (target: unknown, propertyKey: string | symbol): void => {
    if (!Reflect.hasMetadata(REQUEST_METHOD_METADATA, target.constructor))
      Reflect.defineMetadata(REQUEST_METHOD_METADATA, [], target.constructor);

    const requests = Reflect.getMetadata(
      REQUEST_METHOD_METADATA,
      target.constructor,
    ) as IRequest[];

    const isDuplicatePath = requests.some(
      (req) => req.path === path && req.requestMethod === 'get',
    );

    const validatePath =
      path === defaultPath ? true : VALID_PATH_REGEX.test(path);

    if (isDuplicatePath || !validatePath) return;

    requests.push({
      path,
      requestMethod: method,
      methodName: propertyKey as string,
    });

    Reflect.defineMetadata(
      REQUEST_METHOD_METADATA,
      requests,
      target.constructor,
    );
  };
};

export const createRequestMethodDecorator =
  (method: RequestMethod) =>
  (path?: string): MethodDecorator =>
    requestMethod({ method, path });

export const Get = createRequestMethodDecorator(RequestMethod.GET);
