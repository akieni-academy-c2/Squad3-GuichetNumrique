import { Fragment, Slide } from "@revealjs/react";
import { LayerCard } from "@cloudflare/kumo/components/layer-card";
import { Badge } from "../components/Badge.tsx";
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
            Un seul endroit pour vos démarches administratives.
          </p>
        </Frame>
      </Slide>

      <Slide>
        <Frame>
          <Kicker>Sommaire</Kicker>
          <Title size="lg">Au programme</Title>
          <Bullets className="mt-10 text-2xl text-kumo-default">
            <Fragment>
              <Bullet>
                <strong className="text-kumo-strong">Le projet.</strong>{" "}
                Pourquoi nous avons créé ce service et ce qu'il propose déjà.
              </Bullet>
            </Fragment>
            <Fragment>
              <Bullet>
                <strong className="text-kumo-strong">Le monorepo.</strong>{" "}
                Comment le dépôt réunit le frontend, l'API et leurs outils.
              </Bullet>
            </Fragment>
            <Fragment>
              <Bullet>
                <strong className="text-kumo-strong">Le backend.</strong> Les
                services qui font fonctionner l'API.
              </Bullet>
            </Fragment>
            <Fragment>
              <Bullet>
                <strong className="text-kumo-strong">Le frontend.</strong> Le
                formulaire de demande et son fonctionnement.
              </Bullet>
            </Fragment>
          </Bullets>
        </Frame>
      </Slide>

      <Slide>
        <Frame>
          <Kicker>01 · Le projet</Kicker>
          <Title size="lg">Un guichet unique, en ligne</Title>
          <div className="mt-10 grid grid-cols-2 gap-10">
            <LayerCard className="rounded-xl bg-kumo-base p-7 ring ring-kumo-hairline">
              <p className="mb-4 text-sm font-semibold text-kumo-strong">
                Problématique
              </p>
              <Bullets>
                <Bullet>
                  Certaines démarches demandent du temps et se répètent.
                </Bullet>
                <Bullet>Il faut souvent se rendre au guichet.</Bullet>
                <Bullet>
                  Il est difficile de savoir où en est son dossier.
                </Bullet>
              </Bullets>
            </LayerCard>
            <LayerCard className="rounded-xl bg-kumo-base p-7 ring ring-kumo-hairline">
              <p className="mb-4 text-sm font-semibold text-kumo-strong">
                Notre solution
              </p>
              <Bullets>
                <Bullet>
                  Retrouver les démarches sur une seule plateforme.
                </Bullet>
                <Bullet>Déposer sa demande depuis chez soi.</Bullet>
                <Bullet>
                  Suivre son dossier grâce à une référence et un statut.
                </Bullet>
              </Bullets>
            </LayerCard>
          </div>
          <Bullets className="mt-8 text-lg text-kumo-subtle">
            <Bullet>
              Chaque citoyen crée son compte, dépose une demande et suit son
              dossier.
            </Bullet>
          </Bullets>
        </Frame>
      </Slide>

      <Slide>
        <Frame>
          <Kicker>01 · Le projet</Kicker>
          <Title size="lg">Trois parcours essentiels</Title>
          <div className="mt-10 grid grid-cols-3 gap-6">
            {[
              {
                us: "US1",
                title: "Création d'un compte",
                text: "Le citoyen crée son compte avec ses informations personnelles.",
              },
              {
                us: "US2",
                title: "Connexion",
                text: "Il se connecte pour retrouver son espace personnel.",
              },
              {
                us: "US3",
                title: "Demande de CNI",
                text: "Il dépose sa demande et suit son avancement.",
              },
            ].map((item) => (
              <LayerCard
                key={item.us}
                className="h-full rounded-xl bg-kumo-base p-7 ring ring-kumo-hairline"
              >
                <p className="text-sm font-semibold text-kumo-strong">
                  {item.us}
                </p>
                <p className="mt-2 text-2xl font-semibold text-kumo-strong">
                  {item.title}
                </p>
                <p className="mt-3 text-lg leading-snug text-kumo-subtle">
                  {item.text}
                </p>
              </LayerCard>
            ))}
          </div>
          <p className="mt-10 mb-4 text-sm font-semibold text-kumo-subtle">
            Parcours citoyen
          </p>
          <div className="flex flex-wrap items-center gap-3 text-lg">
            {[
              "Création du compte",
              "Connexion",
              "Espace citoyen",
              "Demande de CNI",
              "Référence",
              "Suivi de la demande",
            ].map((step, index, all) => (
              <Fragment key={step}>
                <Badge className="text-base">{step}</Badge>
                {index < all.length - 1 && (
                  <span aria-hidden className="text-kumo-subtle">
                    →
                  </span>
                )}
              </Fragment>
            ))}
          </div>
        </Frame>
      </Slide>
    </>
  );
}
