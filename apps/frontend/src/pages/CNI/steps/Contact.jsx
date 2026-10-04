import { FieldGroup, FieldSet } from "@/components/ui/field";

import { PREFIXES_TELEPHONE } from "@/lib/cni-config";

import { StepShell } from "../StepShell";
import { InfoAlert, SelectField, TextField } from "../fields";

export function Contact() {
  return (
    <StepShell>
      <FieldGroup>
        <FieldSet>
          <FieldGroup>
            <SelectField
              name="contact.indicatif"
              label="Indicatif du pays"
              placeholder="Sélectionnez l'indicatif"
              options={PREFIXES_TELEPHONE}
            />

            <TextField
              name="contact.telephone"
              label="Numéro de téléphone"
              placeholder="06 500 12 34"
              type="tel"
              inputMode="tel"
              maxLength={20}
            />

            <TextField
              name="contact.email"
              label="Adresse e-mail"
              description="Adresse à laquelle les notifications de suivi de la demande seront envoyées."
              placeholder="marie.chantal@example.cg"
              type="email"
              autoComplete="email"
              maxLength={180}
            />
          </FieldGroup>
        </FieldSet>

        <InfoAlert title="Numéro joignable.">
          Le service qui vous recevra vous appellera sur ce numéro pour vous
          confirmer le rendez-vous d'enrôlement biométrique. Un numéro
          injoignable retarde le traitement du dossier.
        </InfoAlert>
      </FieldGroup>
    </StepShell>
  );
}
