import { REQUEST_METHOD_METADATA, CONTROLLER_METADATA } from '@libs/index';

class Reflector {
  public defineRequestMethodMetadata(metadataValue: unknown, target: unknown): void {
    this.defineMetadata(REQUEST_METHOD_METADATA, metadataValue, target);
  }

  public defineControllerMetadata(metadataValue: unknown, target: unknown): void {
    this.defineMetadata(CONTROLLER_METADATA, metadataValue, target);
  }

  public defineMetadata(metadataKey: string | symbol, metadataValue: unknown, target: unknown): void {
    Reflect.defineMetadata(metadataKey, metadataValue, target);
  }
}

export const reflector = new Reflector();
