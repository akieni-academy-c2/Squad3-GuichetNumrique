import { FieldGroup, FieldSet } from "@/components/ui/field";

import { MOTIFS_REMPLACEMENT, SEXES } from "@/lib/cni-config";
import { useStore } from "@/store/store";

import { StepShell } from "../StepShell";
import { DateField, RadioField, TextField, TextareaField } from "../fields";

export function EtatCivil() {
  const typeDemande = useStore((state) => state.typeDemande);
  const needsAncienneCarte =
    typeDemande === "renouvellement" || typeDemande === "remplacement";

  return (
    <StepShell>
      <FieldGroup>
        <FieldSet>
          <FieldGroup>
            <div className="grid gap-5 md:grid-cols-2">
              <TextField
                name="identite.nom"
                label="Nom de famille"
                placeholder="Mouandza"
                autoComplete="family-name"
                maxLength={100}
              />
              <TextField
                name="identite.prenoms"
                label="Prénoms"
                placeholder="Marie-Chantal"
                autoComplete="given-name"
                maxLength={150}
              />
            </div>

            <RadioField
              name="identite.sexe"
              label="Sexe figurant sur l'acte de naissance"
              options={SEXES}
            />
          </FieldGroup>
        </FieldSet>

        <FieldGroup>
          <div className="grid gap-5 md:grid-cols-2">
            <DateField
              name="identite.dateNaissance"
              label="Date de naissance"
              placeholder="Sélectionnez votre date de naissance"
            />
            <TextField
              name="identite.lieuNaissance"
              label="Lieu de naissance"
              placeholder="Brazzaville, arrondissement de Poto-Poto"
              maxLength={180}
            />
          </div>
        </FieldGroup>

        {needsAncienneCarte && (
          <FieldSet>
            <FieldGroup>
              <TextField
                name="complement.ancienNumeroCni"
                label="Numéro de votre ancienne carte"
                description="Ce numéro figure au recto de votre carte nationale d'identité."
                placeholder="CNI-0123456789"
              />
            </FieldGroup>
          </FieldSet>
        )}

        {typeDemande === "remplacement" && (
          <FieldSet>
            <FieldGroup>
              <RadioField
                name="complement.motifRemplacement"
                label="Motif du remplacement"
                options={MOTIFS_REMPLACEMENT}
              />
              <TextareaField
                name="complement.declaration"
                label="Déclaration sur l'honneur"
                description="Décrivez les circonstances de la perte, du vol ou de la destruction. En cas de vol, la déclaration doit être accompagnée d'une plainte déposée au commissariat."
                placeholder="J'ai égaré ma carte le 12 mars 2026 à la sortie du marché de Poto-Poto."
                rows={4}
                maxLength={800}
              />
            </FieldGroup>
          </FieldSet>
        )}
      </FieldGroup>
    </StepShell>
  );
}
