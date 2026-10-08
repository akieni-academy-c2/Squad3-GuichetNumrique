import { Slide } from "@revealjs/react";
import { LayerCard } from "@cloudflare/kumo/components/layer-card";
import { Badge } from "../components/Badge.tsx";
import { Bullet, Bullets } from "../components/Bullets.tsx";
import { Frame } from "../components/Frame.tsx";
import { Kicker } from "../components/Kicker.tsx";
import { Title } from "../components/Title.tsx";

export function MonorepoSlides() {
  return (
    <>
      <Slide>
        <Frame>
          <Kicker>02 · Monorepo</Kicker>
          <Title size="lg">Un dépôt, deux applications</Title>
          <div className="mt-10 grid min-w-0 grid-cols-[1.1fr_1fr] items-start gap-8">
            <LayerCard className="rounded-xl bg-kumo-base p-6 ring ring-kumo-hairline">
              <p className="mb-4 text-lg font-semibold text-kumo-strong">
                Organisation du dépôt
              </p>
              <div className="space-y-4">
                <div>
                  <code className="text-kumo-strong">apps/</code>
                  <p className="mt-1 text-base text-kumo-subtle">
                    L'application utilisée par les citoyens et l'API.
                  </p>
                </div>
                <div>
                  <code className="text-kumo-strong">packages/</code>
                  <p className="mt-1 text-base text-kumo-subtle">
                    Les outils de cette présentation.
                  </p>
                </div>
                <div>
                  <code className="text-kumo-strong">À la racine</code>
                  <p className="mt-1 text-base text-kumo-subtle">
                    Les commandes et les outils communs au dépôt.
                  </p>
                </div>
              </div>
            </LayerCard>
            <Bullets>
              <Bullet>
                <strong className="text-kumo-strong">npm workspaces.</strong> Un
                seul fichier gère les dépendances de tout le dépôt.
              </Bullet>
              <Bullet>
                <strong className="text-kumo-strong">Turbo.</strong> Lance les
                deux applications avec{" "}
                <code className="rounded bg-kumo-recessed px-1.5 py-0.5 text-lg text-kumo-strong">
                  npm run dev
                </code>
                .
              </Bullet>
              <Bullet>
                <strong className="text-kumo-strong">
                  Configuration partagée.
                </strong>{" "}
                Prettier, Node 20 et GitHub Actions partagent la même
                configuration.
              </Bullet>
              <Bullet>
                <code className="rounded bg-kumo-recessed px-1.5 py-0.5 text-lg text-kumo-strong">
                  packages/presentation
                </code>{" "}
                Dans ce dossier, Reveal.js, React et Tailwind CSS composent les
                diapositives.
              </Bullet>
            </Bullets>
          </div>
        </Frame>
      </Slide>

      <Slide>
        <Frame>
          <Kicker>02 · Monorepo</Kicker>
          <Title size="lg">Les technologies utilisées</Title>
          <div className="mt-10 grid grid-cols-2 gap-8">
            <LayerCard className="h-full rounded-xl bg-kumo-base p-7 ring ring-kumo-hairline">
              <p className="mb-6 text-sm font-semibold text-kumo-strong">
                Application citoyenne
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  "React 19",
                  "Vite",
                  "Tailwind CSS 4",
                  "Zustand",
                  "React Router",
                ].map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
            </LayerCard>
            <LayerCard className="h-full rounded-xl bg-kumo-base p-7 ring ring-kumo-hairline">
              <p className="mb-6 text-sm font-semibold text-kumo-strong">
                API et services
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  "Express 5",
                  "PostgreSQL",
                  "JSON Web Token",
                  "bcrypt",
                  "Multer",
                ].map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
            </LayerCard>
          </div>
          <p className="mt-8 text-lg text-kumo-subtle">
            Voici les principales dépendances de chaque application.
          </p>
        </Frame>
      </Slide>
    </>
  );
}
