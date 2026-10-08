import { Code, Fragment, Slide } from "@revealjs/react";
import { LayerCard } from "@cloudflare/kumo/components/layer-card";
import { Bullet, Bullets } from "../components/Bullets.tsx";
import { Frame } from "../components/Frame.tsx";
import { Kicker } from "../components/Kicker.tsx";
import { Title } from "../components/Title.tsx";
import { Tree } from "../components/Tree.tsx";

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
          <Title size="lg">Architecture de l'application</Title>
          <div className="mt-10 grid min-w-0 grid-cols-[1.1fr_1fr] items-start gap-8">
            <Tree>{`apps/frontend/src/
├── api/          client HTTP + endpoints
├── lib/          configs déclaratives
├── store/        store Zustand unique
├── pages/
│   ├── CNI/      formulaire (steps/)
│   ├── auth/     Signin, Signup
│   └── Dashboard.jsx
├── components/
│   └── ui/       composants shadcn
├── hooks/        useSignin, useRegister...
└── context/      auth (session)`}</Tree>
            <Bullets>
              <Bullet>
                <strong className="text-kumo-strong">Vite + React 19</strong> en
                JavaScript / JSX
              </Bullet>
              <Bullet>
                Le routage est géré par <strong className="text-kumo-strong">React Router</strong>, avec{" "}
                <code className="rounded bg-kumo-recessed px-1.5 py-0.5 text-lg text-kumo-strong">
                  routes.jsx
                </code>{" "}
                et une garde nommée{" "}
                <code className="rounded bg-kumo-recessed px-1.5 py-0.5 text-lg text-kumo-strong">
                  ProtectedRoute
                </code>
              </Bullet>
              <Bullet>
                Un seul store pour tout le formulaire de demande de CNI
              </Bullet>
              <Bullet>
                Les règles métier se trouvent dans{" "}
                <code className="rounded bg-kumo-recessed px-1.5 py-0.5 text-lg text-kumo-strong">
                  lib/
                </code>
                , pas dans les composants
              </Bullet>
            </Bullets>
          </div>
        </Frame>
      </Slide>

      <Slide>
        <Frame>
          <Kicker>04 · Frontend, le store</Kicker>
          <Title size="lg">Un seul store qui garde le formulaire</Title>
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
                <strong className="text-kumo-strong">Zustand</strong> gère l'état
                du formulaire sans provider. Les composants ne lisent que les
                valeurs dont ils ont besoin, par exemple{" "}
                <code className="rounded bg-kumo-recessed px-1.5 py-0.5 text-base text-kumo-strong">
                  useStore((s) =&gt; s.step)
                </code>
              </Bullet>
              <Bullet>
                <strong className="text-kumo-strong">
                  setField("identite.nom", v)
                </strong>{" "}
                met à jour le champ sans modifier l'état d'origine, puis efface
                son message d'erreur.
              </Bullet>
              <Bullet>
                <strong className="text-kumo-strong">persist</strong> : le dossier
                survit au rechargement de la page
              </Bullet>
              <Bullet>
                <strong className="text-kumo-strong">version + migrate</strong> :
                l'évolution du schéma ne perd pas les données
              </Bullet>
              <Bullet>
                <strong className="text-kumo-strong">partialize</strong> : seules les
                données utiles sont sérialisées
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
                <strong className="text-kumo-strong">next()</strong> valide la
                sous-étape et la marque comme terminée dans{" "}
                <code className="rounded bg-kumo-recessed px-1.5 py-0.5 text-base text-kumo-strong">
                  completed
                </code>{" "}
                avant de passer à la suivante.
              </Bullet>
              <Bullet>
                <strong className="text-kumo-strong">validateSubStep()</strong>{" "}
                vérifie les champs requis et associe les messages à leur chemin via{" "}
                <code className="rounded bg-kumo-recessed px-1.5 py-0.5 text-base text-kumo-strong">
                  LABELS
                </code>
              </Bullet>
              <Bullet>
                <strong className="text-kumo-strong">validateAll()</strong>{" "}
                vérifie les huit sous-étapes et ramène l'utilisateur à la première erreur.
              </Bullet>
              <Bullet>
                <strong className="text-kumo-strong">getProgress()</strong>{" "}
                calcule le pourcentage à partir de{" "}
                <code className="rounded bg-kumo-recessed px-1.5 py-0.5 text-base text-kumo-strong">
                  completed / TOTAL_SUB_STEPS
                </code>{" "}
              </Bullet>
              <Bullet>
                <strong className="text-kumo-strong">markSubmitted()</strong> +{" "}
                <strong className="text-kumo-strong">getResumeForApi()</strong>{" "}
                prépare les données à envoyer lors du dépôt.
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
            <div className="flex flex-col gap-4">
              {STEPS_UI.map((step) => (
                <Fragment key={step.number} animation="fade-up" asChild>
                  <LayerCard className="rounded-xl bg-kumo-base px-6 py-4 ring ring-kumo-hairline">
                    <p className="text-sm font-semibold text-kumo-subtle">
                      Étape {step.number}
                    </p>
                    <p className="text-xl font-semibold text-kumo-strong">
                      {step.title}
                    </p>
                    <p className="text-base text-kumo-subtle">
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
          <Title size="lg">Des étapes guidées et des champs vérifiés</Title>
          <div className="mt-8 grid grid-cols-[1fr_1.1fr] items-start gap-10">
            <Bullets className="text-lg">
              <Bullet>
                <strong className="text-kumo-strong">getNext / getPrevious</strong>{" "}
                sont des fonctions simples qui gèrent les changements d'étape et
                le retour arrière.
              </Bullet>
              <Bullet>
                <strong className="text-kumo-strong">getRequiredFields</strong>{" "}
                adapte les champs requis à la situation de l'usager.
              </Bullet>
              <Bullet>
                Clés{" "}
                <code className="rounded bg-kumo-recessed px-1.5 py-0.5 text-base text-kumo-strong">
                  completed["3.2"]
                </code>{" "}
                sert à suivre la progression et à reprendre un dossier grâce à{" "}
                <code className="rounded bg-kumo-recessed px-1.5 py-0.5 text-base text-kumo-strong">
                  getResumeStep
                </code>
                )
              </Bullet>
              <Bullet>
                <strong className="text-kumo-strong">StepShell</strong> gère la
                navigation et l'envoi du formulaire. <strong className="text-kumo-strong">StepAside</strong>{" "}
                affiche le récapitulatif, tandis que <strong className="text-kumo-strong">form-stepper</strong>{" "}
                montre l'avancement.
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
                    Référentiels : types de demande, départements / villes /
                    arrondissements, pièces (formats, 10 Mo max), frais, délais,
                    motifs de rejet, centres d'enrôlement
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-kumo-strong">
                    cni-steps.js
                  </td>
                  <td className="px-6 py-4 text-kumo-default">
                    STEPS + navigation + champs requis par sous-étape
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-kumo-strong">
                    documentation.js
                  </td>
                  <td className="px-6 py-4 text-kumo-default">
                    Contenu de l'espace Documentation (sources officielles
                    incluses)
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-kumo-strong">
                    fichiers.js
                  </td>
                  <td className="px-6 py-4 text-kumo-default">
                    Registre des pièces jointes + validation (extension, taille)
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-mono text-kumo-strong">utils.js</td>
                  <td className="px-6 py-4 text-kumo-default">
                    <code>cn()</code> combine clsx et tailwind-merge.
                  </td>
                </tr>
              </tbody>
            </table>
          </LayerCard>
          <p className="mt-6 text-xl text-kumo-subtle">
            Pour ajouter une étape, il suffit de l'inscrire dans STEPS.{" "}
            <span className="text-kumo-strong">L'interface suit automatiquement.</span>
          </p>
        </Frame>
      </Slide>

      <Slide>
        <Frame>
          <Kicker>05 · Design</Kicker>
          <Title size="lg">shadcn/ui</Title>
          <div className="mt-8 grid grid-cols-[1fr_1.05fr] items-center gap-10">
            <Bullets className="text-lg">
              <Bullet>
                <strong className="text-kumo-strong">24 composants</strong> copiés
                dans le projet : button, sidebar, table, calendar, select,
                dialog...
              </Bullet>
              <Bullet>
                Config : style{" "}
                <code className="rounded bg-kumo-recessed px-1.5 py-0.5 text-base text-kumo-strong">
                  base-nova
                </code>
                , baseColor{" "}
                <code className="rounded bg-kumo-recessed px-1.5 py-0.5 text-base text-kumo-strong">
                  mist
                </code>
                , variables CSS
              </Bullet>
              <Bullet>
                Tailwind CSS 4 se configure directement en CSS.
              </Bullet>
              <Bullet>
                Runtime <strong className="text-kumo-strong">Base UI</strong>, icônes{" "}
                <strong className="text-kumo-strong">Lucide</strong>, polices Geist +
                Inter
              </Bullet>
              <Bullet>Composants thémables : dark mode et RTL prêts</Bullet>
            </Bullets>
            <div className="flex justify-center">
              <img
                src="shadcn.png"
                alt="Composants shadcn/ui"
                className="max-h-[420px] w-auto rounded-xl object-contain ring ring-kumo-hairline"
              />
            </div>
          </div>
        </Frame>
      </Slide>

      <Slide>
        <Frame
          center
          className="bg-kumo-canvas"
        >
          <Fragment>
            <p className="mb-6 text-sm font-semibold text-kumo-strong">
              GNA
            </p>
            <Title size="xl">Merci</Title>
          </Fragment>
        </Frame>
      </Slide>
    </>
  );
}
