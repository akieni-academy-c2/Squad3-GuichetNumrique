import {
  CheckCircle2,
  Circle,
  Code2,
  IdCard,
  MessageSquare,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    title: "Constituer son dossier",
    description:
      "Extrait d'acte de naissance, certificat de nationalité, justificatif de domicile et photos d'identité.",
    done: true,
  },
  {
    title: "Faire sa demande",
    description:
      "Remplissez le formulaire en ligne et choisissez votre centre d'enrôlement.",
    action: "Remplir le formulaire",
  },
  {
    title: "Payer les frais",
    description: "Réglez les frais et les timbres fiscaux liés à la demande.",
    action: "Payer les frais",
  },
  {
    title: "Enrôlement biométrique",
    description:
      "Présentez-vous au centre avec votre dossier pour la prise des empreintes et de la photo.",
    action: "Prendre rendez-vous",
  },
  {
    title: "Retirer sa carte",
    description:
      "Vous serez informé lorsque votre CNI sera prête. Munissez-vous de votre récépissé.",
  },
];

export function GettingStarted() {
  return (
    <Card className="md:col-span-2 lg:col-span-3">
      <CardContent className="flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-center gap-1.5">
          <IdCard className="size-4 text-primary" />

          <h5 className="text-muted-foreground dark:text-foreground/80 text-xs leading-none font-normal tracking-wide uppercase">
            Carte nationale d'identité
          </h5>
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-3">
          {steps.map((step) => (
            <div
              key={step.title}
              className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
            >
              <div className="flex min-w-0 items-start gap-3 sm:items-center">
                {step.done ? (
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-500 sm:mt-0" />
                ) : (
                  <Circle className="text-muted-foreground/40 mt-0.5 size-5 shrink-0 sm:mt-0" />
                )}

                <div className="flex min-w-0 flex-col gap-0.5">
                  <p
                    className={
                      step.done
                        ? "text-sm font-medium"
                        : "text-sm font-medium text-muted-foreground"
                    }
                  >
                    {step.title}
                  </p>

                  <p className="text-muted-foreground text-xs break-words">
                    {step.description}
                  </p>
                </div>
              </div>

              {step.action && (
                <Button variant="outline" size="sm">
                  {step.action}
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-border flex flex-col items-stretch gap-2 border-t pt-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <p className="text-muted-foreground min-w-0 text-sm">
            Votre dossier sera vérifié avant l'enrôlement biométrique.
          </p>

          <Button size="sm">
            <MessageSquare />
            Commencer ma demande
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
