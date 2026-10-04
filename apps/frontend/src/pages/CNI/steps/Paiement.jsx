import { BanknoteIcon, ReceiptIcon } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  FRAIS,
  MOYENS_PAIEMENT,
  formatMontant,
  getTypeDemande,
} from "@/lib/cni-config";
import { useStore } from "@/store/store";

import { StepShell } from "../StepShell";
import { CheckboxField, InfoAlert, RadioField, TextField } from "../fields";

export function Paiement() {
  const typeDemande = useStore((state) => state.typeDemande);
  const moyen = useStore((state) => state.form.paiement.moyen);

  const type = getTypeDemande(typeDemande);

  const lignes = [
    {
      label: `Carte nationale d'identité informatisée (${type?.label ?? "demande"})`,
      montant: FRAIS.carte,
      detail: "Gratuite en application du décret n° 2024-2692 (article 10).",
    },
    {
      label: "Timbre fiscal",
      montant: FRAIS.timbre_fiscal,
      detail: "À coller sur la demande avant le dépôt.",
    },
  ];

  const total = lignes.reduce((sum, ligne) => sum + ligne.montant, 0);

  return (
    <StepShell>
      <div className="flex flex-col gap-6">
        <div className="border-border overflow-hidden rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Prestation</TableHead>
                <TableHead className="text-right">Montant</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lignes.map((ligne) => (
                <TableRow key={ligne.label}>
                  <TableCell className="font-medium">
                    {ligne.label}
                    <span className="text-muted-foreground block text-xs">
                      {ligne.detail}
                    </span>
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {formatMontant(ligne.montant)}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell className="font-semibold">Total à régler</TableCell>
                <TableCell className="text-right text-base font-semibold tabular-nums">
                  {formatMontant(total)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="text-muted-foreground flex items-center gap-2 text-xs">
          <BanknoteIcon className="size-3.5" />
          Seul le timbre fiscal est dû. Son règlement s'effectue auprès du
          guichet de l'antenne de collecte. Le règlement en ligne n'est pas
          encore disponible sur cette plateforme.
        </div>

        <div className="flex flex-col gap-5">
          <RadioField
            name="paiement.moyen"
            label="Moyen de paiement prévu"
            options={MOYENS_PAIEMENT}
          />

          {moyen && moyen !== "especes" && (
            <TextField
              name="paiement.reference"
              label="Référence de la transaction"
              description="À renseigner si le timbre fiscal a déjà été acquitté. Elle sera contrôlée lors du dépôt du dossier."
              placeholder="TM260312.1458.A48271"
              maxLength={60}
            />
          )}

          <CheckboxField
            name="paiement.accepte"
            label="Je déclare avoir pris connaissance des frais et du délai de traitement"
            description="L'apposition du timbre fiscal reste due au guichet lors de l'enrôlement biométrique."
          />
        </div>

        <InfoAlert title="Timbre fiscal obligatoire.">
          Le timbre fiscal acquitté vous sera demandé le jour de l'enrôlement.
          Sans lui, l'enrôlement ne peut pas être effectué.
        </InfoAlert>

        <div className="text-muted-foreground flex items-center gap-2 text-xs">
          <ReceiptIcon className="size-3.5" />
          Un récépissé de dépôt vous sera remis et vous permettra de suivre
          l'avancement de votre demande
        </div>
      </div>
    </StepShell>
  );
}
