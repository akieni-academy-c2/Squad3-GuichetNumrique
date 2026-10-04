import { FieldGroup, FieldSet } from "@/components/ui/field";

import { PIECES_ACTE } from "@/lib/cni-config";

import { StepShell } from "../StepShell";
import { FileField, InfoAlert } from "../fields";

export function PhotoIdentite() {
  return (
    <StepShell>
      <FieldGroup>
        <FieldSet>
          <FieldGroup>
            <FileField
              name="pieces.photo_identite"
              config={PIECES_ACTE.photo_identite}
              description="Format carré recommandé, visage de face, sans lunettes de soleil ni couvre-chef."
            />
          </FieldGroup>
        </FieldSet>

        <InfoAlert title="Photo prise sur place.">
          La photo biométrique officielle est prise le jour de l'enrôlement à
          l'antenne de collecte. La photo jointe ici sert uniquement à
          préremplir votre dossier.
        </InfoAlert>
      </FieldGroup>
    </StepShell>
  );
}
