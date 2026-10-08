import { Slide } from "@revealjs/react";
import { LayerCard } from "@cloudflare/kumo/components/layer-card";
import { Badge } from "../components/Badge.tsx";
import { Bullet, Bullets } from "../components/Bullets.tsx";
import { Frame } from "../components/Frame.tsx";
import { Kicker } from "../components/Kicker.tsx";
import { Title } from "../components/Title.tsx";
import { Tree } from "../components/Tree.tsx";

export function MonorepoSlides() {
  return (
    <>
      <Slide>
        <Frame>
          <Kicker>02 · Monorepo</Kicker>
          <Title size="lg">Un dépôt, deux applications</Title>
          <div className="mt-10 grid min-w-0 grid-cols-[1.1fr_1fr] items-start gap-8">
            <Tree>{`squad3/
├── apps/
│   ├── frontend/        Application citoyenne avec Vite et React
│   └── backend/         API REST avec Express
├── packages/
│   └── presentation/    Cette présentation
├── package.json         workspaces : apps/*
├── turbo.json           tâches dev / build / start
└── docker-compose.yaml`}</Tree>
            <Bullets>
              <Bullet>
                <strong className="text-kumo-strong">npm workspaces</strong>{" "}
                partagent les dépendances à la racine du dépôt.
              </Bullet>
              <Bullet>
                <strong className="text-kumo-strong">Turbo</strong> lance les deux applications avec une seule commande :{" "}
                <code className="rounded bg-kumo-recessed px-1.5 py-0.5 text-lg text-kumo-strong">
                  npm run dev
                </code>{" "}
                lance le frontend et le backend
              </Bullet>
              <Bullet>
                Config commune : Prettier, Node ≥ 20, CI GitHub Actions
              </Bullet>
              <Bullet>
                <code className="rounded bg-kumo-recessed px-1.5 py-0.5 text-lg text-kumo-strong">
                  packages/presentation
                </code>{" "}
                est autonome (Reveal.js + React + Tailwind)
              </Bullet>
            </Bullets>
          </div>
        </Frame>
      </Slide>

      <Slide>
        <Frame>
          <Kicker>02 · Monorepo</Kicker>
          <Title size="lg">Stack technique</Title>
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
                  "shadcn/ui",
                  "Lucide",
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
