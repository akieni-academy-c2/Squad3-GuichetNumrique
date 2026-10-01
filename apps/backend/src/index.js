import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "node:fs";
import { initializeDatabase } from "./utils/database.js";
import authRoutes from "./routes/authRoutes.js";
import demandeRoutes from "./routes/demandeRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import pointsServiceRoutes from "./routes/pointsServiceRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import { notFound, errorHandler } from "./middlewares/errorHandler.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
fs.mkdirSync(process.env.UPLOAD_DIR || "uploads", { recursive: true });
app.use(cors({ origin: "*" }));
app.use(express.json());
app.get("/api/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/auth", authRoutes);
app.use("/api/demandes", demandeRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/points-service", pointsServiceRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use(notFound);
app.use(errorHandler);
async function start() {
  try {
    await initializeDatabase();
    app.listen(PORT, () => console.log(`API CNI: http://localhost:${PORT}`));
  } catch (e) {
    console.error("Impossible de démarrer:", e);
    process.exit(1);
  }
}
start();
