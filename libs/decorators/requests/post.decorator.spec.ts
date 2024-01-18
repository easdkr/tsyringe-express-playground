import { IRequest, REQUEST_METHOD_METADATA } from '.';
import { Post } from './request-method.decorator';

describe('@Post', () => {
  it('should add a route definition to the class metadata', async () => {
    // given
    class TestController {
      @Post('/test')
      public postTestRouter(): string {
        return 'test';
      }
    }

    // when
    const routes: IRequest[] = Reflect.getMetadata(REQUEST_METHOD_METADATA, TestController);

    // then
    expect(routes).toHaveLength(1);
    expect(routes[0].path).toBe('/test');
    expect(routes[0].requestMethod).toBe('post');
    expect(routes[0].methodName).toBe('postTestRouter');
  });

  it('should not allow duplicate paths', async () => {
    // given
    class TestController {
      @Post('/test')
      public postTestRouter(): string {
        return 'test';
      }

      @Post('/test')
      public postTestRouter2(): string {
        return 'test';
      }
    }

    // when
    const routes: IRequest[] = Reflect.getMetadata(REQUEST_METHOD_METADATA, TestController);

    // then
    expect(routes).toHaveLength(1);
    expect(routes[0].methodName).toBe('postTestRouter');
  });

  it('should handle invalid path format', async () => {
    // given
    class InvalidPathController {
      @Post('/test/')
      public postTestRouter(): string {
        return 'test';
      }
    }

    // when
    const routes: IRequest[] = Reflect.getMetadata(REQUEST_METHOD_METADATA, InvalidPathController);

    // then
    expect(routes).toHaveLength(0);
  });

  it('should handle missing path', async () => {
    // given
    class MissingPathController {}

    // when
    const routes: IRequest[] = Reflect.getMetadata(REQUEST_METHOD_METADATA, MissingPathController);

    // then
    expect(routes).toBeUndefined();
  });
});
