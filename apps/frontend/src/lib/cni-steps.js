export const STEPS = [
  {
    number: 1,
    id: "identite",
    title: "Identité",
    description: "État civil et filiation",
    subSteps: [
      {
        number: 1,
        id: "etat_civil",
        label: "État civil",
        title: "État civil",
        description:
          "Reprenez exactement les informations inscrites sur votre acte de naissance. Toute divergence avec le document est une cause de rejet du dossier. Pour un renouvellement ou un duplicata, l'ancien numéro de carte vous sera également demandé.",
        fields: [
          "identite.nom",
          "identite.prenoms",
          "identite.sexe",
          "identite.dateNaissance",
          "identite.lieuNaissance",
        ],
      },
      {
        number: 2,
        id: "naissance_filiation",
        label: "Naissance et filiation",
        title: "Naissance et filiation",
        description:
          "Renseignez vos parents tels qu'ils figurent sur votre acte de naissance, et le lieu où vous êtes né.",
        fields: [
          "identite.provinceNaissance",
          "filiation.nomPere",
          "filiation.nomMere",
        ],
      },
    ],
  },
  {
    number: 2,
    id: "residence",
    title: "Résidence",
    description: "Adresse et contact",
    subSteps: [
      {
        number: 1,
        id: "adresse",
        label: "Adresse",
        title: "Adresse de résidence",
        description:
          "Saisissez votre lieu de résidence actuel en République du Congo. Cette adresse est celle où vous serez contacté par l'administration.",
        fields: [
          "residence.province",
          "residence.ville",
          "residence.commune",
          "residence.avenue",
          "residence.numero",
        ],
      },
      {
        number: 2,
        id: "contact",
        label: "Contact",
        title: "Coordonnées",
        description:
          "Ces coordonnées servent l'administration à vous joindre pendant la vérification du dossier et à l'enrôlement biométrique.",
        fields: ["contact.telephone", "contact.email"],
      },
    ],
  },
  {
    number: 3,
    id: "pieces",
    title: "Pièces justificatives",
    description: "Documents à fournir",
    subSteps: [
      {
        number: 1,
        id: "acte_naissance",
        label: "Acte de naissance",
        title: "Acte de naissance",
        description:
          "L'acte de naissance est la seule pièce obligatoire de tout dossier de carte nationale d'identité. Il doit être l'acte original : ni extrait ni copie ne sont admis. Le fichier doit être un PDF lisible, de 10 Mo maximum.",
        fields: ["pieces.acte_naissance", "acte.numeroActe"],
      },
      {
        number: 2,
        id: "nationalite",
        label: "Nationalité",
        title: "Nationalité",
        description:
          "La nationalité d'un citoyen congolais est établie par son acte de naissance : aucun justificatif n'est demandé. Tout ressortissant d'un autre pays doit justifier d'un séjour régulier en cours de validité.",
        fields: ["nationalite.nationalite"],
      },
      {
        number: 3,
        id: "photo_identite",
        label: "Photo d'identité",
        title: "Photo d'identité",
        description:
          "La photo est prise sur place le jour de l'enrôlement. Vous pouvez néanmoins joindre une photo aux normes pour accélérer l'instruction du dossier.",
        fields: ["pieces.photo_identite"],
      },
    ],
  },
  {
    number: 4,
    id: "depot",
    title: "Dépôt",
    description: "Rendez-vous",
    subSteps: [
      {
        number: 1,
        id: "rendez_vous",
        label: "Rendez-vous",
        title: "Rendez-vous",
        description:
          "Le rendez-vous physique n'est fixé qu'après la validation de votre dossier par un agent. Choisissez ici le centre où vous préférez être enrôlé.",
        fields: ["contact.pointServiceId"],
      },
      {
        number: 2,
        id: "paiement",
        label: "Paiement",
        title: "Frais et timbres",
        description:
          "Règlement du timbre fiscal. La carte elle-même est gratuite en application du décret n° 2024-2692 du 13 novembre 2024. Le timbre fiscal sera présenté le jour de l'enrôlement.",
        fields: ["paiement.moyen"],
      },
      {
        number: 3,
        id: "recapitulatif",
        label: "Récapitulatif",
        title: "Récapitulatif de la demande",
        description:
          "Vérifiez une dernière fois l'ensemble des informations saisies avant de déposer officiellement votre demande.",
        fields: [],
      },
    ],
  },
];

export function getStep(stepNumber) {
  return STEPS.find((s) => s.number === stepNumber) ?? STEPS[0];
}

export function getSubStep(stepNumber, subStepNumber) {
  const step = getStep(stepNumber);
  return (
    step.subSteps.find((s) => s.number === subStepNumber) ?? step.subSteps[0]
  );
}

export function isLastSubStep(stepNumber, subStepNumber) {
  const step = getStep(stepNumber);
  return subStepNumber >= step.subSteps.length;
}

export function isLastStep(stepNumber) {
  return stepNumber >= STEPS.length;
}

export function getPrevious(stepNumber, subStepNumber) {
  const step = getStep(stepNumber);
  if (subStepNumber > 1) {
    return { step: stepNumber, subStep: subStepNumber - 1 };
  }
  const previous = STEPS.find((s) => s.number === stepNumber - 1);
  if (!previous) {
    return { step: 1, subStep: 1 };
  }
  return { step: previous.number, subStep: previous.subSteps.length };
}

export function getNext(stepNumber, subStepNumber) {
  const step = getStep(stepNumber);
  if (subStepNumber < step.subSteps.length) {
    return { step: stepNumber, subStep: subStepNumber + 1 };
  }
  const next = STEPS.find((s) => s.number === stepNumber + 1);
  if (!next) {
    return { step: stepNumber, subStep: subStepNumber };
  }
  return { step: next.number, subStep: 1 };
}

export function getRequiredFields(stepNumber, subStepNumber, context = {}) {
  const { typeDemande, form = {} } = context;
  const subStep = getSubStep(stepNumber, subStepNumber);
  const required = [...subStep.fields];

  if (subStep.id === "etat_civil" && !typeDemande) {
    required.push("typeDemande");
  }

  if (
    subStep.id === "etat_civil" &&
    (typeDemande === "renouvellement" || typeDemande === "remplacement")
  ) {
    required.push("complement.ancienNumeroCni");
  }

  if (subStep.id === "etat_civil" && typeDemande === "remplacement") {
    required.push("complement.motifRemplacement");
    required.push("complement.declaration");
  }

  if (
    subStep.id === "nationalite" &&
    form.nationalite?.nationalite === "autre"
  ) {
    required.push("pieces.justificatif_sejour");
  }

  if (subStep.id === "paiement") {
    required.push("paiement.accepte");
  }

  return required;
}

export function getCompletionKey(stepNumber, subStepNumber) {
  return `${stepNumber}.${subStepNumber}`;
}

export const TOTAL_SUB_STEPS = STEPS.reduce(
  (total, step) => total + step.subSteps.length,
  0,
);
