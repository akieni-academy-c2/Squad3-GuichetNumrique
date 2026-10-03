import { useState } from "react";
import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useSignin } from "@/hooks/useSignin.js";

const initialValues = {
  email: "",
  password: "",
};

export function Signin() {
  const [values, setValues] = useState(initialValues);
  const { signin, isLoading, error } = useSignin();

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    signin(values);
  }

  return (
    <div className="m-auto">
      <div className="grid min-h-svh lg:grid-cols-2">
        <div className="flex flex-col justify-center gap-4 p-6 w-full md:m-auto md:max-w-3xl md:py-10 md:px-35">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
            aria-busy={isLoading}
          >
            <FieldGroup>
              <div className="flex flex-col items-center gap-1 text-center">
                <h1 className="text-2xl font-bold">Connexion</h1>
                <p className="text-sm text-balance text-muted-foreground">
                  Entrez vos identifiants pour accéder à votre compte
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  placeholder="johnDoe@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Mot de passe oublié ?
                  </a>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  required
                />
                {error && <FieldError>{error}</FieldError>}
              </Field>
              <Field>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Connexion..." : "Se connecter"}
                </Button>
                <FieldDescription className="text-center">
                  Pas encore de compte ?{" "}
                  <Link
                    to="/auth/signup"
                    className="underline underline-offset-4"
                  >
                    S&apos;inscrire
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </div>

        <div className="relative hidden bg-muted lg:block">
          <img
            src="/paysage.jpeg"
            alt="lorm"
            className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] grayscale"
          />
        </div>
      </div>
    </div>
  );
}
