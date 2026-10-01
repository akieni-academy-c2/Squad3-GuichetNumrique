import express from "express";
import * as c from "../controllers/pointsServiceController.js";
import { authenticate, authorize } from "../middlewares/auth.js";

const r = express.Router();
r.get("/", c.list);
r.post("/", authenticate, authorize("admin"), c.create);
r.put("/:id", authenticate, authorize("admin"), c.update);
r.delete("/:id", authenticate, authorize("admin"), c.remove);
export default r;
