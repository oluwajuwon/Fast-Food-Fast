import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

class QueryDb {
  query(text, values, callback) {
    return pool.query(text, values, callback);
  }
}

const queryDb = new QueryDb();
export default queryDb;
