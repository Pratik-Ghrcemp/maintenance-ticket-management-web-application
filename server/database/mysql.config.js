import { env } from '../config/env.js';

export const mysqlConfig = {
  url: env.databaseUrl,
  provider: 'mysql'
};
