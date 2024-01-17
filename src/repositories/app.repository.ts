import { Inject, Injectable } from '@libs/decorators';
import { DATASOURCE } from '@libs/database';
import { Pool } from 'pg';

@Injectable()
export class AppRepository {
  constructor(@Inject(DATASOURCE) private readonly pgClient: Pool) {
    console.log('AppRepository created');
  }

  public async now(): Promise<boolean> {
    const queryres = await this.pgClient.query('SELECT now()');

    return !!queryres.rows[0].now;
  }
}
