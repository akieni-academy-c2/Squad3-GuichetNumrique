import { CircleCheckIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { TYPES_DEMANDE } from "@/lib/cni-config";
import { useStore } from "@/store/store";

export function TypeDemandeCard() {
  const typeDemande = useStore((state) => state.typeDemande);
  const setTypeDemande = useStore((state) => state.setTypeDemande);
  const goToStep = useStore((state) => state.goToStep);

  if (typeDemande) {
    const type = TYPES_DEMANDE.find((t) => t.value === typeDemande);

    return (
      <Card>
        <CardContent className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-start gap-2.5">
            <CircleCheckIcon className="mt-0.5 size-4 shrink-0 text-emerald-500" />
            <div className="flex flex-col gap-0.5">
              <p className="text-sm font-medium">{type?.label}</p>
              <p className="text-muted-foreground text-xs">
                {type?.description}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setTypeDemande(null)}
            className="text-muted-foreground hover:text-foreground text-xs underline underline-offset-4"
          >
            Changer de type de demande
          </button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="flex flex-col gap-4">
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
          {TYPES_DEMANDE.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => {
                setTypeDemande(type.value);
                goToStep(1, 1);
              }}
              className="border-border hover:border-foreground/25 hover:bg-secondary/60 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 flex flex-col gap-1 rounded-lg border px-3.5 py-3 text-left transition-colors"
            >
              <span className="text-sm font-medium">{type.label}</span>
              <span className="text-muted-foreground text-xs leading-relaxed">
                {type.description}
              </span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
