import { pool } from "../utils/database.js";
export async function index(req, res, next) {
  try {
    const { rows } = await pool.query(
      `SELECT statut,COUNT(*)::int total FROM demandes GROUP BY statut ORDER BY statut`,
    );
    const { rows: today } = await pool.query(
      `SELECT COUNT(*)::int total FROM demandes WHERE created_at::date=CURRENT_DATE`,
    );
    res.json({ data: { demandesAujourdhui: today[0].total, parStatut: rows } });
  } catch (e) {
    next(e);
  }
}
