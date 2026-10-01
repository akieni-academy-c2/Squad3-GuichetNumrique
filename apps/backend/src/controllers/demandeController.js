import * as s from "../services/demandeService.js";
import {
  validateCreate,
  validateInformations,
} from "../validators/demandeValidator.js";

export async function create(req, res, next) {
  try {
    validateCreate(req.body);
    res
      .status(201)
      .json({
        message: "Demande CNI créée.",
        data: await s.create(req.user.id, {
          typeDemande: req.body.typeDemande,
          pointServiceId: req.body.pointServiceId,
        }),
      });
  } catch (e) {
    next(e);
  }
}

export async function mine(req, res, next) {
  try {
    const x = await s.get(
      req.params.id,
      req.user,
      ["agent", "admin"].includes(req.user.role),
    );
    res.json({ data: x });
  } catch (e) {
    next(e);
  }
}

export async function list(req, res, next) {
  try {
    const r = await s.list({
      page: req.query.page,
      limit: req.query.limit,
      statut: req.query.statut,
      citoyenId: req.user.role === "citoyen" ? req.user.id : null,
    });
    res.json({
      data: r.rows,
      pagination: {
        page: r.page,
        limit: r.limit,
        total: r.total,
        totalPages: Math.ceil(r.total / r.limit),
      },
    });
  } catch (e) {
    next(e);
  }
}

export async function update(req, res, next) {
  try {
    validateInformations(req.body);
    res.json({
      message: "Demande mise à jour.",
      data: await s.update(req.params.id, req.user, req.body),
    });
  } catch (e) {
    next(e);
  }
}

export async function submit(req, res, next) {
  try {
    res.json({
      message: "Demande soumise.",
      data: await s.submit(req.params.id, req.user),
    });
  } catch (e) {
    next(e);
  }
}

export async function piece(req, res, next) {
  try {
    if (!req.file) {
      const e = new Error("Fichier requis.");
      e.statusCode = 422;
      throw e;
    }
    if (!["acte_naissance", "photo_identite"].includes(req.body.typePiece)) {
      const e = new Error(
        "typePiece doit être acte_naissance ou photo_identite.",
      );
      e.statusCode = 422;
      throw e;
    }
    res
      .status(201)
      .json({
        message: "Pièce ajoutée.",
        data: await s.addPiece(
          req.params.id,
          req.user,
          req.file,
          req.body.typePiece,
        ),
      });
  } catch (e) {
    next(e);
  }
}

export async function pieces(req, res, next) {
  try {
    res.json({ data: await s.listPieces(req.params.id, req.user) });
  } catch (e) {
    next(e);
  }
}

export async function verify(req, res, next) {
  try {
    res.json({ data: await s.startVerification(req.params.id, req.user) });
  } catch (e) {
    next(e);
  }
}

export async function complement(req, res, next) {
  try {
    res.json({
      data: await s.complement(req.params.id, req.user, req.body.motif),
    });
  } catch (e) {
    next(e);
  }
}

export async function correct(req, res, next) {
  try {
    validateInformations(req.body);
    res.json({ data: await s.correct(req.params.id, req.user, req.body) });
  } catch (e) {
    next(e);
  }
}

export async function validate(req, res, next) {
  try {
    res.json({ data: await s.validate(req.params.id, req.user) });
  } catch (e) {
    next(e);
  }
}

export async function refuse(req, res, next) {
  try {
    res.json({ data: await s.refuse(req.params.id, req.user, req.body.motif) });
  } catch (e) {
    next(e);
  }
}

export async function appointment(req, res, next) {
  try {
    if (!req.body.pointServiceId || !req.body.date) {
      const e = new Error("pointServiceId et date sont obligatoires.");
      e.statusCode = 422;
      throw e;
    }
    res.json(await s.appointment(req.params.id, req.user, req.body));
  } catch (e) {
    next(e);
  }
}

export async function biometric(req, res, next) {
  try {
    res.json({ data: await s.biometric(req.params.id, req.user) });
  } catch (e) {
    next(e);
  }
}

export async function deliberation(req, res, next) {
  try {
    res.json({ data: await s.deliberation(req.params.id, req.user) });
  } catch (e) {
    next(e);
  }
}

export async function available(req, res, next) {
  try {
    res.json({ data: await s.available(req.params.id, req.user) });
  } catch (e) {
    next(e);
  }
}

export async function withdraw(req, res, next) {
  try {
    res.json({ data: await s.withdraw(req.params.id, req.user) });
  } catch (e) {
    next(e);
  }
}
