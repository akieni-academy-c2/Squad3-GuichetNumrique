import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/context/auth-context.jsx";

export function useSignin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   *
   * @param {{email: string; password: string}} values
   */
  async function signin(values) {
    setIsLoading(true);
    setError(null);
    try {
      await login(values.email, values.password);
      navigate("/dashboard");
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  }

  return { signin, isLoading, error };
}
