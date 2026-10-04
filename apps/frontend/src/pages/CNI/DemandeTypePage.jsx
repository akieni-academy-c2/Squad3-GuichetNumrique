import {
  ArrowRightIcon,
  CircleCheckIcon,
  FileCheckIcon,
  ListChecksIcon,
} from "lucide-react";
import { cn } from "cn";
import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  DELAIS,
  PIECES_REQUISES,
  TYPES_DEMANDE,
  VALIDITE_CARTE_ANNEES,
} from "@/lib/cni-config";
import { useStore } from "@/store/store";

export function DemandeTypePage() {
  const typeDemande = useStore((state) => state.typeDemande);
  const courante = TYPES_DEMANDE.find((t) => t.value === typeDemande);

  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">
          Demande de carte nationale d'identité
        </h1>
        <p className="text-muted-foreground max-w-3xl text-sm leading-relaxed">
          La carte nationale d'identité informatisée est le document officiel
          d'identité délivré aux citoyens de la République du Congo. Elle est
          valable {VALIDITE_CARTE_ANNEES} ans, renouvelable, et conditionne
          toute démarche administrative, bancaire ou scolaire. Commencez par
          indiquer le type de demande que vous souhaitez effectuer.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-base font-semibold tracking-tight">
            Quelle est votre demande ?
          </h2>
          <p className="text-muted-foreground text-sm">
            Le type de demande conditionne les pièces à fournir et les frais
            applicables.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {TYPES_DEMANDE.map((type) => {
            const active = type.value === typeDemande;

            return (
              <Link
                key={type.value}
                to={`/cni/formulaire/${type.value}`}
                className={cn(
                  "group/option focus-visible:border-ring focus-visible:ring-3 flex flex-col gap-1 rounded-lg border px-3.5 py-3 text-left transition-colors",
                  "focus-visible:ring-ring/50 outline-none",
                  active
                    ? "border-primary bg-secondary/60"
                    : "border-border hover:border-foreground/25 hover:bg-secondary/60",
                )}
              >
                <span className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium">{type.label}</span>
                  {active && (
                    <CircleCheckIcon className="size-4 shrink-0 text-emerald-500" />
                  )}
                </span>
                <span className="text-muted-foreground text-xs leading-relaxed">
                  {type.description}
                </span>
                {active && (
                  <span className="text-muted-foreground text-xs">
                    Dossier en cours
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {courante && (
          <div className="flex items-center justify-between gap-4 rounded-lg border border-dashed px-3.5 py-3">
            <p className="text-muted-foreground text-sm">
              Votre dossier en cours est un{" "}
              <span className="text-foreground font-medium">
                {courante.label.toLowerCase()}
              </span>
              . Vous pouvez le reprendre où vous l'avez laissé.
            </p>
            <Button render={<Link to={`/cni/formulaire/${courante.value}`} />}>
              Continuer mon dossier
              <ArrowRightIcon data-icon="inline-end" />
            </Button>
          </div>
        )}
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card size="sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCheckIcon className="text-primary size-4" />
              Pièces à fournir
            </CardTitle>
            <CardDescription>
              Les mêmes pièces sont demandées quel que soit le type de demande.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="flex list-disc flex-col gap-1.5 pl-4">
              {PIECES_REQUISES.map((piece) => (
                <li key={piece} className="text-muted-foreground text-sm">
                  {piece}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card size="sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ListChecksIcon className="text-primary size-4" />
              Délais indicatifs
            </CardTitle>
            <CardDescription>
              Les délais démarrent à l'enrôlement biométrique.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-2">
              {TYPES_DEMANDE.map((type) => (
                <li
                  key={type.value}
                  className="flex flex-col gap-0.5 border-b pb-2 last:border-b-0 last:pb-0"
                >
                  <span className="text-sm font-medium">{type.label}</span>
                  <span className="text-muted-foreground text-xs">
                    {DELAIS[type.value]}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
