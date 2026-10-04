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
import { useRegister } from "@/hooks/useRegister.js";

const initialValues = {
  nom: "",
  prenom: "",
  email: "",
  telephone: "",
  password: "",
};

export function Signup() {
  const [values, setValues] = useState(initialValues);
  const { register, isLoading, error } = useRegister();

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    register(values);
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
                <h1 className="text-2xl font-bold">Créer un compte</h1>
                <p className="text-sm text-balance text-muted-foreground">
                  Renseignez vos informations pour vous inscrire
                </p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="nom">Nom</FieldLabel>
                  <Input
                    id="nom"
                    name="nom"
                    value={values.nom}
                    onChange={handleChange}
                    placeholder="john"
                    required
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="prenom">Prénom</FieldLabel>
                  <Input
                    id="prenom"
                    name="prenom"
                    value={values.prenom}
                    onChange={handleChange}
                    placeholder="Doe"
                    required
                  />
                </Field>
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
                <FieldLabel htmlFor="telephone">Téléphone</FieldLabel>
                <Input
                  id="telephone"
                  name="telephone"
                  type="tel"
                  value={values.telephone}
                  onChange={handleChange}
                  placeholder="+242 06 000 00 00"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
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
                  {isLoading ? "Inscription..." : "S'inscrire"}
                </Button>
                <FieldDescription className="text-center">
                  Déjà un compte ?{" "}
                  <Link
                    to="/auth/signin"
                    className="underline underline-offset-4"
                  >
                    Se connecter
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
