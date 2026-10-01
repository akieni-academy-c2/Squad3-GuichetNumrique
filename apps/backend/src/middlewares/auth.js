import jwt from "jsonwebtoken";
import { pool } from "../utils/database.js";

export async function authenticate(req, res, next) {
  try {
    const h = req.headers.authorization;
    if (!h?.startsWith("Bearer ")) {
      const e = new Error("Token requis.");
      e.statusCode = 401;
      throw e;
    }
    const payload = jwt.verify(h.slice(7), process.env.JWT_SECRET);
    const { rows } = await pool.query(
      "SELECT id,nom,prenom,email,telephone,role FROM users WHERE id=$1",
      [payload.sub],
    );
    if (!rows[0]) {
      const e = new Error("Utilisateur introuvable.");
      e.statusCode = 401;
      throw e;
    }
    req.user = rows[0];
    next();
  } catch (e) {
    e.statusCode = e.name === "JsonWebTokenError" ? 401 : e.statusCode || 401;
    next(e);
  }
}
export function authorize(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      const e = new Error("Accès interdit.");
      e.statusCode = 403;
      return next(e);
    }
    next();
  };
}
