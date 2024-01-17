import { REQUEST_METHOD_METADATA, CONTROLLER_METADATA, IRequest } from '@libs/index';
import { ClassConstructor } from '@libs/types';

class MetadataScanner {
  public hasRequestMethodMetadata(target: ClassConstructor): boolean {
    return this.hasMetadata(REQUEST_METHOD_METADATA, target);
  }

  public hasControllerMetadata(target: ClassConstructor): boolean {
    return this.hasMetadata(CONTROLLER_METADATA, target);
  }

  public getRequestMethodMetadata(target: ClassConstructor): IRequest[] {
    return this.getMetadata(REQUEST_METHOD_METADATA, target) as IRequest[];
  }

  public getControllerMetadata(target: ClassConstructor): string {
    return this.getMetadata(CONTROLLER_METADATA, target) as string;
  }

  public hasMetadata(metadataKey: string | symbol, target: ClassConstructor): boolean {
    return Reflect.hasMetadata(metadataKey, target);
  }

  public getMetadata(metadataKey: string | symbol, target: ClassConstructor): unknown {
    return Reflect.getMetadata(metadataKey, target);
  }
}

export const metadataScanner = new MetadataScanner();
