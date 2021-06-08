// @ts-ignore
import StormDB from 'stormdb';

class Database {
  private readonly engine;

  db;

  constructor() {
    // eslint-disable-next-line new-cap
    this.engine = new StormDB.localFileEngine('./db.stormdb');
    this.db = new StormDB(this.engine);
    this.db.default({ commands: [] });
  }
}

export default new Database();
