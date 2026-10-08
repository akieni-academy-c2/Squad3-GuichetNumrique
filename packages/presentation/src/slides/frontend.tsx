import { Code, Fragment, Slide } from "@revealjs/react";
import { LayerCard } from "@cloudflare/kumo/components/layer-card";
import { Bullet, Bullets } from "../components/Bullets.tsx";
import { Frame } from "../components/Frame.tsx";
import { Kicker } from "../components/Kicker.tsx";
import { Title } from "../components/Title.tsx";

const STEPS_UI = [
  {
    number: "1",
    title: "Identité",
    subSteps: ["État civil", "Naissance & filiation"],
  },
  {
    number: "2",
    title: "Résidence",
    subSteps: ["Adresse", "Contact"],
  },
  {
    number: "3",
    title: "Pièces justificatives",
    subSteps: ["Acte de naissance", "Nationalité", "Photo d'identité"],
  },
  {
    number: "4",
    title: "Étape finale",
    subSteps: ["Rendez-vous", "Récapitulatif"],
  },
];

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
                  ["api", "Envoie les demandes au serveur."],
                  ["lib", "Rassemble les règles et la configuration."],
                  ["store", "Conserve les réponses du formulaire."],
                  ["pages", "Affiche les démarches et l'espace citoyen."],
                  ["components/ui", "Réunit les éléments de l'interface."],
                  ["hooks et context", "Partagent la logique et la session."],
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
                Le frontend est écrit en JavaScript et JSX.
              </Bullet>
              <Bullet>
                <strong className="text-kumo-strong">React Router.</strong>{" "}
                Affiche les bonnes pages et protège l'espace privé grâce à{" "}
                <code className="rounded bg-kumo-recessed px-1.5 py-0.5 text-lg text-kumo-strong">
                  routes.jsx
                </code>{" "}
                et{" "}
                <code className="rounded bg-kumo-recessed px-1.5 py-0.5 text-lg text-kumo-strong">
                  ProtectedRoute
                </code>
                .
              </Bullet>
              <Bullet>
                <strong className="text-kumo-strong">Formulaire CNI.</strong>{" "}
                Les réponses restent disponibles d'une étape à l'autre.
              </Bullet>
              <Bullet>
                <strong className="text-kumo-strong">Règles métier.</strong>{" "}
                Vous les retrouverez dans{" "}
                <code className="rounded bg-kumo-recessed px-1.5 py-0.5 text-lg text-kumo-strong">
                  lib/
                </code>
                .
              </Bullet>
            </Bullets>
          </div>
        </Frame>
      </Slide>

      <Slide>
        <Frame>
          <Kicker>04 · Frontend, le store</Kicker>
          <Title size="lg">Un seul store pour le formulaire</Title>
          <div className="mt-8 grid grid-cols-[1.15fr_1fr] items-start gap-10">
            <div className="text-sm leading-relaxed">
              <Code language="jsx" trim>
                {`export const useStore = create(
  persist(
    (set, get) => ({
      typeDemande: null,
      step: 1,
      subStep: 1,
      form: INITIAL_FORM,     // identite, filiation,
                              // residence, contact...
      errors: {},
      completed: {},

      setField, next, previous,
      validateAll, getProgress, getResumeForApi,
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
                <strong className="text-kumo-strong">Zustand.</strong> Le store
                garde les réponses du formulaire. Chaque composant lit
                uniquement ce dont il a besoin, par exemple{" "}
                <code className="rounded bg-kumo-recessed px-1.5 py-0.5 text-base text-kumo-strong">
                  useStore((s) =&gt; s.step)
                </code>
              </Bullet>
              <Bullet>
                <strong className="text-kumo-strong">
                  setField("identite.nom", v)
                </strong>{" "}
                met à jour le champ et retire son message d'erreur.
              </Bullet>
              <Bullet>
                <strong className="text-kumo-strong">persist.</strong> Les
                réponses restent disponibles après un rechargement de la page.
              </Bullet>
              <Bullet>
                <strong className="text-kumo-strong">
                  version et migrate.
                </strong>{" "}
                Ces options permettent de faire évoluer la structure du
                formulaire.
              </Bullet>
              <Bullet>
                <strong className="text-kumo-strong">partialize.</strong> Seules
                les données utiles sont enregistrées.
              </Bullet>
            </Bullets>
          </div>
        </Frame>
      </Slide>

      <Slide>
        <Frame>
          <Kicker>04 · Frontend, le store</Kicker>
          <Title size="lg">Faire avancer et vérifier le formulaire</Title>
          <div className="mt-8 grid grid-cols-[1fr_1.05fr] items-start gap-10">
            <Bullets className="text-lg">
              <Bullet>
                <strong className="text-kumo-strong">next().</strong> Vérifie
                les réponses et marque la sous-étape comme terminée dans{" "}
                <code className="rounded bg-kumo-recessed px-1.5 py-0.5 text-base text-kumo-strong">
                  completed
                </code>{" "}
                puis ouvre la suivante.
              </Bullet>
              <Bullet>
                <strong className="text-kumo-strong">validateSubStep().</strong>{" "}
                Vérifie les champs requis et affiche un message clair pour
                chaque erreur grâce à{" "}
                <code className="rounded bg-kumo-recessed px-1.5 py-0.5 text-base text-kumo-strong">
                  LABELS
                </code>
              </Bullet>
              <Bullet>
                <strong className="text-kumo-strong">validateAll().</strong>{" "}
                Vérifie les huit sous-étapes et ramène l'usager à la première
                erreur.
              </Bullet>
              <Bullet>
                <strong className="text-kumo-strong">getProgress().</strong>{" "}
                Calcule la progression en comparant les étapes terminées au
                total de{" "}
                <code className="rounded bg-kumo-recessed px-1.5 py-0.5 text-base text-kumo-strong">
                  completed / TOTAL_SUB_STEPS
                </code>
                .
              </Bullet>
              <Bullet>
                <strong className="text-kumo-strong">markSubmitted()</strong> et{" "}
                <strong className="text-kumo-strong">getResumeForApi().</strong>{" "}
                Confirment le dépôt et préparent les données pour l'API.
              </Bullet>
            </Bullets>
            <div className="text-sm leading-relaxed">
              <Code language="jsx" trim>
                {`next: () => {
  const state = get();
  if (!state.validateSubStep()) {
    return false;            // erreurs affichées
  }
  state.completeSubStep();   // completed["1.1"] = true
  const target = getNext(state.step, state.subStep);
  set({
    step: target.step,
    subStep: target.subStep,
    errors: {},
  });
  return true;
},`}
              </Code>
            </div>
          </div>
        </Frame>
      </Slide>

      <Slide>
        <Frame>
          <Kicker>04 · Frontend, le formulaire</Kicker>
          <Title size="lg">4 étapes, 8 sous-étapes</Title>
          <div className="mt-8 grid grid-cols-[1.05fr_1fr] items-start gap-10">
            <div className="text-sm leading-relaxed">
              <Code language="jsx" trim>
                {`export const STEPS = [
  {
    number: 1, id: "identite", title: "Identité",
    subSteps: [
      { number: 1, id: "etat_civil",
        label: "État civil",
        fields: ["identite.nom", "identite.prenoms",
                 "identite.sexe", "identite.dateNaissance"] },
      // ...
    ],
  },
  // ... 3 autres étapes
];`}
              </Code>
            </div>
            <div className="grid grid-cols-2 content-start gap-3">
              {STEPS_UI.map((step) => (
                <Fragment key={step.number} animation="fade-up" asChild>
                  <LayerCard className="rounded-xl bg-kumo-base p-4 ring ring-kumo-hairline">
                    <p className="text-xs font-semibold text-kumo-subtle">
                      Étape {step.number}
                    </p>
                    <p className="mt-1 text-lg font-semibold text-kumo-strong">
                      {step.title}
                    </p>
                    <p className="mt-1 text-sm text-kumo-subtle">
                      {step.subSteps.join("  ·  ")}
                    </p>
                  </LayerCard>
                </Fragment>
              ))}
            </div>
          </div>
        </Frame>
      </Slide>

      <Slide>
        <Frame>
          <Kicker>04 · Frontend, le formulaire</Kicker>
          <Title size="lg">Un parcours guidé, avec des champs vérifiés</Title>
          <div className="mt-8 grid grid-cols-[1fr_1.1fr] items-start gap-10">
            <Bullets className="text-lg">
              <Bullet>
                <strong className="text-kumo-strong">
                  getNext / getPrevious.
                </strong>{" "}
                Passent à l'étape suivante ou reviennent à la précédente.
              </Bullet>
              <Bullet>
                <strong className="text-kumo-strong">getRequiredFields.</strong>{" "}
                Affiche les champs requis selon le type de demande.
              </Bullet>
              <Bullet>
                <strong className="text-kumo-strong">completed["3.2"].</strong>{" "}
                Signale une sous-étape terminée. Cette valeur aide à reprendre
                le formulaire au bon endroit avec{" "}
                <code className="rounded bg-kumo-recessed px-1.5 py-0.5 text-base text-kumo-strong">
                  getResumeStep
                </code>
                .
              </Bullet>
              <Bullet>
                <strong className="text-kumo-strong">StepShell.</strong> Guide
                la navigation et l'envoi du dossier.{" "}
                <strong className="text-kumo-strong">StepAside.</strong>{" "}
                Présente le récapitulatif.{" "}
                <strong className="text-kumo-strong">form-stepper.</strong>{" "}
                Montre la progression.
              </Bullet>
            </Bullets>
            <div className="text-sm leading-relaxed">
              <Code language="jsx" trim>
                {`export function getRequiredFields(
  step, subStep, { typeDemande, form },
) {
  const required = [...getSubStep(step, subStep).fields];

  // Renouvellement → ancien numéro de CNI
  if (subStep.id === "etat_civil" &&
      typeDemande === "renouvellement") {
    required.push("complement.ancienNumeroCni");
  }

  // Nationalité étrangère → justificatif
  if (subStep.id === "nationalite" &&
      form.nationalite.nationalite === "autre") {
    required.push("pieces.justificatif_sejour");
  }

  return required;
}`}
              </Code>
            </div>
          </div>
        </Frame>
      </Slide>

      <Slide>
        <Frame>
          <Kicker>04 · Frontend, les réglages</Kicker>
          <Title size="lg">Les règles du formulaire dans lib/</Title>
          <LayerCard className="mt-8 overflow-hidden rounded-xl p-0 ring ring-kumo-hairline">
            <table className="w-full text-left text-lg">
              <thead className="bg-kumo-recessed text-sm text-kumo-subtle">
                <tr>
                  <th className="px-6 py-4 font-semibold">Fichier</th>
                  <th className="px-6 py-4 font-semibold">Rôle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-kumo-hairline bg-kumo-canvas">
                <tr>
                  <td className="px-6 py-4 font-mono text-kumo-strong">
                    cni-config.js
                  </td>
                  <td className="px-6 py-4 text-kumo-default">
                    Définit les types de demande, les pièces, les frais, les
                    délais et les centres d'enrôlement.
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-kumo-strong">
                    cni-steps.js
                  </td>
                  <td className="px-6 py-4 text-kumo-default">
                    Décrit les étapes, la navigation et les champs requis.
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-kumo-strong">
                    documentation.js
                  </td>
                  <td className="px-6 py-4 text-kumo-default">
                    Réunit les guides et les sources officielles.
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-kumo-strong">
                    fichiers.js
                  </td>
                  <td className="px-6 py-4 text-kumo-default">
                    Liste les pièces jointes et vérifie leur format et leur
                    taille.
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-kumo-strong">
                    utils.js
                  </td>
                  <td className="px-6 py-4 text-kumo-default">
                    <code>cn()</code> combine clsx et tailwind-merge.
                  </td>
                </tr>
              </tbody>
            </table>
          </LayerCard>
          <p className="mt-6 text-xl text-kumo-subtle">
            Ajoutez une étape dans STEPS.{" "}
            <span className="text-kumo-strong">
              Le formulaire la prend en compte.
            </span>
          </p>
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
