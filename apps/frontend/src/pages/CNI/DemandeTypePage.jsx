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
          Quelle est votre demande ?
        </h1>
        <p className="text-muted-foreground max-w-3xl text-sm leading-relaxed">
          Le type de demande conditionne les pièces à fournir et les frais
            applicables.
        </p>
      </header>

      <section className="flex flex-col gap-4">
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
    </div>
  );
}
