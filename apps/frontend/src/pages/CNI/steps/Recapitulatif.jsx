import { AlertTriangleIcon, CircleCheckIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  FRAIS,
  MOTIFS_REMPLACEMENT,
  formatMontant,
  getTypeDemande,
} from "@/lib/cni-config";
import { formatTaille } from "@/lib/fichiers";
import { formatAdresse, useStore } from "@/store/store";

import { StepShell } from "../StepShell";

export function Recapitulatif() {
  const form = useStore((state) => state.form);
  const typeDemande = useStore((state) => state.typeDemande);
  const isComplete = useStore((state) => state.isReadyToSubmit());
  const frais = useStore((state) => state.getFrais());
  const delai = useStore((state) => state.getDelai());

  const type = getTypeDemande(typeDemande);
  const identite = form.identite;
  const acte = form.acte;
  const nationalite = form.nationalite;

  const lignes = [
    { label: "Type de demande", valeur: type?.label ?? "Non renseigné" },
    { label: "Nom de famille", valeur: identite.nom },
    { label: "Prénoms", valeur: identite.prenoms },
    {
      label: "Sexe",
      valeur:
        identite.sexe === "M"
          ? "Masculin"
          : identite.sexe === "F"
            ? "Féminin"
            : "",
    },
    {
      label: "Date de naissance",
      valeur: identite.dateNaissance
        ? new Date(`${identite.dateNaissance}T00:00:00`).toLocaleDateString(
            "fr-FR",
          )
        : "",
    },
    { label: "Lieu de naissance", valeur: identite.lieuNaissance },
    {
      label: "Département de naissance",
      valeur: identite.provinceNaissance ?? "",
    },
    { label: "Nom du père", valeur: form.filiation.nomPere },
    { label: "Nom de la mère", valeur: form.filiation.nomMere },
    {
      label: "Ancienne carte",
      valeur: form.complement.ancienNumeroCni,
    },
    {
      label: "Motif du remplacement",
      valeur:
        MOTIFS_REMPLACEMENT.find(
          (motif) => motif.value === form.complement.motifRemplacement,
        )?.label ?? "",
    },
    { label: "Numéro d'acte de naissance", valeur: acte.numeroActe },
    {
      label: "Nationalité",
      valeur:
        nationalite.nationalite === "autre"
          ? "Étrangère"
          : nationalite.nationalite === "congolaise"
            ? "Congolaise"
            : "",
    },
    { label: "Pays de nationalité", valeur: nationalite.paysEtranger },
  ];

  const contact = [
    {
      label: "Téléphone",
      valeur:
        `${form.contact.indicatif ?? ""} ${form.contact.telephone}`.trim(),
    },
    { label: "Adresse e-mail", valeur: form.contact.email },
    {
      label: "Département ou commune autonome",
      valeur: form.residence.province ?? "",
    },
    {
      label: "Arrondissement ou commune",
      valeur: form.residence.commune ?? "",
    },
    { label: "Adresse", valeur: formatAdresse(form.residence) },
  ];

  const pieces = Object.entries(form.pieces).map(([cle, piece]) => ({
    cle,
    label: cle.replaceAll("_", " "),
    piece,
  }));

  return (
    <StepShell>
      <Tabs defaultValue="identite">
        <TabsList>
          <TabsTrigger value="identite">Identité</TabsTrigger>
          <TabsTrigger value="residence">Résidence</TabsTrigger>
          <TabsTrigger value="pieces">Pièces</TabsTrigger>
        </TabsList>

        <TabsContent value="identite">
          <RecapTable lignes={lignes} />
        </TabsContent>

        <TabsContent value="residence">
          <RecapTable lignes={contact} />
        </TabsContent>

        <TabsContent value="pieces">
          <div className="flex flex-col gap-3">
            {pieces.map(({ cle, label, piece }) => (
              <div
                key={cle}
                className="border-border flex items-center justify-between gap-3 rounded-lg border px-3 py-2.5"
              >
                <span className="text-sm font-medium capitalize">{label}</span>
                {piece ? (
                  <span className="text-muted-foreground truncate text-sm">
                    {piece.nom} · {formatTaille(piece.taille)}
                  </span>
                ) : (
                  <span className="text-muted-foreground text-sm">
                    {cle === "justificatif_sejour"
                      ? "Non exigée"
                      : "Non jointe"}
                  </span>
                )}
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* <div className="grid gap-3 sm:grid-cols-2">
        <div className="border-border rounded-lg border px-3 py-2.5">
          <p className="text-muted-foreground text-xs tracking-wide uppercase">
            Frais de fabrication
          </p>
          <p className="text-base font-semibold tabular-nums">
            {frais === 0 ? "Gratuit" : formatMontant(frais)}
          </p>
          <p className="text-muted-foreground text-xs">
            Timbre fiscal : {formatMontant(FRAIS.timbre_fiscal)}
          </p>
        </div>
        <div className="border-border rounded-lg border px-3 py-2.5">
          <p className="text-muted-foreground text-xs tracking-wide uppercase">
            Délai de traitement
          </p>
          <p className="text-sm font-medium">{delai}</p>
        </div>
      </div> */}

      {isComplete ? (
        <Alert>
          <CircleCheckIcon />
          <AlertTitle>Dossier complet</AlertTitle>
          <AlertDescription>
            Toutes les informations obligatoires sont renseignées. En déposant
            la demande, vous confirmez l'exactitude des données déclarées et
            prenez connaissance du traitement de vos informations personnelles.
          </AlertDescription>
        </Alert>
      ) : (
        <Alert variant="destructive">
          <AlertTriangleIcon />
          <AlertTitle>Dossier incomplet</AlertTitle>
          <AlertDescription>
            Revenez sur les étapes précédentes pour corriger les informations
            manquantes avant de déposer la demande.
          </AlertDescription>
        </Alert>
      )}
    </StepShell>
  );
}

function RecapTable({ lignes }) {
  return (
    <div className="border-border overflow-hidden rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-2/5">Information</TableHead>
            <TableHead>Valeur</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lignes
            .filter((ligne) => ligne.valeur)
            .map((ligne) => (
              <TableRow key={ligne.label}>
                <TableCell className="font-medium">{ligne.label}</TableCell>
                <TableCell>{ligne.valeur}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
