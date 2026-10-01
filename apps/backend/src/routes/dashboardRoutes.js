import express from "express";
import { index } from "../controllers/dashboardController.js";
import { authenticate, authorize } from "../middlewares/auth.js";

const r = express.Router();
r.get("/", authenticate, authorize("agent", "admin"), index);
export default r;
