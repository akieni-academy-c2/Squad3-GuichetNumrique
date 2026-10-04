import { FieldGroup, FieldSet } from "@/components/ui/field";

import { PIECES_ACTE, TYPES_ACTE } from "@/lib/cni-config";

import { StepShell } from "../StepShell";
import {
  DateField,
  FileField,
  InfoAlert,
  SelectField,
  TextField,
} from "../fields";

export function ActeNaissance() {
  return (
    <StepShell>
      <FieldGroup>
        <FieldSet>
          <FieldGroup>
            <FileField
              name="pieces.acte_naissance"
              config={PIECES_ACTE.acte_naissance}
              description="Le document doit être lisible, sans bord coupé, et porter les mentions marginales à jour."
            />
          </FieldGroup>
        </FieldSet>

        <FieldSet>
          <FieldGroup>
            <SelectField
              name="acte.typeActe"
              label="Nature du document"
              placeholder="Sélectionnez la nature du document"
              options={TYPES_ACTE}
            />

            <div className="grid gap-5 md:grid-cols-2">
              <TextField
                name="acte.numeroActe"
                label="Numéro de l'acte"
                placeholder="2024/ACT/RM/04517"
                maxLength={60}
              />
              <DateField
                name="acte.delivreeLe"
                label="Date de délivrance"
                placeholder="Sélectionnez la date de délivrance"
              />
            </div>

            <TextField
              name="acte.delivreePar"
              label="Délivré par"
              description="Commune, arrondissement ou service d'état civil émetteur."
              placeholder="Mairie de Bacongo, registre n° 118"
              maxLength={180}
            />
          </FieldGroup>
        </FieldSet>

        <InfoAlert title="Ni extrait, ni copie.">
          Seul l'acte de naissance original est admis. Les extraits et les
          copies sont rejetés d'office par la loi. Si vous ne disposez que d'un
          extrait, retirez l'acte au service d'état civil de votre commune
          d'origine avant de continuer.
        </InfoAlert>
      </FieldGroup>
    </StepShell>
  );
}
