import express from "express";
import * as c from "../controllers/notificationController.js";
import { authenticate } from "../middlewares/auth.js";

const r = express.Router();
r.get("/", authenticate, c.list);
r.patch("/:id/read", authenticate, c.read);
export default r;
