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
  const data = useStore((state) => state.getResumeForApi);

  const current = getSubStep(step, subStep);
  const errorList = Object.values(errors);
  const isFirst = step === 1 && subStep === 1;
  const isFinal = isLastStep(step) && isLastSubStep(step, subStep);
  const depose = isFinal && Boolean(submittedAt);

  /**
   *
   * @param {import("react").SubmitEvent} event
   * @returns
   */
  function handleSubmit(event) {
    event.preventDefault();
    const { form, typeDemande } = useStore.getState();

    if (isFinal) {
      if (!validateAll()) {
        return;
      }

      const fd = new FormData();
      fd.append("typeDemande", typeDemande);

      fd.append("identite.nom", form.identite.nom ?? "");
      fd.append("identite.prenoms", form.identite.prenoms ?? "");
      fd.append("identite.sexe", form.identite.sexe ?? "");
      fd.append("identite.dateNaissance", form.identite.dateNaissance ?? "");
      fd.append("identite.lieuNaissance", form.identite.lieuNaissance ?? "");
      fd.append(
        "identite.provinceNaissance",
        form.identite.provinceNaissance ?? "",
      );

      fd.append("filiation.nomPere", form.filiation.nomPere ?? "");
      fd.append("filiation.nomMere", form.filiation.nomMere ?? "");

      fd.append("residence.province", form.residence.province ?? "");
      fd.append("residence.ville", form.residence.ville ?? "");
      fd.append("residence.commune", form.residence.commune ?? "");
      fd.append("residence.avenue", form.residence.avenue ?? "");
      fd.append("residence.numero", form.residence.numero ?? "");
      fd.append("residence.quartier", form.residence.quartier ?? "");

      fd.append("contact.indicatif", form.contact.indicatif ?? "");
      fd.append("contact.telephone", form.contact.telephone ?? "");
      fd.append("contact.email", form.contact.email ?? "");
      fd.append("contact.pointServiceId", form.contact.pointServiceId ?? "");

      fd.append("acte.numeroActe", form.acte.numeroActe ?? "");
      fd.append("acte.typeActe", form.acte.typeActe ?? "");
      fd.append("acte.delivreeLe", form.acte.delivreeLe ?? "");
      fd.append("acte.delivreePar", form.acte.delivreePar ?? "");

      fd.append("nationalite.nationalite", form.nationalite.nationalite ?? "");
      fd.append(
        "nationalite.paysEtranger",
        form.nationalite.paysEtranger ?? "",
      );

      fd.append(
        "complement.ancienNumeroCni",
        form.complement.ancienNumeroCni ?? "",
      );
      fd.append(
        "complement.motifRemplacement",
        form.complement.motifRemplacement ?? "",
      );
      fd.append("complement.declaration", form.complement.declaration ?? "");
      fd.append(
        "complement.dateExpiration",
        form.complement.dateExpiration ?? "",
      );

      fd.append("paiement.moyen", form.paiement.moyen ?? "");
      fd.append("paiement.reference", form.paiement.reference ?? "");
      fd.append("paiement.accepte", form.paiement.accepte ? "true" : "false");

      if (form.pieces.acte_naissance) {
        fd.append("acte_naissance", form.pieces.acte_naissance);
      }
      if (form.pieces.photo_identite) {
        fd.append("photo_identite", form.pieces.photo_identite);
      }
      if (form.pieces.justificatif_sejour) {
        fd.append("justificatif_sejour", form.pieces.justificatif_sejour);
      }

      // ++++++++++++++++++++++++++++++++++++++++
      // ++++++++++++++++++++++++++++++++++++++++
      // ++++++++++++++++++++++++++++++++++++++++
      // ++++++++++++++++++++++++++++++++++++++++
      // fd.forEach((value, key) => console.log({ key: key, value: value }));
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
