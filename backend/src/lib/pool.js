import { Pool } from "pg";
import env from "../config/env.js";
export default new Pool({
  connectionString: env.DB_URI,
  ssl: env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});
