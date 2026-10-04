import { FieldGroup, FieldSet } from "@/components/ui/field";

import { TERRITOIRES } from "@/lib/cni-config";

import { StepShell } from "../StepShell";
import { SelectField, TextField } from "../fields";

export function NaissanceFiliation() {
  return (
    <StepShell>
      <FieldGroup>
        <FieldSet>
          <FieldGroup>
            <SelectField
              name="identite.provinceNaissance"
              label="Département ou commune autonome de naissance"
              placeholder="Sélectionnez le département"
              options={TERRITOIRES.map((value) => ({
                value,
                label: value,
              }))}
            />
          </FieldGroup>
        </FieldSet>

        <FieldSet>
          <FieldGroup>
            <div className="grid gap-5 md:grid-cols-2">
              <TextField
                name="filiation.nomPere"
                label="Nom du père"
                placeholder="Mouandza"
                autoComplete="off"
                maxLength={150}
              />
              <TextField
                name="filiation.nomMere"
                label="Nom de la mère"
                placeholder="Matsoua"
                autoComplete="off"
                maxLength={150}
              />
            </div>
          </FieldGroup>
        </FieldSet>
      </FieldGroup>
    </StepShell>
  );
}
