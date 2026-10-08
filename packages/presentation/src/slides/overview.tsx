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
            Découvrez le projet, son organisation et ses applications.
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
                Découvrez ses objectifs et les premières fonctions du MVP.
              </Bullet>
            </Fragment>
            <Fragment>
              <Bullet>
                <strong className="text-kumo-strong">Le monorepo.</strong>{" "}
                Voyons comment le dépôt réunit les applications et leurs outils.
              </Bullet>
            </Fragment>
            <Fragment>
              <Bullet>
                <strong className="text-kumo-strong">Le backend.</strong>{" "}
                L'équipe présente son API et ses principaux services.
              </Bullet>
            </Fragment>
            <Fragment>
              <Bullet>
                <strong className="text-kumo-strong">Le frontend.</strong>{" "}
                Nous verrons le formulaire, son état et ses étapes.
              </Bullet>
            </Fragment>
            <Fragment>
              <Bullet>
                <strong className="text-kumo-strong">Le design.</strong>{" "}
                Voici comment shadcn/ui structure les composants de l'interface.
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
                  Démarches administratives longues et répétitives
                </Bullet>
                <Bullet>
                  Déplacements inutiles vers les guichets physiques
                </Bullet>
                <Bullet>
                  Aucune visibilité sur l'état d'avancement d'un dossier
                </Bullet>
              </Bullets>
            </LayerCard>
            <LayerCard className="rounded-xl bg-kumo-base p-7 ring ring-kumo-hairline">
              <p className="mb-4 text-sm font-semibold text-kumo-strong">
                Notre solution
              </p>
              <Bullets>
                <Bullet>
                  Centraliser les démarches sur une plateforme numérique
                </Bullet>
                <Bullet>
                  Permettre le dépôt des demandes en ligne, depuis chez soi
                </Bullet>
                <Bullet>
                  Donner une référence et un statut à chaque demande
                </Bullet>
              </Bullets>
            </LayerCard>
          </div>
          <Bullets className="mt-8 text-lg text-kumo-subtle">
            <Bullet>
              Objectifs : accès simplifié · compte citoyen · suivi en
              transparence · centralisation progressive des services
            </Bullet>
          </Bullets>
        </Frame>
      </Slide>

      <Slide>
        <Frame>
          <Kicker>01 · Le projet</Kicker>
          <Title size="lg">Un MVP en trois user stories</Title>
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
                text: "Il se connecte et accède à son espace personnel.",
              },
              {
                us: "US3",
                title: "Demande de CNI",
                text: "Il dépose une demande en ligne : référence + statut de suivi.",
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
