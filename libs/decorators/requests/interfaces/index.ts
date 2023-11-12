import { RequestMethod } from '../enums';

export interface IRequest {
  path: string;
  requestMethod: RequestMethod;
  methodName: string;
}
