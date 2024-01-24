import * as dotenv from 'dotenv';
dotenv.config();
export const DB_CONFIG = {
  HOST: process.env.DB_HOST,
  PORT: process.env.DB_PORT,
  USERNAME: process.env.DB_USERNAME,
  PASSWORD: process.env.DB_PASSWORD,
  NAME: process.env.DB_NAME,
};
