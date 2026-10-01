import multer from "multer";
import path from "node:path";
import fs from "node:fs";

const dir = process.env.UPLOAD_DIR || "uploads";

fs.mkdirSync(dir, { recursive: true });
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, dir),
  filename: (req, file, cb) =>
    cb(
      null,
      `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`,
    ),
});
export const uploadPiece = multer({
  storage,
  limits: {
    fileSize: Number(process.env.MAX_FILE_SIZE_MB || 10) * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowed = ["application/pdf", "image/jpeg", "image/png"];
    cb(null, allowed.includes(file.mimetype));
  },
}).single("fichier");
