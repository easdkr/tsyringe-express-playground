import { Client } from 'pg';
import { inject, singleton } from 'tsyringe';

@singleton()
export class AppRepository {
  constructor(@inject('pgClient') private readonly pgClient: Client) {}

  public async now(): Promise<boolean> {
    const queryres = await this.pgClient.query('SELECT now()');

    return !!queryres.rows[0].now;
  }
}
