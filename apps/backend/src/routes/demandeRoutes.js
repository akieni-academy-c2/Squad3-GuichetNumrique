import express from "express";
import * as c from "../controllers/demandeController.js";
import { authenticate, authorize } from "../middlewares/auth.js";
import { uploadPiece } from "../middlewares/upload.js";
const r = express.Router();

r.post("/", authenticate, authorize("citoyen"), c.create);
r.get("/", authenticate, c.list);
r.get("/:id", authenticate, c.mine);
r.put("/:id", authenticate, authorize("citoyen"), c.update);
r.post("/:id/pieces", authenticate, authorize("citoyen"), uploadPiece, c.piece);
r.get("/:id/pieces", authenticate, authorize("citoyen"), c.pieces);
r.post("/:id/soumettre", authenticate, authorize("citoyen"), c.submit);
r.post("/:id/verification",
  authenticate,
  authorize("agent", "admin"),
  c.verify,
);
r.post("/:id/complement",
  authenticate,
  authorize("agent", "admin"),
  c.complement,
);
r.put("/:id/correction", authenticate, authorize("citoyen"), c.correct);
r.post("/:id/valider", authenticate, authorize("agent", "admin"), c.validate);
r.post("/:id/refuser", authenticate, authorize("agent", "admin"), c.refuse);
r.post("/:id/rendez-vous",
  authenticate,
  authorize("agent", "admin"),
  c.appointment,
);
r.post("/:id/empreintes",
  authenticate,
  authorize("agent", "admin"),
  c.biometric,
);
r.post("/:id/deliberation",
  authenticate,
  authorize("agent", "admin"),
  c.deliberation,
);
r.post("/:id/disponible",
  authenticate,
  authorize("agent", "admin"),
  c.available,
);
r.post("/:id/retrait", authenticate, authorize("agent", "admin"), c.withdraw);
export default r;
