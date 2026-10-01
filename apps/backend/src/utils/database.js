import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pg;
export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export async function initializeDatabase() {
  const fs = await import("node:fs/promises");
  const path = await import("node:path");
  const sql = await fs.readFile(
    path.join(process.cwd(), "database", "schema.sql"),
    "utf8",
  );
  await pool.query(sql);
}
