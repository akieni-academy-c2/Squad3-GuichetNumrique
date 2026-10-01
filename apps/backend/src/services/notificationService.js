import { pool } from "../utils/database.js";
export async function notify({ userId, demandeId, titre, message }) {
  const { rows } = await pool.query(
    `INSERT INTO notifications(user_id,demande_id,titre,message) VALUES($1,$2,$3,$4) RETURNING *`,
    [userId, demandeId, titre, message],
  );
  return rows[0];
}
export async function listNotifications(userId) {
  const { rows } = await pool.query(
    "SELECT * FROM notifications WHERE user_id=$1 ORDER BY created_at DESC",
    [userId],
  );
  return rows;
}
export async function readNotification(id, userId) {
  const { rows } = await pool.query(
    "UPDATE notifications SET lue=true WHERE id=$1 AND user_id=$2 RETURNING *",
    [id, userId],
  );
  return rows[0];
}
