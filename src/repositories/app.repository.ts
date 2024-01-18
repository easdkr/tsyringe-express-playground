/* eslint-disable @typescript-eslint/no-explicit-any */
import { Inject, Injectable } from '@libs/decorators';
import { DATASOURCE, DataSource } from '@libs/database';

@Injectable()
export class AppRepository {
  constructor(@Inject(DATASOURCE) private readonly dataSource: DataSource) {
    console.log('AppRepository created');
  }

  public async now(): Promise<boolean> {
    const queryres: any[] = await this.dataSource.query('SELECT now()');

    return !!queryres[0].now;
  }
}
