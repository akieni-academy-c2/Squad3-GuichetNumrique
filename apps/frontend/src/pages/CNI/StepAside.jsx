import {
  ClockIcon,
  FileWarningIcon,
  HelpCircleIcon,
  ReceiptIcon,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { PIECES_ACTE, PIECES_REQUISES, getDelai } from "@/lib/cni-config";
import { TOTAL_SUB_STEPS, getSubStep } from "@/lib/cni-steps";
import { useStore } from "@/store/store";

const AIDES = {
  etat_civil: {
    titre: "Bien saisir son état civil",
    contenu: [
      "Recopiez le nom et les prénoms tels qu'ils figurent sur l'acte de naissance, y compris les éventuels traits d'union.",
      "Le sexe doit correspondre à la mention inscrite sur l'acte, et non à votre usage courante.",
      "Les demandes comportant une divergence avec l'acte sont automatiquement renvoyées en complément.",
    ],
  },
  naissance_filiation: {
    titre: "Filiation",
    contenu: [
      "Le nom du père et celui de la mère doivent également correspondre à l'acte de naissance.",
      "Indiquez le département où vous êtes né, et non le pays.",
      "En cas de filiation non établie, l'acte de naissance mentionne la mention « filiation inconnue » : dans ce cas, laissez le champ correspondant vide.",
    ],
  },
  adresse: {
    titre: "Adresse de résidence",
    contenu: [
      "Saisissez l'adresse à laquelle vous résidez réellement aujourd'hui.",
      "L'adresse est transmise telle quelle au service qui vous recevra.",
      "Un courrier ou un contact téléphonique associé à une autre adresse peut compliquer la correspondance.",
    ],
  },
  contact: {
    titre: "Joignabilité",
    contenu: [
      "Le numéro de téléphone doit rester actif jusqu'à la réception de votre carte.",
      "L'adresse e-mail reçoit les notifications de changement de statut de la demande.",
      "Évitez les adresses e-mail temporaires.",
    ],
  },
  acte_naissance: {
    titre: "Acte de naissance",
    contenu: [
      "Seul l'acte de naissance original est admis : les extraits et les copies sont rejetés d'office.",
      "Le document doit être un PDF lisible, 10 Mo maximum.",
      "Les mentions marginales de l'acte doivent être à jour : sans cela, il est considéré comme non exploitable.",
    ],
  },
  nationalite: {
    titre: "Nationalité",
    contenu: [
      "Les citoyens congolais n'ont aucune pièce à fournir à cette étape.",
      "Les ressortissants d'un autre pays doivent joindre leur passeport et leur carte ou permis de séjour CEMAC en cours de validité.",
      "La nationalité doit être identique à celle inscrite sur votre acte de naissance.",
    ],
  },
  photo_identite: {
    titre: "Photo d'identité",
    contenu: [
      "JPEG ou PNG, 10 Mo maximum.",
      "Visage de face, expression neutre, sans couvre-chef ni lunettes de soleil.",
      "La photo officielle est de toute façon prise sur place le jour de l'enrôlement.",
    ],
  },
  rendez_vous: {
    titre: "Rendez-vous",
    contenu: [
      "Le rendez-vous est attribué par un agent après validation du dossier.",
      "Les cartes sont produites à Brazzaville, Pointe-Noire et Oyo, puis remises par l'antenne de collecte de votre lieu d'enrôlement.",
      "Choisissez un centre facilement accessible depuis votre adresse de résidence.",
    ],
  },
  paiement: {
    titre: "Frais",
    contenu: [
      "La carte nationale d'identité informatisée est gratuite (décret n° 2024-2692, article 10).",
      "Seul le timbre fiscal est dû : il s'acquitte au guichet de l'antenne de collecte, le jour de l'enrôlement.",
      "Aucun frais n'est débité par cette plateforme.",
    ],
  },
  recapitulatif: {
    titre: "Vérification finale",
    contenu: [
      "Relisez chaque information en la comparant à votre acte de naissance.",
      "Après dépôt, vous disposez d'un délai de deux heures pour corriger le dossier.",
      "Au-delà de ce délai, toute modification nécessite une nouvelle demande.",
    ],
  },
};

export function StepAside() {
  const step = useStore((state) => state.step);
  const subStep = useStore((state) => state.subStep);
  const typeDemande = useStore((state) => state.typeDemande);
  const resume = useStore((state) => state.completed);

  const current = getSubStep(step, subStep);
  const aide = AIDES[current.id] ?? {
    titre: "Besoin d'aide ?",
    contenu: [
      "Contactez le service d'état civil de votre commune d'origine, ou l'antenne de collecte la plus proche de votre domicile.",
    ],
  };

  const termines = Object.values(resume).filter(Boolean).length;

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardContent className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5">
            <HelpCircleIcon className="text-primary size-4" />
            <h3 className="text-muted-foreground text-xs font-normal tracking-wide uppercase">
              {aide.titre}
            </h3>
          </div>
          <ul className="mt-1 flex list-disc flex-col gap-1.5 pl-4">
            {aide.contenu.map((phrase) => (
              <li
                key={phrase}
                className="text-muted-foreground text-sm leading-relaxed"
              >
                {phrase}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-col gap-3">
          <div className="flex items-center gap-1.5">
            <FileWarningIcon className="text-primary size-4" />
            <h3 className="text-muted-foreground text-xs font-normal tracking-wide uppercase">
              Pièces à préparer
            </h3>
          </div>
          <ul className="flex flex-col gap-2">
            {PIECES_REQUISES.map((piece) => (
              <li key={piece} className="text-muted-foreground text-sm">
                {piece}
              </li>
            ))}
          </ul>
          <Separator />
          <div className="text-muted-foreground flex flex-col gap-0.5 text-xs">
            <span>
              Formats acceptés :{" "}
              {PIECES_ACTE.acte_naissance.extensions.join(", ")} pour l'acte de
              naissance, {PIECES_ACTE.photo_identite.extensions.join(", ")} pour
              la photo.
            </span>
            <span>Taille maximale par fichier : 10 Mo.</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex flex-col gap-3">
          <div className="flex items-center gap-1.5">
            <ClockIcon className="text-primary size-4" />
            <h3 className="text-muted-foreground text-xs font-normal tracking-wide uppercase">
              Délai et avancement
            </h3>
          </div>
          <div className="flex flex-col gap-1 text-sm">
            <span className="text-muted-foreground">
              Délai de traitement estimé
            </span>
            <span className="font-medium">{getDelai(typeDemande)}</span>
          </div>
          <Separator />
          <div className="flex flex-col gap-1 text-sm">
            <span className="text-muted-foreground">
              Sous-étapes complétées
            </span>
            <span className="font-medium tabular-nums">
              {termines} sur {TOTAL_SUB_STEPS}
            </span>
          </div>
        </CardContent>
      </Card>

      <div className="text-muted-foreground flex items-start gap-2 px-1 text-xs">
        <ReceiptIcon className="mt-0.5 size-3.5 shrink-0" />
        Un récépissé vous sera remis au guichet. Il vous permettra de suivre
        l'avancement de votre dossier.
      </div>
    </div>
  );
}
