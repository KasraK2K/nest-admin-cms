import { resolve } from 'node:path';
import { Sequelize } from 'sequelize';

const config = {
  storage: resolve(process.cwd(), 'database/database.sqlite'),
  database: 'db',
  user: 'user',
  password: 'password',
  sync: { force: true },
};

export const sqlite = new Sequelize(
  config.database,
  config.user,
  config.password,
  {
    dialect: 'sqlite',
    storage: config.storage,
    logging: false,
  },
);

process.nextTick(async () => {
  try {
    await sqlite.authenticate();
    await sqlite.sync();
    console.log('sqlite is connected.');
  } catch (error) {
    console.error('error on sqlite connection.');
  }
});

export default sqlite;
