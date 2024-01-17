/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { inject } from 'tsyringe';

export const Inject = (token: symbol | string) => inject(token);
