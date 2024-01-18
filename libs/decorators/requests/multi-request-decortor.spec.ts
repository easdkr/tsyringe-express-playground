import { Get, Post } from './request-method.decorator';
import { IRequest, REQUEST_METHOD_METADATA } from '@libs/decorators';

describe('MultiRequest', () => {
  it('should add a route definition to the class metadata', async () => {
    // given
    class TestController {
      @Get('/test')
      public test(): string {
        return 'test';
      }

      @Post('/test')
      public test2(): string {
        return 'test2';
      }
    }

    // when
    const routes: IRequest[] = Reflect.getMetadata(REQUEST_METHOD_METADATA, TestController);

    // then
    expect(routes).toHaveLength(2);
    expect(routes[0].path).toBe('/test');
    expect(routes[0].requestMethod).toBe('get');
    expect(routes[0].methodName).toBe('test');
    expect(routes[1].path).toBe('/test');
    expect(routes[1].requestMethod).toBe('post');
    expect(routes[1].methodName).toBe('test2');
  });
});
