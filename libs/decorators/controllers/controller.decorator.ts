import { container, singleton } from 'tsyringe';
import { DEFAULT_PATH, VALID_PATH_REGEX } from '@libs/decorators/index';
import { reflector, metadataScanner } from '@libs/metadata';
import { appRouter } from '@libs/app.router';

export function Controller(path = DEFAULT_PATH): ClassDecorator {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (target: any) => {
    singleton()(target);
    container.registerSingleton(target, target);
    const instance = container.resolve(target);

    reflector.defineControllerMetadata(path, target);
    if (!metadataScanner.hasRequestMethodMetadata(target)) {
      reflector.defineRequestMethodMetadata([], target);
    }

    const validatePath = path === DEFAULT_PATH ? true : VALID_PATH_REGEX.test(path);
    if (!validatePath) return;

    const requests = metadataScanner.getRequestMethodMetadata(target);
    requests.forEach(({ path: requestPath, methodName, requestMethod }) => {
      const requestPathWithControllerPath = path === DEFAULT_PATH ? requestPath : `${path}${requestPath}`;
      console.log(`Registering ${requestMethod.toUpperCase()} ${requestPathWithControllerPath}`);
      appRouter[requestMethod](requestPathWithControllerPath, instance[methodName].bind(instance));
    });
  };
}
