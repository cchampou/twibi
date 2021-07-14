import * as mongoose from 'mongoose';
import { logError, logInfo } from '../utils/logger';

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
const uri = `mongodb://${username}:${password}@${process.env.DATABASE_DOMAIN}:${process.env.DATABASE_PORT}?poolSize=20&writeConcern=majority`;

class Database {
  db;

  constructor() {
    this.connect();
  }

  connect() {
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'admin' }).then((_) => null).catch(logError);
    this.db = mongoose.connection;
    this.db.on('error', () => logError('Fail to connect to db'));
    this.db.once('open', () => {
      logInfo('Connected to db');
    });
  }
}

export default new Database();
