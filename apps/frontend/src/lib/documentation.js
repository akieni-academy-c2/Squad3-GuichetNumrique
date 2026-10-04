import {
  CENTRES_CNI,
  DELAI_MODIFICATION_HEURES,
  DELAIS,
  FRAIS,
  MOTIFS_REMPLACEMENT,
  MOTIFS_REJET,
  PIECES_ACTE,
  PIECES_REQUISES,
  TYPES_ACTE,
  TYPES_DEMANDE,
  VALIDITE_CARTE_ANNEES,
} from "@/lib/cni-config";

export const SOURCES_OFFICIELLES = [
  {
    label:
      "Ministère de l'Intérieur, de la Décentralisation et du Développement Local",
    url: "https://interieur.gouv.cg/carte-nationale-didentite/",
  },
  {
    label:
      "Décret n° 2024-2692 du 13 novembre 2024 modifiant le décret n° 2009-57",
    url: "https://natlex.ilo.org/dyn/natlex2/natlex2/files/download/117585/COG-117585.pdf",
  },
];

export const DOCUMENTATION = [
  {
    slug: "introduction",
    titre: "Introduction à la carte nationale d'identité",
    resume:
      "Ce qu'est la carte, sa base légale, sa durée de validité et ce qu'elle contient.",
    sections: [
      {
        titre: "Définition",
        contenu: [
          "La carte nationale d'identité informatisée est le document officiel d'identité délivré aux citoyens de la République du Congo. Elle constitue la seule preuve admise de l'identité civile.",
          "Elle est produite par les centres de production de Brazzaville, de Pointe-Noire et d'Oyo, puis remise au requérant par le chef de la section départementale ou le chef de l'antenne de collecte de son lieu d'enrôlement.",
        ],
      },
      {
        titre: "Base légale",
        contenu: [
          "Décret n° 2009-57 du 13 mars 2009 portant création de la carte nationale d'identité informatisée et sécurisée.",
          "Décret n° 2024-2692 du 13 novembre 2024, qui a modifié le décret précédent : durée de validity portée à dix ans,centres de production et conditions de délivrance précisés.",
        ],
      },
      {
        titre: `Durée de validité : ${VALIDITE_CARTE_ANNEES} ans`,
        contenu: [
          `La carte est valable ${VALIDITE_CARTE_ANNEES} ans à compter de sa date d'émission. Passé ce délai, elle doit être renouvelée.`,
          "Le renouvellement n'ouvre pas un nouveau dossier complet : l'ancien numéro de carte est demandé pour rattacher le dossier à l'existant.",
        ],
      },
      {
        titre: "Mentions portées sur la carte",
        contenu: [
          "Nom, prénoms, date et lieu de naissance, sexe, adresse du titulaire.",
          "Numéro national d'identification, noms et prénoms du père et de la mère.",
          "Date d'émission, date d'expiration, signature du titulaire, empreinte du pouce gauche et photographie.",
        ],
      },
      {
        titre: "Rectification des données",
        contenu: [
          "Le nom patronymique ne peut être corrigé que par arrêté du ministre chargé de la justice, publié au Journal Officiel.",
          "L'ajout, la suppression ou la rectification d'un prénom relève du juge : jugement rectificatif du tribunal de grande instance ou du tribunal d'instance.",
        ],
      },
      {
        titre: "À quoi elle sert",
        contenu: [
          "Pièce exigée pour toute démarche administrative : état civil, enregistrement, demandes de recours.",
          "Pièce exigée pour l'ouverture d'un compte bancaire, l'inscription scolaire et les opérations d'assurance.",
          "Document de voyage reconnu dans l'espace CEMAC.",
        ],
      },
    ],
  },
  {
    slug: "pieces-a-fournir",
    titre: "Pièces à fournir",
    resume:
      "Les documents constitutifs du dossier, les formats acceptés et les règles de originals.",
    sections: [
      {
        titre: "Documents constitutifs du dossier",
        liste: PIECES_REQUISES,
      },
      {
        titre: "Original obligatoire",
        contenu: [
          "Seul l'acte de naissance original est admis. Les extraits et les copies d'acte sont rejetés d'office : ce n'est pas une tolérance de l'agent mais une règle du texte.",
          "Cette exigence s'applique aussi aux pièces jointes en ligne : une photo d'un extrait ne peut pas remplacer la présentation de l'acte.",
        ],
      },
      {
        titre: "Formats et tailles",
        tableau: PIECES_ACTE,
      },
      {
        titre: "Ressortissants d'un autre pays",
        contenu: [
          "La nationalité d'un citoyen congolais est établie par son acte de naissance : aucun justificatif supplémentaire n'est demandé à cette étape.",
          "Tout ressortissant d'un autre pays doit justifier d'un séjour régulier en cours de validité : passeport et carte de séjour ou permis de séjour CEMAC.",
        ],
      },
    ],
  },
  {
    slug: "actes-acceptes",
    titre: "Nature des actes acceptés",
    resume:
      "Les cinq documents qui tiennent lieu d'acte de naissance et la manière de les obtenir.",
    sections: [
      {
        titre: "Documents admis",
        liste: TYPES_ACTE.map((acte) => `${acte.label} — ${acte.hint}`),
      },
      {
        titre: "Si vous ne disposez que d'un extrait",
        contenu: [
          "Retirez l'acte au service d'état civil de la commune ou de l'arrondissement où la naissance a été enregistrée, et non un simple extrait.",
          "Le cas échéant, faites-vous délivrer un duplicata d'acte par l'officier d'état civil : il fait foi et est admis.",
        ],
      },
      {
        titre: "Mentions marginales",
        contenu: [
          "Les mentions marginales doivent être à jour. Un acte dont les mentions ne sont pas actualisées est considéré comme non exploitable.",
          "Faites vérifier l'acte avant de déposer le dossier : une mention marginale manquante entraîne un retour en complément.",
        ],
      },
      {
        titre: "Déclarations tardives",
        contenu: [
          "La déclaration tardive de naissance est établie lorsque l'inscription n'a pas eu lieu dans le délai légal.",
          "Le jugement supplétif doit être accompagné de sa transcription : c'est la transcription qui fait foi, pas le jugement seul.",
        ],
      },
    ],
  },
  {
    slug: "types-de-demande",
    titre: "Types de demande",
    resume:
      "Première demande, renouvellement et duplicata : ce qui distingue chaque dossier.",
    sections: [
      {
        titre: "Les trois types",
        liste: TYPES_DEMANDE.map(
          (type) => `${type.label} — ${type.description}`,
        ),
      },
      {
        titre: "Première demande",
        contenu: [
          "Vous n'avez jamais eu de carte nationale d'identité congolaise.",
          "Le dossier est constitué à partir de zéro : aucun ancien numéro n'est demandé.",
        ],
      },
      {
        titre: "Renouvellement",
        contenu: [
          `Votre carte approche de sa date d'expiration, soit ${VALIDITE_CARTE_ANNEES} ans après sa délivrance.`,
          "L'ancien numéro de carte est obligatoire : il permet de retrouver le dossier existant plutôt que d'en créer un second.",
        ],
      },
      {
        titre: "Duplicata",
        contenu: [
          "La carte a été perdue, volée, détruite ou devient illisible, ou porte une erreur de données.",
          "Motifs déclarés :",
          ...MOTIFS_REMPLACEMENT.map((motif) => motif.label),
          "En cas de vol, la déclaration doit être accompagnée d'une plainte déposée au commissariat.",
        ],
      },
      {
        titre: "Frais",
        contenu: [
          `La carte elle-même est gratuite : l'article 10 du décret n° 2024-2692 précise que la délivrance de la carte informatisée et sécurisée est gratuite.`,
          `Seul le timbre fiscal de ${FRAIS.timbre_fiscal} FCFA est dû, et il s'acquitte au guichet de l'antenne de collecte.`,
        ],
      },
    ],
  },
  {
    slug: "delais-de-traitement",
    titre: "Délais de traitement",
    resume:
      "Les délais indicatifs par type de demande et les étapes qui les font courir.",
    sections: [
      {
        titre: "Délais indicatifs",
        liste: TYPES_DEMANDE.map(
          (type) => `${type.label} — ${DELAIS[type.value]}`,
        ),
      },
      {
        titre: "Le délai court à partir de l'enrôlement",
        contenu: [
          "Les délais ci-dessus démarrent à l'enrôlement biométrique, pas à la création du dossier en ligne.",
          "Un dossier déposé mais non enrôlé n'est pas encore dans le circuit de production.",
        ],
      },
      {
        titre: "Vérifier l'état de son dossier",
        contenu: [
          "Un agent contrôle la cohérence entre les informations saisies et l'acte de naissance, et peut demander un complément de pièces.",
          "Une demande de complément suspend le délai de production jusqu'à réception des pièces manquantes.",
        ],
      },
      {
        titre: "Correction après dépôt",
        contenu: [
          `Après le dépôt, vous disposez de ${DELAI_MODIFICATION_HEURES} heures pour corriger une information erronée depuis cette plateforme.`,
          "Passé ce délai, toute modification nécessite une nouvelle demande.",
        ],
      },
    ],
  },
  {
    slug: "motifs-de-rejet",
    titre: "Motifs de rejet du dossier",
    resume:
      "Les causes les plus fréquentes, et ce qui relève du rejet ou du retour en complément.",
    sections: [
      {
        titre: "Motifs fréquents",
        liste: MOTIFS_REJET,
      },
      {
        titre: "Rejet ou retour en complément",
        contenu: [
          "Le dossier est rejeté lorsque l'acte de naissance fait défaut : document illisible, mentions marginales non à jour, extrait ou copie présenté au lieu de l'original.",
          "Le dossier est renvoyé en complément lorsque les informations sont corrigeables : divergence de saisie avec l'acte, photo non conforme, pièce manquante.",
          "Un retour en complément ne coûte pas de nouveau dossier : les pièces déjà transmises sont conservées.",
        ],
      },
      {
        titre: "Ce qui n'est pas un motif de rejet",
        contenu: [
          "Un simple nom écrit en minuscules, ou une espace insérée dans un prénom : la saisie est corrigée par l'agent.",
          "Une demande de nationalité étrangère : elle déclenche un contrôle complémentaire, pas un rejet.",
        ],
      },
    ],
  },
  {
    slug: "centres-de-production",
    titre: "Centres de production",
    resume:
      "Où les cartes sont produites et où vous retirer après l'enrôlement.",
    sections: [
      {
        titre: "Centres de production de la carte",
        liste: CENTRES_CNI.map(
          (centre) => `${centre.label} — ${centre.description}`,
        ),
      },
      {
        titre: "Où vous êtes enrôlé et où vous retirez",
        contenu: [
          "Vous ne vous déplacez pas dans un centre de production : l'enrôlement biométrique a lieu à l'antenne de collecte de votre lieu de résidence, choisie dans le formulaire.",
          "La carte est ensuite produite à Brazzaville, Pointe-Noire ou Oyo, puis retirée auprès du chef de section départementale ou du chef d'antenne de collecte de votre lieu d'enrôlement.",
        ],
      },
      {
        titre: "Prise de rendez-vous",
        contenu: [
          "Le rendez-vous est attribué par un agent après validation du dossier. Il n'y a rien à réserver depuis cette plateforme.",
          "Une présentation sans rendez-vous enregistré entraîne un renvoi du dossier.",
        ],
      },
      {
        titre: "À présenter le jour de l'enrôlement",
        liste: [
          "Le récépissé de dépôt.",
          "L'acte de naissance original.",
          "Le timbre fiscal acquitté.",
          "Votre ancienne carte en cas de renouvellement ou de duplicata.",
        ],
      },
    ],
  },
];

export function getDocument(slug) {
  return DOCUMENTATION.find((doc) => doc.slug === slug) ?? null;
}
