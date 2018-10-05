import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
/* let sslValue;
if (process.env === 'production') {
  sslValue = true;
} else {
  sslValue = false;
} */

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

class QueryDb {
  query(text, values, callback) {
    return pool.query(text, values, callback);
  }
}

const queryDb = new QueryDb();
export default queryDb;
