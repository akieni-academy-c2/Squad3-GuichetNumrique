import { apiFetch } from "@/api/client";

export const STATUTS = {
  BROUILLON: "brouillon",
  SOUMISE: "soumise",
  VERIFICATION: "en_verification",
  COMPLEMENT: "complement_demande",
  REFUSEE: "refusee",
  VALIDEE: "validee",
  RENDEZ_VOUS: "rendez_vous",
  BIOMETRIE: "empreintes_photo_effectuees",
  DELIBERATION: "attente_deliberation",
  DISPONIBLE: "cni_disponible",
  RETIREE: "retiree",
};

export const LIBELLES_STATUTS = {
  [STATUTS.BROUILLON]: "Brouillon",
  [STATUTS.SOUMISE]: "Soumise",
  [STATUTS.VERIFICATION]: "En vérification",
  [STATUTS.COMPLEMENT]: "Complément demandé",
  [STATUTS.REFUSEE]: "Refusée",
  [STATUTS.VALIDEE]: "Validée",
  [STATUTS.RENDEZ_VOUS]: "Rendez-vous planifié",
  [STATUTS.BIOMETRIE]: "Empreintes et photo effectuées",
  [STATUTS.DELIBERATION]: "En attente de délibération",
  [STATUTS.DISPONIBLE]: "CNI disponible",
  [STATUTS.RETIREE]: "Retirée",
};

export const TYPES_PIECES = {
  ACTE_NAISSANCE: "acte_naissance",
  PHOTO_IDENTITE: "photo_identite",
};

export function createDemande(token, { typeDemande, pointServiceId }) {
  return apiFetch("/demandes", {
    method: "POST",
    token,
    body: { typeDemande, pointServiceId },
  });
}

export function listDemandes(token, { page, limit, statut } = {}) {
  const params = new URLSearchParams();
  if (page) params.set("page", page);
  if (limit) params.set("limit", limit);
  if (statut) params.set("statut", statut);
  const query = params.toString();
  return apiFetch(`/demandes${query ? `?${query}` : ""}`, { token });
}

export function getDemande(token, id) {
  return apiFetch(`/demandes/${id}`, { token });
}

export function updateDemande(token, id, informations) {
  return apiFetch(`/demandes/${id}`, {
    method: "PUT",
    token,
    body: informations,
  });
}

export function listPieces(token, id) {
  return apiFetch(`/demandes/${id}/pieces`, { token });
}

export function uploadPiece(token, id, typePiece, fichier) {
  const body = new FormData();
  body.append("typePiece", typePiece);
  body.append("fichier", fichier);
  return apiFetch(`/demandes/${id}/pieces`, { method: "POST", token, body });
}

export function submitDemande(token, id) {
  return apiFetch(`/demandes/${id}/soumettre`, { method: "POST", token });
}

export function listPointsService(token) {
  return apiFetch("/points-service", { token });
}
