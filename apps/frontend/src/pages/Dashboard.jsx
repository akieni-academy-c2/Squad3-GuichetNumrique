import { GettingStarted } from "@/components/getting_started.jsx";
import { StatsCards } from "@/components/stats-items.jsx";
import { useDashboardStats } from "@/hooks/useDashboardStats.js";

export function Dashboard() {
  const { stats, isLoading, error } = useDashboardStats();

  return (
    <div className="grid grid-cols-1 gap-10 py-5">
      <div>
        <h1 className="text-2xl font-bold">Suivi des demandes</h1>
      </div>

      <div>
        <GettingStarted />
      </div>

      <div>
        {error && <p className="mb-4 text-sm text-destructive">{error}</p>}
        <StatsCards
          demandesAujourdhui={stats?.demandesAujourdhui ?? 0}
          parStatut={stats?.parStatut ?? []}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
