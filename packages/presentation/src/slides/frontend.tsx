import { Code, Fragment, Slide } from "@revealjs/react";
import { LayerCard } from "@cloudflare/kumo/components/layer-card";
import { Bullet, Bullets } from "../components/Bullets.tsx";
import { Frame } from "../components/Frame.tsx";
import { Kicker } from "../components/Kicker.tsx";
import { Title } from "../components/Title.tsx";

export function FrontendSlides() {
  return (
    <>
      <Slide>
        <Frame>
          <Kicker>04 · Frontend</Kicker>
          <Title size="lg">Comment l'application est organisée</Title>
          <div className="mt-10 grid min-w-0 grid-cols-[1.1fr_1fr] items-start gap-8">
            <LayerCard className="rounded-xl bg-kumo-base p-6 ring ring-kumo-hairline">
              <p className="mb-4 text-lg font-semibold text-kumo-strong">
                Les espaces principaux
              </p>
              <div className="space-y-3 text-base">
                {[
                  ["api", "Centralise les appels au backend."],
                  ["lib", "Regroupe les modules partagés."],
                  ["store", "Contient l'état global de l'application."],
                  ["pages", "Organise les vues par fonctionnalité."],
                  ["components/ui", "Réunit les composants d'interface."],
                  ["hooks et context", "Partagent les services React."],
                ].map(([name, description]) => (
                  <div
                    key={name}
                    className="flex flex-wrap items-baseline gap-x-2 border-b border-kumo-hairline pb-2 last:border-0 last:pb-0"
                  >
                    <code className="text-kumo-strong">{name}</code>
                    <span className="text-kumo-subtle">{description}</span>
                  </div>
                ))}
              </div>
            </LayerCard>
            <Bullets>
              <Bullet>
                <strong className="text-kumo-strong">Vite et React 19.</strong>{" "}
                Construisent et exécutent l'application côté client.
              </Bullet>
              <Bullet>
                <strong className="text-kumo-strong">React Router.</strong> Gère
                les routes et protège les pages privées avec{" "}
                <code className="rounded bg-kumo-recessed px-1.5 py-0.5 text-lg text-kumo-strong">
                  ProtectedRoute
                </code>
                .
              </Bullet>
              <Bullet>
                <strong className="text-kumo-strong">JavaScript et JSX.</strong>{" "}
                Définissent les vues et les composants React.
              </Bullet>
              <Bullet>
                <strong className="text-kumo-strong">État partagé.</strong>{" "}
                Zustand centralise les données utilisées par les composants.
              </Bullet>
            </Bullets>
          </div>
        </Frame>
      </Slide>

      <Slide>
        <Frame>
          <Kicker>04 · Frontend, état global</Kicker>
          <Title size="lg">Zustand et persistance des données</Title>
          <div className="mt-8 grid grid-cols-[1.15fr_1fr] items-start gap-10">
            <div className="text-sm leading-relaxed">
              <Code language="jsx" trim>
                {`export const useStore = create(
  persist(
    (set) => ({
      form: INITIAL_FORM,
      errors: {},
      completed: {},
      setField,
      reset,
    }),
    {
      name: "cni-dossier",
      version: 2,
      migrate: migratePersistedState,
      partialize: (state) => ({ ... }),
    },
  ),
);`}
              </Code>
            </div>
            <Bullets className="text-lg">
              <Bullet>
                <strong className="text-kumo-strong">Zustand.</strong> Un store
                partagé évite de transmettre les données à travers chaque niveau
                de composants.
              </Bullet>
              <Bullet>
                <strong className="text-kumo-strong">Sélecteurs.</strong> Chaque
                composant s'abonne uniquement aux valeurs dont il a besoin, par
                exemple{" "}
                <code className="rounded bg-kumo-recessed px-1.5 py-0.5 text-base text-kumo-strong">
                  useStore((s) =&gt; s.form)
                </code>
                .
              </Bullet>
              <Bullet>
                <strong className="text-kumo-strong">
                  Middleware persist.
                </strong>{" "}
                Enregistre l'état dans le navigateur et le restaure au
                rechargement.
              </Bullet>
              <Bullet>
                <strong className="text-kumo-strong">
                  Version et migration.
                </strong>{" "}
                Adaptent les données sauvegardées quand la structure évolue.
              </Bullet>
              <Bullet>
                <strong className="text-kumo-strong">partialize.</strong>{" "}
                Choisit les propriétés conservées entre deux visites.
              </Bullet>
            </Bullets>
          </div>
        </Frame>
      </Slide>

      <Slide>
        <Frame center className="bg-kumo-canvas">
          <Fragment>
            <p className="mb-6 text-sm font-semibold text-kumo-strong">GNA</p>
            <Title size="xl">Merci</Title>
          </Fragment>
        </Frame>
      </Slide>
    </>
  );
}
