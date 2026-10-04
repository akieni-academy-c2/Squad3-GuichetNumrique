import { Card, CardContent } from "@/components/ui/card";

export function StatsCards({
  demandesAujourdhui = 0,
  parStatut = [],
  isLoading = false,
}) {
  const totalDemandes = parStatut.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="md:col-span-2 lg:col-span-3">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
        <Card className="h-full">
          <CardContent className="flex flex-1 flex-col p-4 py-0">
            <div className="flex items-center justify-between gap-1.5">
              <h5 className="text-muted-foreground dark:text-foreground/80 text-xs leading-none font-normal tracking-wide uppercase">
                Demandes Aujourdhui
              </h5>
            </div>

            <div className="mt-2 flex flex-wrap items-baseline gap-2">
              <div className="text-brand-accent text-3xl font-bold tracking-tight tabular-nums">
                {isLoading ? "..." : demandesAujourdhui}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardContent className="flex flex-1 flex-col p-4 py-0">
            <div className="flex items-center justify-between gap-1.5">
              <h5 className="text-muted-foreground dark:text-foreground/80 text-xs leading-none font-normal tracking-wide uppercase">
                Par statut
              </h5>
            </div>

            <div className="mt-2 flex flex-wrap items-baseline gap-2">
              <div className="text-foreground text-3xl font-bold tracking-tight tabular-nums">
                {isLoading ? "..." : totalDemandes}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
