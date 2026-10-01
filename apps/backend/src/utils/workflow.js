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

export function canModify(demande) {
  if (demande.statut === STATUTS.BROUILLON) return true;
  if (![STATUTS.SOUMISE, STATUTS.COMPLEMENT].includes(demande.statut))
    return false;
  if (!demande.submitted_at || !demande.modification_deadline) return false;
  return new Date() <= new Date(demande.modification_deadline);
}
export function assertStatus(demande, allowed) {
  if (!allowed.includes(demande.statut)) {
    const e = new Error(
      `Action impossible lorsque la demande est au statut '${demande.statut}'.`,
    );
    e.statusCode = 409;
    throw e;
  }
}
