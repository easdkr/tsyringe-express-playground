export interface IRouter {
  path: string;
  requestMethod: 'get' | 'post' | 'put' | 'patch' | 'delete';
  methodName: string;
}
