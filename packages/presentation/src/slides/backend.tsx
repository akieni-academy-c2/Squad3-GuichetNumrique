import { Slide } from "@revealjs/react";
import { Bullet, Bullets } from "../components/Bullets.tsx";
import { Frame } from "../components/Frame.tsx";
import { Kicker } from "../components/Kicker.tsx";
import { Title } from "../components/Title.tsx";
import { Tree } from "../components/Tree.tsx";

export function BackendSlides() {
  return (
    <Slide>
      <Frame>
        <Kicker>03 · Backend</Kicker>
        <Title size="lg">Comment fonctionne l'API</Title>
        <p className="mt-3 text-lg text-kumo-subtle">
          Un aperçu des services construits par l'équipe backend.
        </p>
        <div className="mt-8 grid min-w-0 grid-cols-2 items-start gap-8">
          <Bullets>
            <Bullet>
              <strong className="text-kumo-strong">Express 5</strong> en JavaScript
              (Node, ESM) avec <code className="rounded bg-kumo-recessed px-1.5 py-0.5 text-lg text-kumo-strong">node --watch</code>
            </Bullet>
            <Bullet>
              <strong className="text-kumo-strong">PostgreSQL</strong> via le driver{" "}
              <code className="rounded bg-kumo-recessed px-1.5 py-0.5 text-lg text-kumo-strong">pg</code>, seeds inclus
            </Bullet>
            <Bullet>
              Authentification <strong className="text-kumo-strong">JWT</strong> +
              hachage <strong className="text-kumo-strong">bcrypt</strong>
            </Bullet>
            <Bullet>
              Upload de pièces avec <strong className="text-kumo-strong">Multer</strong>, CORS et dotenv
            </Bullet>
            <Bullet>
              Workflow de statuts des demandes, validation des payloads
            </Bullet>
            <Bullet>
              Routes : auth · demandes · dashboard · notifications · points de
              service
            </Bullet>
          </Bullets>
          <Tree>{`routes
  → controllers    (HTTP, request/response)
    → services     (règles métier)
      → repositories (requêtes SQL)
        → PostgreSQL

middlewares : auth (JWT), upload,
             errorHandler
validators  : schéma des payloads`}</Tree>
        </div>
      </Frame>
    </Slide>
  );
}
