import { pool } from "../utils/database.js";
export async function findByEmail(email) {
  const { rows } = await pool.query("SELECT * FROM users WHERE email=$1", [
    email,
  ]);
  return rows[0];
}
export async function createUser(d) {
  const { rows } = await pool.query(
    `INSERT INTO users(nom,prenom,email,telephone,password_hash,role) VALUES($1,$2,$3,$4,$5,$6) RETURNING id,nom,prenom,email,telephone,role,created_at`,
    [d.nom, d.prenom, d.email, d.telephone || null, d.passwordHash, "citoyen"],
  );
  return rows[0];
}
export async function findPublicById(id) {
  const { rows } = await pool.query(
    "SELECT id,nom,prenom,email,telephone,role,created_at FROM users WHERE id=$1",
    [id],
  );
  return rows[0];
}
