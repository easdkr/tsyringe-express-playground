import { DEFAULT_PATH, IRequest, REQUEST_METHOD_METADATA, VALID_PATH_REGEX } from '@libs/decorators';
import { RequestMethod } from '@libs/decorators/requests/enums';

export interface RequestMethodOptions {
  method: RequestMethod;
  path?: string;
}

export const requestMethod = ({ method, path = DEFAULT_PATH }: RequestMethodOptions): MethodDecorator => {
  return (target: unknown, propertyKey: string | symbol): void => {
    if (!Reflect.hasMetadata(REQUEST_METHOD_METADATA, target.constructor))
      Reflect.defineMetadata(REQUEST_METHOD_METADATA, [], target.constructor);

    const requests = Reflect.getMetadata(REQUEST_METHOD_METADATA, target.constructor) as IRequest[];

    const isDuplicatePath = requests.some((req) => req.path === path && req.requestMethod === method);

    const validatePath = path === DEFAULT_PATH ? true : VALID_PATH_REGEX.test(path);

    if (isDuplicatePath || !validatePath) return;
    requests.push({
      path,
      requestMethod: method,
      methodName: propertyKey as string,
    });

    Reflect.defineMetadata(REQUEST_METHOD_METADATA, requests, target.constructor);
  };
};

export const createRequestMethodDecorator =
  (method: RequestMethod) =>
  (path?: string): MethodDecorator =>
    requestMethod({ method, path });

export const Get = createRequestMethodDecorator(RequestMethod.GET);

export const Post = createRequestMethodDecorator(RequestMethod.POST);

export const Put = createRequestMethodDecorator(RequestMethod.PUT);

export const Patch = createRequestMethodDecorator(RequestMethod.PATCH);

export const Delete = createRequestMethodDecorator(RequestMethod.DELETE);

export const Options = createRequestMethodDecorator(RequestMethod.OPTIONS);
