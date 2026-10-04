import { BuildingIcon, MapPinIcon } from "lucide-react";

import { FieldGroup, FieldSet } from "@/components/ui/field";

import {
  ARRONDISSEMENTS_BRAZZAVILLE,
  COMMUNES_AUTONOMES,
  DEPARTEMENTS,
} from "@/lib/cni-config";
import { formatAdresse, useStore } from "@/store/store";

import { StepShell } from "../StepShell";
import { InfoAlert, SelectField, TextField } from "../fields";

export function Adresse() {
  const residence = useStore((state) => state.form.residence);
  const territoire = residence.province;

  return (
    <StepShell>
      <FieldGroup>
        <FieldSet>
          <FieldGroup>
            <SelectField
              name="residence.province"
              label="Département ou commune autonome"
              placeholder="Sélectionnez le département"
              options={[...COMMUNES_AUTONOMES, ...DEPARTEMENTS].map(
                (value) => ({
                  value,
                  label: value,
                }),
              )}
            />

            <TextField
              name="residence.ville"
              label="Ville"
              placeholder="Brazzaville"
              autoComplete="address-level2"
              maxLength={120}
            />

            <SelectField
              name="residence.commune"
              label="Arrondissement, commune ou quartier"
              description={
                territoire === "Brazzaville"
                  ? "Sélectionnez l'arrondissement de Brazzaville concerné."
                  : "Indiquez la commune, l'arrondissement ou le quartier."
              }
              placeholder="Sélectionnez la commune"
              options={(territoire === "Brazzaville"
                ? ARRONDISSEMENTS_BRAZZAVILLE
                : DEPARTEMENTS
              ).map((value) => ({
                value,
                label: value,
              }))}
            />
          </FieldGroup>
        </FieldSet>

        <FieldSet>
          <FieldGroup>
            <div className="grid gap-5 md:grid-cols-[2fr_1fr]">
              <TextField
                name="residence.avenue"
                label="Avenue, rue ou quartier"
                placeholder="Avenue de la Libération"
                autoComplete="address-line1"
                maxLength={180}
              />
              <TextField
                name="residence.numero"
                label="Numéro"
                placeholder="42"
                inputMode="numeric"
                maxLength={10}
              />
            </div>

            <TextField
              name="residence.quartier"
              placeholder="Quartier Selembao"
              label="Complément d'adresse"
              description="Référence, building, ou tout élément utile au coursier."
              maxLength={180}
            />
          </FieldGroup>
        </FieldSet>

        <InfoAlert title="Justificatif de domicile.">
          L'adresse saisie doit correspondre à votre lieu de résidence effectif.
          Un justificatif vous sera demandé si l'adresse déclarée diffère de
          celle de votre acte de naissance.
        </InfoAlert>

        <div className="border-border bg-muted/30 flex flex-col gap-1 rounded-lg border px-3 py-2.5">
          <span className="text-muted-foreground flex items-center gap-1.5 text-xs font-medium tracking-wide uppercase">
            <MapPinIcon className="size-3.5" />
            Adresse complète
          </span>
          <span className="text-sm">
            {formatAdresse(residence) || "Adresse non renseignée"}
          </span>
        </div>

        <div className="text-muted-foreground flex items-center gap-2 text-xs">
          <BuildingIcon className="size-3.5" />
          Adresse déclarée auprès de l'administration
        </div>
      </FieldGroup>
    </StepShell>
  );
}
