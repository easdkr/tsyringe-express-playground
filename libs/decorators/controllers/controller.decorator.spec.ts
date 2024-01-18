import { metadataScanner } from '@libs/metadata';
import { Controller, Get } from '@libs/decorators';
import { container } from 'tsyringe';

describe('Controller decorator', () => {
  it('DI 컨테이너에 등록', async () => {
    // given
    @Controller()
    class TestController {
      public test(): string {
        return 'test';
      }
    }
    // when
    const testController = container.resolve(TestController);

    // then
    expect(testController.test()).toEqual('test');
  });

  it('Metadata 등록', async () => {
    // given
    @Controller('/test')
    class TestController {
      public test(): string {
        return 'test';
      }
    }

    // when
    const metadata = metadataScanner.getControllerMetadata(TestController);

    // then
    expect(metadata).toEqual('/test');
  });

  it('Metadata 등록 - default path', async () => {
    // given
    @Controller()
    class TestController {
      public test(): string {
        return 'test';
      }
    }

    // when
    const metadata = metadataScanner.getControllerMetadata(TestController);

    // then
    expect(metadata).toEqual('/');
  });

  it('Metadata 등록 - with request method', async () => {
    // given
    @Controller('/test')
    class TestController {
      @Get('/data')
      public testData(): string {
        return 'test data';
      }
    }

    // when
    const metadata = metadataScanner.getRequestMethodMetadata(TestController);
    // then
    expect(metadata).toEqual([
      {
        path: '/data',
        methodName: 'testData',
        requestMethod: 'get',
      },
    ]);
  });
});
