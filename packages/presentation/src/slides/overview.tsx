import { Fragment, Slide } from "@revealjs/react";
import { Bullet, Bullets } from "../components/Bullets.tsx";
import { Frame } from "../components/Frame.tsx";
import { Kicker } from "../components/Kicker.tsx";
import { Title } from "../components/Title.tsx";

export function OverviewSlides() {
  return (
    <>
      <Slide>
        <Frame center className="bg-kumo-canvas">
          <p className="mb-6 text-sm font-semibold text-kumo-strong">
            Squad 3 · Formation Akieni
          </p>
          <Title size="2xl">GNA</Title>
          <p className="mt-4 text-4xl font-medium text-kumo-default">
            Guichet Numérique de l'Administration
          </p>
          <p className="mt-10 text-xl text-kumo-subtle">
            Architecture et choix techniques du projet.
          </p>
        </Frame>
      </Slide>

      <Slide>
        <Frame>
          <Kicker>Présentation technique</Kicker>
          <Title size="lg">Les trois parties du système</Title>
          <Bullets className="mt-10 text-2xl text-kumo-default">
            <Fragment>
              <Bullet>
                <strong className="text-kumo-strong">Le monorepo.</strong>{" "}
                Structure du dépôt et outils partagés.
              </Bullet>
            </Fragment>
            <Fragment>
              <Bullet>
                <strong className="text-kumo-strong">Le backend.</strong>{" "}
                Architecture de l'API et accès aux données.
              </Bullet>
            </Fragment>
            <Fragment>
              <Bullet>
                <strong className="text-kumo-strong">Le frontend.</strong>{" "}
                Architecture de l'application et gestion de son état.
              </Bullet>
            </Fragment>
          </Bullets>
        </Frame>
      </Slide>
    </>
  );
}
