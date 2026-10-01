import { pool } from "../utils/database.js";
import { generateReference } from "../utils/reference.js";

export async function createDemande(d) {
  const { rows } = await pool.query(
    `INSERT INTO demandes(reference,citoyen_id,type_demande,statut,point_service_id) VALUES($1,$2,$3,'brouillon',$4) RETURNING *`,
    [generateReference(), d.citoyenId, d.typeDemande, d.pointServiceId || null],
  );
  return rows[0];
}
export async function findById(id) {
  const { rows } = await pool.query(
    `SELECT d.*, p.nom point_service_nom, p.arrondissement point_service_arrondissement FROM demandes d LEFT JOIN points_service p ON p.id=d.point_service_id WHERE d.id=$1`,
    [id],
  );
  return rows[0];
}
export async function findForCitizen(id, citizenId) {
  const { rows } = await pool.query(
    "SELECT * FROM demandes WHERE id=$1 AND citoyen_id=$2",
    [id, citizenId],
  );
  return rows[0];
}
export async function findActiveByCitizen(citizenId) {
  const { rows } = await pool.query(
    `SELECT * FROM demandes WHERE citoyen_id=$1 AND statut NOT IN ('retiree','refusee') ORDER BY created_at DESC LIMIT 1`,
    [citizenId],
  );
  return rows[0];
}
export async function list(filters) {
  const page = Math.max(1, Number(filters.page || 1)),
    limit = Math.min(100, Math.max(1, Number(filters.limit || 20))),
    offset = (page - 1) * limit;
  const vals = [];
  const where = [];
  if (filters.citoyenId) {
    vals.push(filters.citoyenId);
    where.push(`citoyen_id=$${vals.length}`);
  }
  if (filters.statut) {
    vals.push(filters.statut);
    where.push(`statut=$${vals.length}`);
  }
  const w = where.length ? `WHERE ${where.join(" AND ")}` : "";
  const count = await pool.query(`SELECT COUNT(*) FROM demandes ${w}`, vals);
  const { rows } = await pool.query(
    `SELECT * FROM demandes ${w} ORDER BY created_at DESC LIMIT $${vals.length + 1} OFFSET $${vals.length + 2}`,
    [...vals, limit, offset],
  );
  return { rows, total: Number(count.rows[0].count), page, limit };
}
export async function updateInformations(id, d) {
  const { rows } = await pool.query(
    `UPDATE demandes SET nom=$1,prenom=$2,date_naissance=$3,lieu_naissance=$4,sexe=$5,adresse=$6,nom_pere=$7,nom_mere=$8,point_service_id=COALESCE($9,point_service_id),updated_at=NOW() WHERE id=$10 RETURNING *`,
    [
      d.nom,
      d.prenom,
      d.dateNaissance,
      d.lieuNaissance,
      d.sexe,
      d.adresse,
      d.nomPere,
      d.nomMere,
      d.pointServiceId || null,
      id,
    ],
  );
  return rows[0];
}
export async function submit(id) {
  const { rows } = await pool.query(
    `UPDATE demandes SET statut='soumise',submitted_at=NOW(),modification_deadline=NOW()+INTERVAL '2 hours',updated_at=NOW() WHERE id=$1 RETURNING *`,
    [id],
  );
  return rows[0];
}
export async function changeStatus(id, status, extra = {}) {
  const keys = Object.keys(extra);
  const sets = ["statut=$1", "updated_at=NOW()"];
  const vals = [status];
  for (const k of keys) {
    vals.push(extra[k]);
    sets.push(`${k}=$${vals.length}`);
  }
  vals.push(id);
  const { rows } = await pool.query(
    `UPDATE demandes SET ${sets.join(", ")} WHERE id=$${vals.length} RETURNING *`,
    vals,
  );
  return rows[0];
}
export async function addHistory(d) {
  await pool.query(
    `INSERT INTO demande_historique(demande_id,user_id,ancien_statut,nouveau_statut,commentaire) VALUES($1,$2,$3,$4,$5)`,
    [
      d.demandeId,
      d.userId || null,
      d.oldStatus || null,
      d.newStatus,
      d.comment || null,
    ],
  );
}
export async function addPiece(d) {
  const { rows } = await pool.query(
    `INSERT INTO pieces(demande_id,type_piece,nom_fichier,chemin,mime_type,taille) VALUES($1,$2,$3,$4,$5,$6) RETURNING *`,
    [d.demandeId, d.typePiece, d.nom, d.path, d.mime, d.size],
  );
  return rows[0];
}
export async function pieces(id) {
  const { rows } = await pool.query(
    "SELECT * FROM pieces WHERE demande_id=$1 ORDER BY created_at",
    [id],
  );
  return rows;
}
export async function addAppointment(d) {
  const { rows } = await pool.query(
    `INSERT INTO rendez_vous(demande_id,point_service_id,date_rendez_vous) VALUES($1,$2,$3) RETURNING *`,
    [d.demandeId, d.pointServiceId, d.date],
  );
  return rows[0];
}
export async function appointment(id) {
  const { rows } = await pool.query(
    `SELECT r.*,p.nom point_service_nom,p.adresse point_service_adresse FROM rendez_vous r JOIN points_service p ON p.id=r.point_service_id WHERE r.demande_id=$1`,
    [id],
  );
  return rows[0];
}
