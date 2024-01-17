import { ClientConfig, Pool } from 'pg';

export const createDataSource = async (options: ClientConfig): Promise<Pool> => {
  const client = new Pool({
    user: options.user,
    host: options.host,
    database: options.database,
    password: options.password,
    port: options.port,
    max: 10,
  });

  await client.connect();

  return client;
};
