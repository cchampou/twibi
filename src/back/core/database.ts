// @ts-ignore
import StormDB from 'stormdb';

class Database {
  private readonly engine;

  private db;

  constructor() {
    // eslint-disable-next-line new-cap
    this.engine = new StormDB.localFileEngine('./db.stormdb');
    this.db = new StormDB(this.engine);
  }
}

export default new Database();
