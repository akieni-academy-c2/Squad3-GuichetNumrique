import express from "express";
import { register, login, me } from "../controllers/authController.js";
import { authenticate } from "../middlewares/auth.js";

const r = express.Router();
r.post("/register", register);
r.post("/login", login);
r.get("/me", authenticate, me);
export default r;
