export const PAYS = "République du Congo";

export const DEPARTEMENTS = [
  "Bouenza",
  "Cuvette",
  "Cuvette-Ouest",
  "Léari",
  "Likouala",
  "M'Bomou",
  "Madingou",
  "May-Yombe",
  "Mossendjo",
  "Niari",
  "Plateaux",
  "Pool",
];

export const COMMUNES_AUTONOMES = ["Brazzaville", "Pointe-Noire"];

export const TERRITOIRES = [...COMMUNES_AUTONOMES, ...DEPARTEMENTS];

export const ARRONDISSEMENTS_BRAZZAVILLE = [
  "Makélékélé",
  "Bacongo",
  "Poto-Poto",
  "Moungali",
  "Ouenzé",
  "Talangaï",
  "M'filou",
  "Madibou",
  "Djiri",
];

export const VILLES = [
  "Brazzaville",
  "Pointe-Noire",
  "Oyo",
  "Dolisie",
  "Nkayi",
  "Owando",
  "Impfondo",
  "Makoua",
  "Mossendjo",
  "Ouesso",
  "Boundji",
  "Ewo",
];

export const VALIDITE_CARTE_ANNEES = 10;

export const TYPES_DEMANDE = [
  {
    value: "premiere_demande",
    label: "Première demande",
    description:
      "Vous n'avez jamais eu de carte nationale d'identité congolaise.",
  },
  {
    value: "renouvellement",
    label: "Renouvellement",
    description: `Votre carte approche de sa date d'expiration (validité de ${VALIDITE_CARTE_ANNEES} ans).`,
  },
  {
    value: "remplacement",
    label: "Duplicata",
    description:
      "Votre carte a été perdue, volée, détruite ou devient illisible.",
  },
];

export const MOTIFS_REMPLACEMENT = [
  { value: "perte", label: "Carte perdue" },
  { value: "vol", label: "Carte volée" },
  { value: "destruction", label: "Carte détruite" },
  { value: "donnees_modifiees", label: "Erreur sur les données inscrites" },
];

export const SEXES = [
  { value: "M", label: "Masculin" },
  { value: "F", label: "Féminin" },
];

export const NATIONALITES = [
  { value: "congolaise", label: "Congolaise" },
  { value: "autre", label: "Autre nationalité" },
];

export const TYPES_ACTE = [
  {
    value: "acte_naissance",
    label: "Acte de naissance",
    hint: "Document original délivré par l'officier d'état civil. Les extraits et copies ne sont pas admis.",
  },
  {
    value: "declaration_tardive",
    label: "Déclaration tardive de naissance",
    hint: "Acte établi après l'âge de la déclaration obligatoire.",
  },
  {
    value: "livrets_familial",
    label: "Livret familial",
    hint: "À présenter avec l'acte de naissance correspondant.",
  },
  {
    value: "jugement_suppletif",
    label: "Jugement supplétif avec transcription",
    hint: "Accompagné d'une carte nationale d'identité de l'un des parents.",
  },
  {
    value: "acte_notoriete",
    label: "Acte de notoriété tenant lieu d'acte de naissance",
    hint: "Accompagné d'une carte nationale d'identité de l'un des parents.",
  },
];

export const PIECES_ACTE = {
  acte_naissance: {
    key: "acte_naissance",
    label: "Acte de naissance ou document tenant lieu",
    obligatoire: true,
    accept: "application/pdf",
    extensions: [".pdf"],
    maxSizeMb: 10,
    hint: "PDF uniquement, 10 Mo maximum. Ni extrait ni copie : seul l'acte original est admis.",
  },
  photo_identite: {
    key: "photo_identite",
    label: "Photo d'identité",
    obligatoire: true,
    accept: "image/jpeg,image/png",
    extensions: [".jpg", ".jpeg", ".png"],
    maxSizeMb: 10,
    hint: "JPEG ou PNG, 10 Mo maximum, visage de face sur fond clair.",
  },
  justificatif_sejour: {
    key: "justificatif_sejour",
    label: "Justificatif de séjour régulier",
    obligatoire: false,
    accept: "application/pdf,image/jpeg,image/png",
    extensions: [".pdf", ".jpg", ".jpeg", ".png"],
    maxSizeMb: 10,
    hint: "Passeport et carte de séjour ou permis de séjour CEMAC, pour les ressortissants d'un autre pays.",
  },
};

export const CENTRES_CNI = [
  {
    id: 1,
    value: "1",
    label: "Centre de production de Brazzaville",
    description: "Quartier M'Pila, Brazzaville",
  },
  {
    id: 2,
    value: "2",
    label: "Centre de production de Pointe-Noire",
    description: "Quartier Mongita, Pointe-Noire",
  },
  {
    id: 3,
    value: "3",
    label: "Centre de production d'Oyo",
    description: "District d'Oyo, département de la Cuvette",
  },
];

export const PIECES_REQUISES = [
  "Un acte de naissance original, une déclaration tardive de naissance, un livret familial, un jugement supplétif transcrit ou un acte de notoriété",
  "Une photo d'identité récente aux dimensions réglementaires",
  "Le justificatif de séjour régulier pour les ressortissants d'un autre pays",
  "Le timbre fiscal à apposer sur votre demande",
];

export const MOTIFS_REJET = [
  "Présentation d'un extrait ou d'une copie d'acte de naissance : seul l'acte original est admis",
  "Document illisible, expiré ou dont les mentions marginales ne sont pas à jour",
  "Photo d'identité non conforme au format demandé ou visage masqué",
  "Différence entre les informations saisies et celles portées sur l'acte de naissance",
  "Timbre fiscal non apposé ou non acquitté",
];

export const FRAIS = {
  carte: 0,
  timbre_fiscal: 500,
};

export const DELAIS = {
  premiere_demande: "5 à 10 jours ouvrables après l'enrôlement biométrique",
  renouvellement: "3 à 5 jours ouvrables après l'enrôlement biométrique",
  remplacement:
    "Carte provisoire délivrée le jour même, carte définitive en 48 heures",
};

export const DELAI_MODIFICATION_HEURES = 2;

export const PREFIXES_TELEPHONE = [
  { value: "+242", label: "+242 (République du Congo)" },
  { value: "+33", label: "+33 (France)" },
  { value: "+237", label: "+237 (Cameroun)" },
  { value: "+225", label: "+225 (Côte d'Ivoire)" },
  { value: "+autre", label: "Autre indicatif" },
];

export const MOYENS_PAIEMENT = [
  {
    value: "mobile_money",
    label: "Mobile Money (MTN MoMo, Airtel Money, Orange Money)",
  },
  { value: "virement", label: "Virement bancaire" },
  { value: "especes", label: "Espèces au guichet de l'antenne de collecte" },
];

export function getTypeDemande(value) {
  return TYPES_DEMANDE.find((t) => t.value === value) ?? null;
}

export function getFrais() {
  return FRAIS.carte;
}

export function getDelai(typeDemande) {
  return DELAIS[typeDemande] ?? DELAIS.premiere_demande;
}

export function formatMontant(value) {
  return new Intl.NumberFormat("fr-FR").format(value) + " FCFA";
}
