import {
  CheckCircle2,
  Circle,
  FileSearchIcon,
  FingerprintIcon,
  IdCard,
  MessageSquare,
  ReceiptIcon,
} from "lucide-react";
import { Link } from "react-router";

import { LIBELLES_STATUTS, STATUTS } from "@/api/demandes";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getCompletionKey, getStep, TOTAL_SUB_STEPS } from "@/lib/cni-steps";
import { useStore } from "@/store/store";

const ETAPES = [
  {
    titre: "Constituer son dossier",
    description:
      "Acte de naissance original, photo d'identité, timbre fiscal et justificatif de séjour si vous êtes ressortissant d'un autre pays.",
    statutsFinaux: [STATUTS.BROUILLON],
  },
  {
    titre: "Déposer la demande",
    description:
      "Remplir le formulaire en ligne et choisir l'antenne de collecte qui vous recevra.",
    statutsFinaux: [STATUTS.SOUMISE, STATUTS.VERIFICATION],
    action: "Remplir le formulaire",
    icone: ReceiptIcon,
  },
  {
    titre: "Faire vérifier le dossier",
    description:
      "Un agent contrôle les informations saisies et peut demander un complément de pièces.",
    statutsFinaux: [STATUTS.COMPLEMENT, STATUTS.VALIDEE],
    action: "Corriger mon dossier",
    icone: FileSearchIcon,
  },
  {
    titre: "Enrôlement biométrique",
    description:
      "Présentez-vous à l'antenne de collecte avec votre dossier et le timbre fiscal pour la prise des empreintes et de la photo.",
    statutsFinaux: [STATUTS.RENDEZ_VOUS, STATUTS.BIOMETRIE],
    action: "Voir mon rendez-vous",
    icone: FingerprintIcon,
  },
  {
    titre: "Retirer sa carte",
    description:
      "Vous serez informé lorsque votre CNI sera prête. Munissez-vous de votre récépissé.",
    statutsFinaux: [STATUTS.DELIBERATION, STATUTS.DISPONIBLE, STATUTS.RETIREE],
    action: "Voir ma carte",
    icone: IdCard,
  },
];

const CHECKLIST_FORM_STEPS = [
  [1, 2],
  [3, 4],
];

/**
 *
 * @param {number} itemIndex
 * @param {Record<string, any>} completed
 * @returns
 */
function isChecklistItemComplete(itemIndex, completed) {
  const formSteps = CHECKLIST_FORM_STEPS[itemIndex] ?? [];
  if (formSteps.length === 0) {
    return false;
  }
  return formSteps.every((stepNumber) =>
    getStep(stepNumber).subSteps.every(
      (subStep) => completed[getCompletionKey(stepNumber, subStep.number)],
    ),
  );
}

function useProgression() {
  const statut = useStore((state) => state.statut);
  const completed = useStore((state) => state.completed);
  const typeDemande = useStore((state) => state.typeDemande);

  if (statut) {
    const index = ETAPES.findIndex((etape) =>
      etape.statutsFinaux.includes(statut),
    );
    const courant = index === -1 ? 0 : index;
    const pourcentage = Math.round(((courant + 1) / ETAPES.length) * 100);

    return {
      source: "demande",
      courant,
      pourcentage,
      terminees: courant + 1,
      total: ETAPES.length,
      statut,
      typeDemande,
    };
  }

  const sousEtapesTerminees = Object.values(completed).filter(Boolean).length;

  if (!typeDemande) {
    return {
      source: "local",
      courant: 0,
      pourcentage: 0,
      terminees: 0,
      total: ETAPES.length,
      statut: null,
      typeDemande: null,
    };
  }

  const courant = ETAPES.findIndex(
    (_, index) => !isChecklistItemComplete(index, completed),
  );

  return {
    source: "local",
    courant,
    pourcentage: Math.round((sousEtapesTerminees / TOTAL_SUB_STEPS) * 100),
    terminees: sousEtapesTerminees,
    total: TOTAL_SUB_STEPS,
    statut: null,
    typeDemande,
  };
}

export function GettingStarted() {
  const progression = useProgression();
  const typeDemande = useStore((state) => state.typeDemande);

  const { courant, source, statut } = progression;
  const etapeCourante = ETAPES[courant];
  const urlFormulaire = typeDemande ? `/cni/formulaire/${typeDemande}` : "/cni";

  return (
    <Card className="md:col-span-2 lg:col-span-3">
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            <IdCard className="text-primary size-4" />
            <h5 className="text-muted-foreground text-xs leading-none font-normal tracking-wide uppercase dark:text-foreground/80">
              Carte nationale d'identité
            </h5>
          </div>

          {statut && (
            <span className="border-border text-muted-foreground rounded-full border px-2.5 py-0.5 text-xs">
              {LIBELLES_STATUTS[statut] ?? statut}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Progress value={progression.pourcentage} className="gap-0" />
          <p className="text-muted-foreground text-xs">
            {source === "demande"
              ? `Étape ${progression.courant + 1} sur ${ETAPES.length} · statut de votre dossier`
              : `${progression.terminees} sous-étape${progression.terminees > 1 ? "s" : ""} complétée${progression.terminees > 1 ? "s" : ""} sur ${progression.total}`}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {ETAPES.map((etape, index) => {
            const done = index < courant;
            const active = index === courant;

            return (
              <div
                key={etape.titre}
                className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
              >
                <div className="flex min-w-0 items-start gap-3 sm:items-center">
                  {done ? (
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-500 sm:mt-0" />
                  ) : (
                    <Circle
                      className={
                        active
                          ? "text-primary mt-0.5 size-5 shrink-0 sm:mt-0"
                          : "text-muted-foreground/40 mt-0.5 size-5 shrink-0 sm:mt-0"
                      }
                    />
                  )}

                  <div className="flex min-w-0 flex-col gap-0.5">
                    <p
                      className={
                        active
                          ? "text-sm font-medium"
                          : done
                            ? "text-sm font-medium"
                            : "text-muted-foreground text-sm font-medium"
                      }
                    >
                      {etape.titre}
                    </p>

                    <p className="text-muted-foreground text-xs break-words">
                      {etape.description}
                    </p>
                  </div>
                </div>

                {active && etape.action && (
                  <Button
                    variant="outline"
                    size="sm"
                    render={<Link to={urlFormulaire} />}
                  >
                    <etape.icone />
                    {etape.action}
                  </Button>
                )}
              </div>
            );
          })}
        </div>

        <div className="border-border flex flex-col items-stretch gap-2 border-t pt-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <p className="text-muted-foreground min-w-0 text-sm">
            {etapeCourante.description}
          </p>

          <Link to={urlFormulaire}>
            <Button size="sm">
              <MessageSquare />
              {source === "demande"
                ? "Ouvrir ma demande"
                : "Commencer ma demande"}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
