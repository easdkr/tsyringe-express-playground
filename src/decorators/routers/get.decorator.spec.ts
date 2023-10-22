import 'reflect-metadata';
import { Get, IRouter, ROUTE_METADATA } from '.';

describe('@Get', () => {
  it('should add a route definition to the class metadata', async () => {
    //given
    class TestController {
      @Get('/test')
      public test(): string {
        return 'test';
      }
    }

    //when
    const routes: IRouter[] = Reflect.getMetadata(
      ROUTE_METADATA,
      TestController,
    );

    //then
    expect(routes).toHaveLength(1);
    expect(routes[0].path).toBe('/test');
    expect(routes[0].requestMethod).toBe('get');
    expect(routes[0].methodName).toBe('test');
  });

  it('should not allow duplicate paths', async () => {
    //given
    class TestController {
      @Get('/test')
      public test(): string {
        return 'test';
      }

      @Get('/test')
      public test2(): string {
        return 'test2';
      }
    }

    //when
    const routes: IRouter[] = Reflect.getMetadata(
      ROUTE_METADATA,
      TestController,
    );

    //then
    expect(routes).toHaveLength(1);
    expect(routes[0].methodName).toBe('test');
  });

  it('should handle invalid path format', async () => {
    //given
    class InvalidPathController {
      @Get('/test/')
      public test(): string {
        return 'test';
      }
    }

    //when
    const routes: IRouter[] = Reflect.getMetadata(
      ROUTE_METADATA,
      InvalidPathController,
    );
    //then

    expect(routes).toHaveLength(0);
  });

  it('should handle missing ROUTE_METADATA', async () => {
    //given
    class NoRoutesController {}

    //when
    const routes: IRouter[] = Reflect.getMetadata(
      ROUTE_METADATA,
      NoRoutesController,
    );

    //then
    expect(routes).toBeUndefined();
  });
});
