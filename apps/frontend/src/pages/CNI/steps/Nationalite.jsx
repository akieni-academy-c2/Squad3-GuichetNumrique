import { GlobeIcon } from "lucide-react";

import { FieldGroup, FieldSet } from "@/components/ui/field";

import { NATIONALITES, PIECES_ACTE } from "@/lib/cni-config";
import { useStore } from "@/store/store";

import { StepShell } from "../StepShell";
import { FileField, InfoAlert, RadioField, TextField } from "../fields";

export function Nationalite() {
  const nationalite = useStore((state) => state.form.nationalite.nationalite);
  const estEtranger = nationalite === "autre";

  return (
    <StepShell>
      <FieldGroup>
        <FieldSet>
          <FieldGroup>
            <RadioField
              name="nationalite.nationalite"
              label="Nationalité"
              description="La nationalité figure à la page 1 de votre carte et doit correspondre à celle de votre acte de naissance."
              options={NATIONALITES}
            />

            {estEtranger && (
              <TextField
                name="nationalite.paysEtranger"
                label="Pays de nationalité"
                placeholder="République du Cameroun"
                maxLength={120}
              />
            )}
          </FieldGroup>
        </FieldSet>

        <FieldSet>
          <FieldGroup>
            {estEtranger ? (
              <FileField
                name="pieces.justificatif_sejour"
                config={PIECES_ACTE.justificatif_sejour}
                description="Jointez votre passeport et votre carte de séjour ou permis de séjour CEMAC en cours de validité."
              />
            ) : (
              <div className="text-muted-foreground flex items-start gap-3 rounded-lg border border-dashed px-4 py-6">
                <GlobeIcon className="mt-0.5 size-5 shrink-0" />
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-foreground">
                    Aucun justificatif de nationalité requis
                  </p>
                  <p className="text-muted-foreground text-sm">
                    En votre qualité de citoyen congolais, votre nationalité est
                    établie par votre acte de naissance. Passez à l'étape
                    suivante.
                  </p>
                </div>
              </div>
            )}
          </FieldGroup>
        </FieldSet>

        {estEtranger && (
          <InfoAlert title="Vérification consulaire.">
            Un dossier de nationalité étrangère peut faire l'objet d'un contrôle
            supplémentaire par les services de la police nationale, ce qui
            allonge le délai de traitement.
          </InfoAlert>
        )}
      </FieldGroup>
    </StepShell>
  );
}
