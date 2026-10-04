import express from "express";
import { index } from "../controllers/dashboardController.js";
import { authenticate, authorize } from "../middlewares/auth.js";

const r = express.Router();

/**
 * Disable authorization
 *
 * J'ai supprimé l'autorisation ici
 */
r.get("/", authenticate, /*authorize("agent", "admin"),*/ index);
export default r;
