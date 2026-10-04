import {
  AlertCircleIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  SendIcon,
} from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

import { DELAI_MODIFICATION_HEURES } from "@/lib/cni-config";
import { getSubStep, isLastStep, isLastSubStep } from "@/lib/cni-steps";
import { useStore } from "@/store/store";

export function StepShell({ children }) {
  const step = useStore((state) => state.step);
  const subStep = useStore((state) => state.subStep);
  const errors = useStore((state) => state.errors);
  const submittedAt = useStore((state) => state.submittedAt);
  const previous = useStore((state) => state.previous);
  const next = useStore((state) => state.next);
  const goToStep = useStore((state) => state.goToStep);
  const validateAll = useStore((state) => state.validateAll);
  const markSubmitted = useStore((state) => state.markSubmitted);

  const current = getSubStep(step, subStep);
  const errorList = Object.values(errors);
  const isFirst = step === 1 && subStep === 1;
  const isFinal = isLastStep(step) && isLastSubStep(step, subStep);
  const depose = isFinal && Boolean(submittedAt);

  function handleSubmit(event) {
    event.preventDefault();

    if (isFinal) {
      if (!validateAll()) {
        return;
      }
      markSubmitted();
      return;
    }

    next();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col gap-1.5">
        <div className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium tracking-wide uppercase">
          Étape {step}.{subStep}
        </div>
        <h2 className="text-xl font-semibold tracking-tight">
          {current.title}
        </h2>
        <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">
          {current.description}
        </p>
      </div>

      {errorList.length > 0 && (
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>Certains champs sont incomplets</AlertTitle>
          <AlertDescription>
            <ul className="mt-1 list-disc space-y-0.5 pl-4">
              {errorList.map((message) => (
                <li key={message}>{message}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col gap-5">{children}</div>

      <div className="border-border flex flex-wrap items-center justify-between gap-3 border-t pt-4">
        <Button
          type="button"
          variant="ghost"
          onClick={previous}
          disabled={isFirst}
        >
          <ArrowLeftIcon />
          Précédent
        </Button>

        <div className="flex items-center gap-2">
          {!isFirst && (
            <Button
              type="button"
              variant="outline"
              onClick={() => goToStep(1, 1)}
            >
              Revenir au début
            </Button>
          )}

          <Button type="submit">
            {depose
              ? "Demande déposée"
              : isFinal
                ? "Déposer la demande"
                : "Continuer"}
            {isFinal && <SendIcon />}
            {!isFinal && <ArrowRightIcon />}
          </Button>
        </div>
      </div>

      {depose && (
        <Alert>
          <AlertTitle>
            Demande déposée le {new Date(submittedAt).toLocaleString("fr-FR")}
          </AlertTitle>
          <AlertDescription>
            Votre dossier part maintenant en vérification. Vous disposez de{" "}
            {DELAI_MODIFICATION_HEURES} heures pour corriger une information
            erronée ; passé ce délai, la modification n'est plus possible.
          </AlertDescription>
        </Alert>
      )}
    </form>
  );
}
