import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/context/auth-context.jsx";

export function useRegister() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   *
   * @param {{email: string; password:string;}} values
   */
  async function register(values) {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "Erreur lors de l'inscription");
      }
      await login(values.email, values.password);
      navigate("/dashboard");
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  }

  return { register, isLoading, error };
}
