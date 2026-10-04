import { CalendarClockIcon, InfoIcon, MapPinIcon } from "lucide-react";

import { FieldGroup, FieldSet } from "@/components/ui/field";

import { CENTRES_CNI } from "@/lib/cni-config";
import { useStore } from "@/store/store";

import { StepShell } from "../StepShell";
import { InfoAlert, SelectField } from "../fields";

export function RendezVous() {
  const pointsService = useStore((state) => state.pointsService);

  const options =
    pointsService.length > 0
      ? pointsService.map((centre) => ({
          value: String(centre.id),
          label: `${centre.nom} — ${centre.arrondissement}`,
        }))
      : CENTRES_CNI.map((centre) => ({
          value: centre.value,
          label: centre.label,
        }));

  return (
    <StepShell>
      <FieldGroup>
        <FieldSet>
          <FieldGroup>
            <SelectField
              name="contact.pointServiceId"
              label="Antenne de collecte souhaitée"
              description="L'annexe choisie reçoit votre dossier. Elle reste susceptible d'être modifiée si aucun rendez-vous n'y est disponible à la date souhaitée."
              placeholder="Sélectionnez une antenne de collecte"
              options={options}
            />
          </FieldGroup>
        </FieldSet>

        <div className="flex items-start gap-3 rounded-lg border px-4 py-3">
          <CalendarClockIcon className="mt-0.5 size-4 shrink-0" />
          <div className="flex flex-col gap-0.5">
            <p className="text-sm font-medium">
              Le rendez-vous est fixé par l'administration
            </p>
            <p className="text-muted-foreground text-sm">
              Une fois votre dossier vérifié et validé, un agent vous contacte
              pour attribuer une date et un créneau d'enrôlement à l'antenne de
              collecte que vous avez choisie. La carte est ensuite produite à
              Brazzaville, Pointe-Noire ou Oyo.
            </p>
          </div>
        </div>

        <InfoAlert title="Vous n'avez rien à réserver ici.">
          Ne vous déplacez pas à l'antenne avant d'avoir reçu la notification de
          rendez-vous. Une présentation sans rendez-vous enregistré entraîne un
          renvoi du dossier.
        </InfoAlert>

        <div className="text-muted-foreground flex items-center gap-2 text-xs">
          <MapPinIcon className="size-3.5" />
          {pointsService.length > 0
            ? "Liste des antennes synchronisée avec le registre national"
            : "Liste des centres de production de la carte"}
        </div>

        <div className="text-muted-foreground flex items-center gap-2 text-xs">
          <InfoIcon className="size-3.5" />
          Présentez-vous muni de votre récépissé de dépôt, de l'acte de
          naissance original et du timbre fiscal acquitté
        </div>
      </FieldGroup>
    </StepShell>
  );
}
