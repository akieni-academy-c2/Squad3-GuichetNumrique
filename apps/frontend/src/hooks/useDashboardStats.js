import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth-context.jsx";

export function useDashboardStats() {
  const { token } = useAuth();
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      console.log(token);
      try {
        const res = await fetch("/api/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const body = await res.json().catch(() => null);
        if (!res.ok) {
          throw new Error(
            body?.error ?? "Erreur lors du chargement des statistiques",
          );
        }
        setStats(body.data);
      } catch (e) {
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadStats();
  }, [token]);

  return { stats, isLoading, error };
}
