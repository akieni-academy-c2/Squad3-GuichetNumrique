export function validateCreate(data) {
  const errors = {};
  const types = ["premiere_demande", "renouvellement", "remplacement"];
  if (!types.includes(data.typeDemande))
    errors.typeDemande = "Type de demande invalide.";
  if (Object.keys(errors).length) {
    const e = new Error("Données invalides.");
    e.statusCode = 422;
    e.errors = errors;
    throw e;
  }
}

export function validateInformations(data) {
  const fields = [
    "nom",
    "prenom",
    "dateNaissance",
    "lieuNaissance",
    "sexe",
    "adresse",
    "nomPere",
    "nomMere",
  ];
  const errors = {};
  for (const f of fields)
    if (
      data[f] === undefined ||
      data[f] === null ||
      String(data[f]).trim() === ""
    )
      errors[f] = "Champ obligatoire.";
  if (data.sexe && !["M", "F"].includes(data.sexe))
    errors.sexe = "Sexe invalide.";
  if (Object.keys(errors).length) {
    const e = new Error("Données invalides.");
    e.statusCode = 422;
    e.errors = errors;
    throw e;
  }
}
