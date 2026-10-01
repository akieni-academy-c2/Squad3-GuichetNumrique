import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcryptjs";
import { pool, initializeDatabase } from "./utils/database.js";
await initializeDatabase();
const hash = await bcrypt.hash("Admin123!", 12);

await pool.query(
  `INSERT INTO users(nom,prenom,email,password_hash,role) VALUES('Administrateur','CNI','admin@cni.local',$1,'admin') ON CONFLICT(email) DO UPDATE SET password_hash=EXCLUDED.password_hash,role='admin'`,
  [hash],
);
await pool.query(
  `INSERT INTO points_service(nom,arrondissement,adresse) VALUES ('Centre CNI Mfilou','Mfilou','Mfilou') ON CONFLICT DO NOTHING`,
);
console.log("Seed terminé. admin@cni.local / Admin123!");
await pool.end();
