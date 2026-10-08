/**
 * @author Souveraine Mabelemo
 * @created 2026-10-06
 *
 * Source de données de la fonctionnalité Documentation.
 * Contient les rubriques, leurs sections et les sources officielles.
 */
import {
  CENTRES_CNI,
  DELAI_MODIFICATION_HEURES,
  DELAIS,
  MOTIFS_REMPLACEMENT,
  MOTIFS_REJET,
  PIECES_ACTE,
  PIECES_REQUISES,
  TYPES_ACTE,
  TYPES_DEMANDE,
  VALIDITE_CARTE_ANNEES,
} from "@/lib/cni-config";
// Sources officielles utilisées comme références pour la documentation.

export const OFFICIAL_SOURCES = [
  {
    label:
      "Décret n° 2024-2692 du 13 novembre 2024 modifiant le décret n° 2009-57 du 13 mars 2009",
    url: "https://www.sgg.cg/JO/2024/congo-jo-2024-47.pdf",
  },
];
// Ensemble des rubriques affichées dans l'interface de documentation.

export const DOCUMENTATION = [
  {
    slug: "introduction",
    title: "Introduction à la carte nationale d'identité",
    sections: [
      {
        title: "Qu'est-ce que la CNI ?",
        content: [
          "La carte nationale d'identité informatisée et sécurisée est le document officiel qui certifie l'identité de son titulaire.",
          `La carte est délivrée aux personnes de nationalité congolaise ayant atteint l'âge de 16 ans révolus, ainsi qu'aux personnes concernées par certaines dispositions du Code de la nationalité congolaise.`,
        ],
      },
      {
        title: "Durée de validité",
        content: [
          `La carte nationale d'identité a une durée de validité de ${VALIDITE_CARTE_ANNEES} ans et est renouvelable.`,
          "Les modalités précises du renouvellement sont fixées par arreté du ministre chargé de la sécurité.",
        ],
      },
      {
        title: "Ce que contient la carte",
        content: [
          "La carte comporte notamment les nom et prénoms, la date et le lieu de naissance, le sexe, l'adresse, le numéro national ainsi que le numéro de la carte.",
          "Elle comporte également une photographie, les informations relatives aux parents, la date d'émission, la date d'expiration et des éléments de sécurité permettant d'en protéger l'authenticité.",
          "La nouvelle génération de carte comporte notamment un code PDF 417 et une zone MRZ contenant des informations sécurisées.",
        ],
      },
      {
        title: "A quoi sert la CNI ?",
        content: [
          "La CNI permet de justifier officiellement l'identité de son titulaire dans le cadre des démarches nécessitant une pièce d'identité.",
          "Elle est utilisée dans de nombreuses démarches administratives et peut être demandée par différents organismes publics ou privés.",
        ],
      },
      {
        title: "Port de la carte",
        content: [
          "Le port de la carte nationale d'identité informatisée et sécurisée est obligatoire.",
          "Il est donc important de conserver sa carte dans un état permettant son identification et de signaler rapidement toute perte, vol ou destruction.",
        ],
      },
      {
        title: "Rectification des informations",
        content: [
          "La rectification d'une information figurant sur la carte peut nécessiter la présentation d'un document officiel justifiant la modification.",
          "La rectification du nom patronymique nécessite un arrêté du ministre chargé de la justice publié au Journal officiel.",
          "L'ajout, la suppression ou la rectification d'un prénom nécessite un jugement rectificatif délivré par la juridiction compétente.",
        ],
      },
    ],
  },

  {
    slug: "pieces-a-fournir",
    title: "Pièces à fournir",
    sections: [
      {
        title: "Documents admis",
        content: [
          "La réglementation prévoit plusieurs documents pouvant permettre la délivrance de la carte nationale d'identité.",
          "Selon votre situation, le dossier peut notamment être constitué à partir d'un acte de naissance, d'une déclaration tardive de naissance, d'un livret de famille, d'un jugement supplétif accompagné de sa transcription ou d'un acte de notoriété tenant lieu d'acte de naissance.",
        ],
      },
      {
        title: "Pièces constitutives du dossier",
        items: PIECES_REQUISES,
      },
      {
        title: "Documents originaux",
        content: [
          "Les extraits ou les copies des pièces prévues par le décret ne sont pas admis.",
          "Lorsque votre situation nécessite un document particulier, veillez donc à présenter le document correspondant dans la forme prévue par la réglementation.",
        ],
      },
      {
        title: "Cas particuliers",
        content: [
          "Un jugement supplétif doit etre accompagné de sa transcription délivrée par l'officier d'état civil compétent ainsi que d'une carte d'identité de l'un des parents.",
          "Un acte de notoriété tenant lieu d'acte de naissance doit également être accompagné d'une carte d'identité de l'un des parents.",
          "L'adjonction du nom de l'époux nécessite la présentation de l'acte de mariage dûment enregistré dans le registre de l'état civil.",
        ],
      },
      {
        title: "Formats et tailles des fichiers",
        table: PIECES_ACTE,
      },
      {
        title: "Avant de déposer votre dossier",
        content: [
          "Vérifiez que les informations de vos documents correspondent exactement aux informations saisies dans votre demande.",
          "Assurez-vous également que les documents transmis sont lisibles et complets.",
          "Une pièce illisible, incomplète ou non conforme peut entrainer une demande de complément ou empecher le traitement du dossier.",
        ],
      },
    ],
  },

  {
    slug: "actes-acceptes",
    title: "Nature des actes acceptés",
    sections: [
      {
        title: "Documents prévus par la réglementation",
        items: TYPES_ACTE.map(
          (acte) => `${acte.label} - ${acte.hint}`,
        ),
      },
      {
        title: "Acte de naissance",
        content: [
          "L'acte de naissance fait partie des documents pouvant etre présentés pour la délivrance de la CNI.",
          "Les extraits ou copies des pièces prévues par le décret ne sont pas admis.",
        ],
      },
      {
        title: "Déclaration tardive de naissance",
        content: [
          "La déclaration tardive de naissance fait partie des pièces prévues par le décret pour la délivrance de la carte nationale d'identité.",
          "Si votre dossier repose sur une déclaration tardive, vérifiez que vous disposez du document correspondant avant de commencer votre demande.",
        ],
      },
      {
        title: "Jugement supplétif",
        content: [
          "Le jugement supplétif doit être accompagné de sa transcription délivrée par l'officier d'état civil compétent.",
          "Une carte d'identité de l'un des parents doit également être présentée dans ce cas.",
        ],
      },
      {
        title: "Acte de notoriété",
        content: [
          "L'acte de notoriété tenant lieu d'acte de naissance fait partie des pièces prévues par le décret.",
          "Il doit être accompagné d'une carte d'identité de l'un des parents.",
        ],
      },
      {
        title: "Informations à vérifier",
        content: [
          "Avant le dépot, vérifiez que les informations figurant sur votre document d'état civil correspondent aux informations saisies dans votre demande.",
          "En cas de divergence, il peut etre nécessaire de faire régulariser la situation avant la demande de CNI.",
        ],
      },
    ],
  },

  {
    slug: "types-de-demande",
    title: "Types de demande",
    sections: [
      {
        title: "Les différents types de demande",
        items: TYPES_DEMANDE.map(
          (type) => `${type.label} - ${type.description}`,
        ),
      },
      {
        title: "Première demande",
        content: [
          "Cette démarche concerne une personne qui demande une carte nationale d'identité pour la première fois.",
          "Les documents nécessaires sont ceux permettant d'établir l'identité du demandeur conformément à la réglementation.",
        ],
      },
      {
        title: "Renouvellement",
        content: [
          `La carte nationale d'identité est valable ${VALIDITE_CARTE_ANNEES} ans et est renouvelable.`,
          "Les modalités précises du renouvellement sont fixées par arrêté du ministre chargé de la sécurité.",
          "Consultez les informations demandées par la plateforme afin de savoir quels éléments fournir pour votre situation.",
        ],
      },
      {
        title: "Duplicata",
        content: [
          "En cas de perte, de vol ou de destruction de la carte nationale d'identité, le titulaire doit effectuer immédiatement une déclaration auprès du commissariat de police d'arrondissement ou du district le plus proche de son lieu de résidence.",
          "Une attestation de perte, de vol ou de destruction peut être délivrée par le commissaire de police. Sa validité ne peut excéder trois mois.",
        ],
      },
      {
        title: "Carte endommagée ou illisible",
        content: [
          "Si votre carte est détériorée au point de ne plus permettre une identification correcte, vérifiez auprès du service compétent la procédure applicable à votre situation.",
          "Ne créez pas une nouvelle demande avant d'avoir vérifié si votre situation relève d'un renouvellement ou d'un duplicata.",
        ],
      },
      {
        title: "Frais",
        content: [
          "La délivrance de la carte nationale d'identité informatisée et sécurisée est gratuite conformément à l'article 10 du décret n° 2024-2692 du 13 novembre 2024.",
          "Si une somme ou une pièce financière est demandée dans le cadre d'une démarche complémentaire, vérifiez son fondement auprès du service administratif compétent.",
        ],
      },
    ],
  },

  {
    slug: "delais-de-traitement",
    title: "Délais de traitement",
    sections: [
      {
        items: TYPES_DEMANDE.map(
        (type) =>
          `${type.label} — ${
            DELAIS[/** @type {keyof typeof DELAIS} */ (type.value)]
          }`,
      ),
      },
      {
        title: "Attention aux délais affichés",
        content: [
          "Les délais affichés sur cette plateforme sont indicatifs et peuvent dépendre de l'état du dossier, des contrôles nécessaires et du traitement administratif.",
          "Un délai affiché dans l'application ne constitue pas nécessairement un délai légal garanti par un texte réglementaire.",
        ],
      },
      {
        title: "Pourquoi un dossier peut prendre plus de temps ?",
        content: [
          "Le traitement peut être prolongé lorsqu'une information doit être vérifiée ou lorsqu'un document complémentaire est nécessaire.",
          "Une demande incomplète ou contenant des informations incohérentes peut nécessiter une intervention supplémentaire avant la poursuite du traitement.",
        ],
      },
      {
        title: "Suivre l'état de sa demande",
        content: [
          "Utilisez votre espace personnel pour consulter l'état d'avancement de votre demande.",
          "Lorsque le statut de votre dossier évolue, les informations disponibles dans votre espace vous permettent de connaître la prochaine étape à effectuer.",
        ],
      },
      {
        title: "Correction après dépôt",
        content: [
          `La plateforme peut vous permettre de corriger certaines informations pendant ${DELAI_MODIFICATION_HEURES} heures après le dépôt, selon les règles fonctionnelles définies par le service.`,
          "Ce délai correspond au fonctionnement de la plateforme et ne doit pas être interprété comme une disposition générale du décret relatif à la CNI.",
        ],
      },
    ],
  },

  {
    slug: "motifs-de-rejet",
    title: "Motifs de rejet et demandes de complément",
    sections: [
      {
        title: "Motifs fréquents",
        items: MOTIFS_REJET,
      },
      {
        title: "Pourquoi une demande peut être refusée ?",
        content: [
          "Une demande peut rencontrer une difficulté lorsque les pièces fournies ne correspondent pas aux documents requis ou lorsque les informations nécessaires ne peuvent pas être vérifiées.",
          "Les extraits ou copies des pièces prévues par le décret ne sont notamment pas admis.",
          "Une incohérence entre les informations saisies et les documents présentés peut également nécessiter une vérification ou une correction.",
        ],
      },
      {
        title: "Rejet ou demande de complément",
        content: [
          "Un rejet signifie que la demande ne peut pas être poursuivie dans son état actuel.",
          "Une demande de complément signifie qu'une information ou une pièce supplémentaire est nécessaire avant de poursuivre le traitement.",
          "Lorsque la plateforme vous demande un complément, consultez précisément le motif indiqué avant de transmettre un nouveau document.",
        ],
      },
      {
        title: "Comment éviter un retour du dossier ?",
        content: [
          "Relisez toutes les informations saisies avant de valider votre demande.",
          "Vérifiez la lisibilité et la conformité des documents transmis.",
          "Utilisez les documents correspondant exactement à votre situation.",
          "En cas de doute sur une pièce administrative, renseignez-vous auprès du service compétent avant le dépôt.",
        ],
      },
    ],
  },

  {
    slug: "centres-de-production",
    title: "Centres de production",
    sections: [
      {
        title: "Centres de production",
        content: [
          "La CNI informatisée et sécurisée ainsi que son duplicata sont exclusivement produits par les centres de production de Brazzaville, de Pointe-Noire et d'Oyo.",
        ],
      },
      {
        title: "Centres concernés",
        items: CENTRES_CNI.map(
          (centre) => `${centre.label} — ${centre.description}`,
        ),
      },
      {
        title: "Lieu de délivrance",
        content: [
          "Selon le décret n° 2024-2692, la carte est délivrée par les chefs de sections départementales et les chefs d'antennes de collecte de données du lieu d'enrôlement du requérant.",
          "Le lieu d'enrôlement et le centre de production ne correspondent donc pas nécessairement au même endroit.",
        ],
      },
      {
        title: "Enrôlement",
        content: [
          "L'enrolement constitue une étape distincte de la production matérielle de la carte.",
          "Les informations relatives au lieu et aux modalités d'enrolement doivent etre vérifiées selon les indications fournies par le service compétent ou par la plateforme.",
        ],
      },
      {
        title: "Retrait de la carte",
        content: [
          "Une fois la carte produite et disponible, les modalités de retrait dépendent du lieu et du circuit de délivrance associés à votre enrôlement.",
          "Consultez votre espace personnel ou les indications communiquées par le service pour connaître les modalités applicables à votre dossier.",
        ],
      },
    ],
  },

  {
    slug: "perte-vol-destruction",
    title: "Perte, vol ou destruction de la carte",
    sections: [
      {
        title: "Que faire immédiatement ?",
        content: [
          "En cas de perte, de vol ou de destruction de votre carte nationale d'identité, vous devez effectuer immédiatement une déclaration auprès du commissariat de police d'arrondissement ou du district le plus proche de votre lieu de résidence.",
        ],
      },
      {
        title: "Attestation",
        content: [
          "Le commissaire de police peut délivrer une attestation de perte, de vol ou de destruction.",
          "Cette attestation est délivrée gratuitement et sa validité ne peut excéder trois mois.",
        ],
      },
      {
        title: "Après la déclaration",
        content: [
          "Conservez précieusement l'attestation délivrée par le commissariat.",
          "Elle pourra etre nécessaire pour effectuer les démarches relatives au remplacement de votre carte.",
        ],
      },
    ],
  },

  {
    slug: "sources-officielles",
    title: "Sources officielles",
    sections: [
      {
        title: "Texte réglementaire principal",
        content: [
          "Décret n° 2024-2692 du 13 novembre 2024 modifiant le décret n° 2009-57 du 13 mars 2009 portant création de la carte nationale d'identité informatisée et sécurisée.",
        ],
      },
      {
        title: "Informations importantes",
        content: [
          "Les informations présentées dans cette documentation sont destinées à faciliter la compréhension des démarches liées à la CNI.",
          "Pour une interprétation juridique ou pour connaître une modification récente de la réglementation, il convient de se référer aux textes officiels publiés par les autorités compétentes.",
        ],
      },
      {
        title: "Journal officiel",
        content: [
          "Le décret n° 2024-2692 a été publié au Journal officiel de la République du Congo, édition n° 47 du 21 novembre 2024.",
        ],
      },
    ],
  },
];

/**
 * Recherche une rubrique de documentation à partir de son slug.
 *
 * Le slug provient de l'URL et permet de retrouver
 * le contenu correspondant dans DOCUMENTATION.
 *
 * @param {string} slug
 */
export function getDocument(slug) {
  return DOCUMENTATION.find((doc) => doc.slug === slug) ?? null;
}