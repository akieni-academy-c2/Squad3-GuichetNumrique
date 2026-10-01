import * as repo from "../repositories/demandeRepository.js";
import { pool } from "../utils/database.js";
import { STATUTS, canModify, assertStatus } from "../utils/workflow.js";
import { notify } from "./notificationService.js";

export async function create(citizenId, d) {
  const active = await repo.findActiveByCitizen(citizenId);
  if (active) {
    const e = new Error("Vous avez déjà une demande CNI en cours.");
    e.statusCode = 409;
    throw e;
  }
  const x = await repo.createDemande({ citoyenId: citizenId, ...d });
  await repo.addHistory({
    demandeId: x.id,
    userId: citizenId,
    newStatus: x.statut,
    comment: "Création de la demande",
  });
  return x;
}
export async function list(filters) {
  return repo.list(filters);
}
export async function get(id, user, admin = false) {
  const d = admin
    ? await repo.findById(id)
    : await repo.findForCitizen(id, user.id);
  if (!d) {
    const e = new Error("Demande introuvable.");
    e.statusCode = 404;
    throw e;
  }
  return d;
}
export async function update(id, user, d) {
  const current = await repo.findForCitizen(id, user.id);
  if (!current) {
    const e = new Error("Demande introuvable.");
    e.statusCode = 404;
    throw e;
  }
  if (!canModify(current)) {
    const e = new Error("La demande ne peut plus être modifiée.");
    e.statusCode = 409;
    throw e;
  }
  return repo.updateInformations(id, d);
}
export async function submit(id, user) {
  const d = await repo.findForCitizen(id, user.id);
  if (!d) {
    const e = new Error("Demande introuvable.");
    e.statusCode = 404;
    throw e;
  }
  assertStatus(d, [STATUTS.BROUILLON]);
  const p = await repo.pieces(id);
  if (
    !d.nom ||
    !d.prenom ||
    !d.date_naissance ||
    !d.lieu_naissance ||
    !d.sexe ||
    !d.adresse ||
    !d.nom_pere ||
    !d.nom_mere
  ) {
    const e = new Error(
      "Toutes les informations personnelles doivent être renseignées.",
    );
    e.statusCode = 422;
    throw e;
  }
  if (!p.some((x) => x.type_piece === "acte_naissance")) {
    const e = new Error("L'acte de naissance PDF est obligatoire.");
    e.statusCode = 422;
    throw e;
  }
  const x = await repo.submit(id);
  await repo.addHistory({
    demandeId: id,
    userId: user.id,
    oldStatus: d.statut,
    newStatus: x.statut,
    comment: "Demande soumise",
  });
  await notify({
    userId: user.id,
    demandeId: id,
    titre: "Demande soumise",
    message:
      "Votre demande CNI a été soumise. Vous pouvez encore la modifier pendant 2 heures, sauf si la vérification commence avant.",
  });
  return x;
}
export async function startVerification(id, agent) {
  const d = await repo.findById(id);
  assertStatus(d, [STATUTS.SOUMISE, STATUTS.COMPLEMENT]);
  const x = await repo.changeStatus(id, STATUTS.VERIFICATION);
  await repo.addHistory({
    demandeId: id,
    userId: agent.id,
    oldStatus: d.statut,
    newStatus: x.statut,
    comment: "Vérification commencée",
  });
  await notify({
    userId: d.citoyen_id,
    demandeId: id,
    titre: "Vérification en cours",
    message: "Votre dossier est en cours de vérification.",
  });
  return x;
}
export async function complement(id, agent, motif) {
  const d = await repo.findById(id);
  assertStatus(d, [STATUTS.VERIFICATION]);
  if (!motif?.trim()) {
    const e = new Error("Le motif du complément est obligatoire.");
    e.statusCode = 422;
    throw e;
  }
  const x = await repo.changeStatus(id, STATUTS.COMPLEMENT, {
    motif_complement: motif,
  });
  await repo.addHistory({
    demandeId: id,
    userId: agent.id,
    oldStatus: d.statut,
    newStatus: x.statut,
    comment: motif,
  });
  await notify({
    userId: d.citoyen_id,
    demandeId: id,
    titre: "Complément demandé",
    message: motif,
  });
  return x;
}
export async function correct(id, user, d) {
  const current = await repo.findForCitizen(id, user.id);
  if (!current) {
    const e = new Error("Demande introuvable.");
    e.statusCode = 404;
    throw e;
  }
  assertStatus(current, [STATUTS.COMPLEMENT]);
  const x = await repo.updateInformations(id, d);
  const y = await repo.changeStatus(id, STATUTS.VERIFICATION, {
    motif_complement: null,
  });
  await repo.addHistory({
    demandeId: id,
    userId: user.id,
    oldStatus: current.statut,
    newStatus: y.statut,
    comment: "Correction du complément",
  });
  return y;
}
export async function validate(id, agent) {
  const d = await repo.findById(id);
  assertStatus(d, [STATUTS.VERIFICATION]);
  const x = await repo.changeStatus(id, STATUTS.VALIDEE, {
    validated_at: new Date(),
  });
  await repo.addHistory({
    demandeId: id,
    userId: agent.id,
    oldStatus: d.statut,
    newStatus: x.statut,
    comment: "Dossier validé",
  });
  await notify({
    userId: d.citoyen_id,
    demandeId: id,
    titre: "Demande validée",
    message:
      "Votre demande a été validée. Un rendez-vous physique vous sera communiqué.",
  });
  return x;
}
export async function refuse(id, agent, motif) {
  const d = await repo.findById(id);
  assertStatus(d, [STATUTS.VERIFICATION]);
  if (!motif?.trim()) {
    const e = new Error("Le motif du refus est obligatoire.");
    e.statusCode = 422;
    throw e;
  }
  const x = await repo.changeStatus(id, STATUTS.REFUSEE, {
    motif_refus: motif,
  });
  await repo.addHistory({
    demandeId: id,
    userId: agent.id,
    oldStatus: d.statut,
    newStatus: x.statut,
    comment: motif,
  });
  await notify({
    userId: d.citoyen_id,
    demandeId: id,
    titre: "Demande refusée",
    message: motif,
  });
  return x;
}
export async function appointment(id, agent, d) {
  const current = await repo.findById(id);
  assertStatus(current, [STATUTS.VALIDEE]);
  const x = await repo.addAppointment({
    demandeId: id,
    pointServiceId: d.pointServiceId,
    date: d.date,
  });
  const y = await repo.changeStatus(id, STATUTS.RENDEZ_VOUS);
  await repo.addHistory({
    demandeId: id,
    userId: agent.id,
    oldStatus: current.statut,
    newStatus: y.statut,
    comment: "Rendez-vous planifié",
  });
  await notify({
    userId: current.citoyen_id,
    demandeId: id,
    titre: "Rendez-vous physique",
    message: `Votre rendez-vous est prévu le ${new Date(d.date).toLocaleString("fr-FR")}.`,
  });
  return { demande: y, rendezVous: x };
}
export async function biometric(id, agent) {
  const d = await repo.findById(id);
  assertStatus(d, [STATUTS.RENDEZ_VOUS]);
  const x = await repo.changeStatus(id, STATUTS.BIOMETRIE, {
    biometric_at: new Date(),
  });
  await repo.addHistory({
    demandeId: id,
    userId: agent.id,
    oldStatus: d.statut,
    newStatus: x.statut,
    comment: "Empreintes et photo effectuées",
  });
  await notify({
    userId: d.citoyen_id,
    demandeId: id,
    titre: "Étape physique terminée",
    message: "Vos empreintes et votre photo ont été enregistrées.",
  });
  return x;
}
export async function deliberation(id, agent) {
  const d = await repo.findById(id);
  assertStatus(d, [STATUTS.BIOMETRIE]);
  const x = await repo.changeStatus(id, STATUTS.DELIBERATION, {
    deliberated_at: new Date(),
  });
  await repo.addHistory({
    demandeId: id,
    userId: agent.id,
    oldStatus: d.statut,
    newStatus: x.statut,
    comment: "Demande envoyée en délibération",
  });
  await notify({
    userId: d.citoyen_id,
    demandeId: id,
    titre: "En attente de délibération",
    message: "Votre demande est en attente de délibération.",
  });
  return x;
}
export async function available(id, agent) {
  const d = await repo.findById(id);
  assertStatus(d, [STATUTS.DELIBERATION]);
  const x = await repo.changeStatus(id, STATUTS.DISPONIBLE, {
    available_at: new Date(),
  });
  await repo.addHistory({
    demandeId: id,
    userId: agent.id,
    oldStatus: d.statut,
    newStatus: x.statut,
    comment: "CNI disponible",
  });
  await notify({
    userId: d.citoyen_id,
    demandeId: id,
    titre: "CNI disponible",
    message: "Votre CNI est disponible pour retrait.",
  });
  return x;
}
export async function withdraw(id, agent) {
  const d = await repo.findById(id);
  assertStatus(d, [STATUTS.DISPONIBLE]);
  const x = await repo.changeStatus(id, STATUTS.RETIREE, {
    withdrawn_at: new Date(),
  });
  await repo.addHistory({
    demandeId: id,
    userId: agent.id,
    oldStatus: d.statut,
    newStatus: x.statut,
    comment: "CNI retirée",
  });
  await notify({
    userId: d.citoyen_id,
    demandeId: id,
    titre: "CNI retirée",
    message: "Le retrait de votre CNI a été enregistré.",
  });
  return x;
}
export async function addPiece(id, user, file, type) {
  const d = await repo.findForCitizen(id, user.id);
  if (!d) {
    const e = new Error("Demande introuvable.");
    e.statusCode = 404;
    throw e;
  }
  if (!canModify(d)) {
    const e = new Error("Les pièces ne peuvent plus être modifiées.");
    e.statusCode = 409;
    throw e;
  }
  return repo.addPiece({
    demandeId: id,
    typePiece: type,
    nom: file.originalname,
    path: file.path,
    mime: file.mimetype,
    size: file.size,
  });
}
export async function listPieces(id, user) {
  const d = await repo.findForCitizen(id, user.id);
  if (!d) {
    const e = new Error("Demande introuvable.");
    e.statusCode = 404;
    throw e;
  }
  return repo.pieces(id);
}
