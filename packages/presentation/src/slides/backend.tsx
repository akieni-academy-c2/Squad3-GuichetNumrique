import { Slide } from "@revealjs/react";
import { LayerCard } from "@cloudflare/kumo/components/layer-card";
import { Bullet, Bullets } from "../components/Bullets.tsx";
import { Frame } from "../components/Frame.tsx";
import { Kicker } from "../components/Kicker.tsx";
import { Title } from "../components/Title.tsx";

export function BackendSlides() {
  return (
    <Slide>
      <Frame>
        <Kicker>03 · Backend</Kicker>
        <Title size="lg">Comment fonctionne l'API</Title>
        <p className="mt-3 text-lg text-kumo-subtle">
          Voici comment une requête traverse l'API.
        </p>
        <div className="mt-8 grid min-w-0 grid-cols-2 items-start gap-8">
          <Bullets>
            <Bullet>
              <strong className="text-kumo-strong">Express 5.</strong> Le
              serveur tourne avec Node.js. En développement,{" "}
              <code className="rounded bg-kumo-recessed px-1.5 py-0.5 text-lg text-kumo-strong">
                node --watch
              </code>{" "}
              le relance après chaque modification.
            </Bullet>
            <Bullet>
              <strong className="text-kumo-strong">PostgreSQL.</strong> Le
              driver{" "}
              <code className="rounded bg-kumo-recessed px-1.5 py-0.5 text-lg text-kumo-strong">
                pg
              </code>
              . Le projet inclut aussi des données de départ.
            </Bullet>
            <Bullet>
              <strong className="text-kumo-strong">Authentification.</strong>{" "}
              JWT gère les sessions et bcrypt protège les mots de passe.
            </Bullet>
            <Bullet>
              <strong className="text-kumo-strong">Fichiers.</strong> Multer
              reçoit les fichiers envoyés. CORS et dotenv complètent la
              configuration.
            </Bullet>
            <Bullet>
              <strong className="text-kumo-strong">Routes.</strong> L'API gère
              les comptes, les demandes, les notifications et les points de
              service.
            </Bullet>
          </Bullets>
          <LayerCard className="rounded-xl bg-kumo-base p-6 ring ring-kumo-hairline">
            <p className="mb-4 text-lg font-semibold text-kumo-strong">
              Le parcours d'une requête
            </p>
            <div className="space-y-3 text-base">
              {[
                ["Routes", "Dirigent la requête vers le bon contrôleur."],
                [
                  "Contrôleurs",
                  "Reçoivent la requête et préparent la réponse.",
                ],
                ["Services", "Exécutent les traitements de l'API."],
                ["Dépôts", "Lisent et enregistrent les données."],
              ].map(([name, description]) => (
                <div
                  key={name}
                  className="flex flex-wrap items-baseline gap-x-2 border-b border-kumo-hairline pb-2 last:border-0 last:pb-0"
                >
                  <span className="font-medium text-kumo-strong">{name}</span>
                  <span className="text-kumo-subtle">{description}</span>
                </div>
              ))}
            </div>
            <p className="mt-5 text-sm text-kumo-subtle">
              Des middlewares vérifient l'accès, reçoivent les fichiers et
              traitent les erreurs. Des validateurs contrôlent les données.
            </p>
          </LayerCard>
        </div>
      </Frame>
    </Slide>
  );
}
