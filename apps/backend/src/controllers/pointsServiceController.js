import { pool } from "../utils/database.js";
export async function list(req, res, next) {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM points_service WHERE actif=true ORDER BY nom",
    );
    res.json({ data: rows });
  } catch (e) {
    next(e);
  }
}
export async function create(req, res, next) {
  try {
    const { nom, arrondissement, adresse, telephone } = req.body;
    if (!nom || !arrondissement) {
      const e = new Error("nom et arrondissement sont obligatoires.");
      e.statusCode = 422;
      throw e;
    }
    const { rows } = await pool.query(
      "INSERT INTO points_service(nom,arrondissement,adresse,telephone) VALUES($1,$2,$3,$4) RETURNING *",
      [nom, arrondissement, adresse || null, telephone || null],
    );
    res.status(201).json({ data: rows[0] });
  } catch (e) {
    next(e);
  }
}
export async function update(req, res, next) {
  try {
    const { rows } = await pool.query(
      "UPDATE points_service SET nom=COALESCE($1,nom),arrondissement=COALESCE($2,arrondissement),adresse=COALESCE($3,adresse),telephone=COALESCE($4,telephone),actif=COALESCE($5,actif),updated_at=NOW() WHERE id=$6 RETURNING *",
      [
        req.body.nom,
        req.body.arrondissement,
        req.body.adresse,
        req.body.telephone,
        req.body.actif,
        req.params.id,
      ],
    );
    if (!rows[0]) {
      const e = new Error("Point de service introuvable.");
      e.statusCode = 404;
      throw e;
    }
    res.json({ data: rows[0] });
  } catch (e) {
    next(e);
  }
}
export async function remove(req, res, next) {
  try {
    const { rowCount } = await pool.query(
      "UPDATE points_service SET actif=false WHERE id=$1",
      [req.params.id],
    );
    if (!rowCount) {
      const e = new Error("Point de service introuvable.");
      e.statusCode = 404;
      throw e;
    }
    res.status(204).send();
  } catch (e) {
    next(e);
  }
}
