import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as users from "../repositories/userRepository.js";

export async function register(req, res, next) {
  try {
    const { nom, prenom, email, telephone, password } = req.body;
    if (!nom || !prenom || !email || !password) {
      const e = new Error("nom, prenom, email et password sont obligatoires.");
      e.statusCode = 422;
      throw e;
    }
    if (await users.findByEmail(email)) {
      const e = new Error("Cet email est déjà utilisé.");
      e.statusCode = 409;
      throw e;
    }
    const u = await users.createUser({
      nom,
      prenom,
      email: email.toLowerCase(),
      telephone,
      passwordHash: await bcrypt.hash(password, 12),
    });
    res.status(201).json({ data: u });
  } catch (e) {
    next(e);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body,
      u = await users.findByEmail(email?.toLowerCase());
    if (!u || !(await bcrypt.compare(password || "", u.password_hash))) {
      const e = new Error("Email ou mot de passe incorrect.");
      e.statusCode = 401;
      throw e;
    }
    const token = jwt.sign(
      { sub: u.id, role: u.role },
      process.env.JWT_SECRET,
      { expiresIn: "8h" },
    );
    res.json({
      token,
      user: {
        id: u.id,
        nom: u.nom,
        prenom: u.prenom,
        email: u.email,
        role: u.role,
      },
    });
  } catch (e) {
    next(e);
  }
}
export async function me(req, res) {
  res.json({ data: req.user });
}
