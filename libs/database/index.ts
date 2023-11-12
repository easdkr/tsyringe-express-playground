import { Client, ClientConfig } from 'pg';

export const initDb = async (options: ClientConfig): Promise<Client> => {
  const client = new Client({
    user: options.user,
    host: options.host,
    database: options.database,
    password: options.password,
    port: options.port,
  });

  await client.connect();

  return client;
};
