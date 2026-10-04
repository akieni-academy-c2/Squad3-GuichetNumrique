import { CircleCheckIcon } from "lucide-react";
import { Link } from "react-router";

import { Card, CardContent } from "@/components/ui/card";

import { TYPES_DEMANDE } from "@/lib/cni-config";
import { useStore } from "@/store/store";

export function TypeDemandeCard() {
  const typeDemande = useStore((state) => state.typeDemande);

  if (!typeDemande) {
    return null;
  }

  const type = TYPES_DEMANDE.find((t) => t.value === typeDemande);

  return (
    <Card>
      <CardContent className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-start gap-2.5">
          <CircleCheckIcon className="mt-0.5 size-4 shrink-0 text-emerald-500" />
          <div className="flex flex-col gap-0.5">
            <p className="text-sm font-medium">{type?.label}</p>
            <p className="text-muted-foreground text-xs">{type?.description}</p>
          </div>
        </div>

        <Link
          to="/cni"
          className="text-muted-foreground hover:text-foreground text-xs underline underline-offset-4"
        >
          Changer de type de demande
        </Link>
      </CardContent>
    </Card>
  );
}
