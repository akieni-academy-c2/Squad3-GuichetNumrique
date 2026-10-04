import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  DELAI_MODIFICATION_HEURES,
  TYPES_DEMANDE,
  getDelai,
  getFrais,
  getTypeDemande,
} from "@/lib/cni-config";
import {
  STEPS,
  TOTAL_SUB_STEPS,
  getCompletionKey,
  getNext,
  getPrevious,
  getRequiredFields,
  getStep,
  getSubStep,
  isLastStep,
  isLastSubStep,
} from "@/lib/cni-steps";

const INITIAL_FORM = {
  identite: {
    nom: "",
    prenoms: "",
    sexe: null,
    dateNaissance: "",
    lieuNaissance: "",
    provinceNaissance: null,
  },
  filiation: {
    nomPere: "",
    nomMere: "",
  },
  residence: {
    province: null,
    ville: "",
    commune: null,
    avenue: "",
    numero: "",
    quartier: "",
  },
  contact: {
    indicatif: "+242",
    telephone: "",
    email: "",
    pointServiceId: null,
  },
  acte: {
    numeroActe: "",
    typeActe: null,
    delivreeLe: "",
    delivreePar: "",
  },
  nationalite: {
    nationalite: null,
    paysEtranger: "",
  },
  complement: {
    ancienNumeroCni: "",
    motifRemplacement: null,
    declaration: "",
    dateExpiration: "",
  },
  paiement: {
    moyen: null,
    reference: "",
    accepte: false,
  },
  pieces: {
    acte_naissance: null,
    photo_identite: null,
    justificatif_sejour: null,
  },
};

const LABELS = {
  typeDemande: "Le type de demande",
  "identite.nom": "Le nom",
  "identite.prenoms": "Les prénoms",
  "identite.sexe": "Le sexe",
  "identite.dateNaissance": "La date de naissance",
  "identite.lieuNaissance": "Le lieu de naissance",
  "identite.provinceNaissance": "Le département de naissance",
  "filiation.nomPere": "Le nom du père",
  "filiation.nomMere": "Le nom de la mère",
  "residence.province": "Le département de résidence",
  "residence.ville": "La ville de résidence",
  "residence.commune": "L'arrondissement ou la commune",
  "residence.avenue": "L'avenue ou la rue",
  "residence.numero": "Le numéro",
  "residence.quartier": "Le quartier",
  "contact.telephone": "Le numéro de téléphone",
  "contact.email": "L'adresse e-mail",
  "contact.pointServiceId": "L'antenne de collecte",
  "acte.numeroActe": "Le numéro de l'acte de naissance",
  "nationalite.nationalite": "La nationalité",
  "complement.ancienNumeroCni": "L'ancien numéro de CNI",
  "complement.motifRemplacement": "Le motif du remplacement",
  "complement.declaration": "La déclaration sur l'honneur",
  "paiement.moyen": "Le moyen de paiement",
  "paiement.accepte": "L'acceptation des frais",
  "pieces.acte_naissance": "L'acte de naissance",
  "pieces.photo_identite": "La photo d'identité",
  "pieces.justificatif_sejour": "Le justificatif de séjour",
};

export function getFieldValue(state, path) {
  if (path === "typeDemande") {
    return state.typeDemande;
  }
  return path
    .split(".")
    .reduce((acc, key) => (acc == null ? acc : acc[key]), state.form);
}

export function formatAdresse(residence) {
  return [
    residence.avenue &&
      `${residence.avenue} n° ${residence.numero ?? ""}`.trim(),
    residence.quartier,
    residence.commune,
    residence.ville,
    residence.province,
  ]
    .filter(Boolean)
    .join(", ");
}

function isEmpty(value) {
  if (
    value === null ||
    value === undefined ||
    value === "" ||
    value === false
  ) {
    return true;
  }
  if (Array.isArray(value)) {
    return value.length === 0;
  }
  if (typeof value === "object") {
    return Object.keys(value).length === 0;
  }
  return false;
}

export const useStore = create(
  persist(
    (set, get) => ({
      typeDemande: null,
      step: 1,
      subStep: 1,
      form: INITIAL_FORM,
      errors: {},
      completed: {},
      activeDemande: null,
      statut: null,
      pointsService: [],
      submittedAt: null,

      setField: (path, value) =>
        set((state) => {
          const keys = path.split(".");
          const nextForm = { ...state.form };
          let cursor = nextForm;

          keys.slice(0, -1).forEach((key) => {
            cursor[key] = { ...cursor[key] };
            cursor = cursor[key];
          });
          cursor[keys.at(-1)] = value;

          if (!(path in state.errors)) {
            return { form: nextForm };
          }

          const errors = { ...state.errors };
          delete errors[path];
          return { form: nextForm, errors };
        }),

      setFields: (patch) =>
        set((state) => {
          const nextForm = { ...state.form };
          Object.entries(patch).forEach(([section, values]) => {
            nextForm[section] = { ...nextForm[section], ...values };
          });
          return { form: nextForm };
        }),

      setTypeDemande: (value) => set({ typeDemande: value, errors: {} }),

      setPointsService: (list) => set({ pointsService: list }),

      setActiveDemande: (demande) =>
        set({
          activeDemande: demande,
          statut: demande?.statut ?? null,
        }),

      setSubmittedAt: (value) => set({ submittedAt: value }),

      markSubmitted: () => {
        const state = get();
        if (!state.isComplete()) {
          return false;
        }
        set({ submittedAt: new Date().toISOString() });
        return true;
      },

      goToStep: (step, subStep = 1) =>
        set({
          step: getStep(step).number,
          subStep: getSubStep(step, subStep).number,
        }),

      validateSubStep: (step = get().step, subStep = get().subStep) => {
        const state = get();
        const required = getRequiredFields(step, subStep, {
          typeDemande: state.typeDemande,
          form: state.form,
        });
        const errors = {};

        required.forEach((path) => {
          if (isEmpty(getFieldValue(state, path))) {
            errors[path] = `${LABELS[path] ?? "Ce champ"} est obligatoire.`;
          }
        });

        set({ errors });
        return Object.keys(errors).length === 0;
      },

      validateAll: () => {
        const state = get();
        const errors = {};
        let premiereEtape = null;

        STEPS.forEach((step) => {
          step.subSteps.forEach((subStep) => {
            const required = getRequiredFields(step.number, subStep.number, {
              typeDemande: state.typeDemande,
              form: state.form,
            });

            const manquants = required.filter((path) => {
              if (isEmpty(getFieldValue(state, path))) {
                errors[path] = `${LABELS[path] ?? "Ce champ"} est obligatoire.`;
                return true;
              }
              return false;
            });

            if (manquants.length > 0 && !premiereEtape) {
              premiereEtape = { step: step.number, subStep: subStep.number };
            }
          });
        });

        set(
          premiereEtape
            ? {
                errors,
                step: premiereEtape.step,
                subStep: premiereEtape.subStep,
              }
            : { errors },
        );

        return !premiereEtape;
      },

      completeSubStep: (step = get().step, subStep = get().subStep) =>
        set((state) => ({
          completed: {
            ...state.completed,
            [getCompletionKey(step, subStep)]: true,
          },
        })),

      next: () => {
        const state = get();
        if (!state.validateSubStep()) {
          return false;
        }
        state.completeSubStep();
        const target = getNext(state.step, state.subStep);
        set({ step: target.step, subStep: target.subStep, errors: {} });
        return true;
      },

      previous: () => {
        const state = get();
        const target = getPrevious(state.step, state.subStep);
        set({ step: target.step, subStep: target.subStep, errors: {} });
      },

      getProgress: () => {
        const { completed } = get();
        const done = Object.values(completed).filter(Boolean).length;
        return {
          done,
          total: TOTAL_SUB_STEPS,
          percent: Math.round((done / TOTAL_SUB_STEPS) * 100),
        };
      },

      isComplete: () =>
        STEPS.every((step) =>
          step.subSteps.every(
            (subStep) =>
              get().completed[getCompletionKey(step.number, subStep.number)] ===
              true,
          ),
        ),

      getResumeStep: () => {
        const { completed } = get();
        for (const step of STEPS) {
          for (const subStep of step.subSteps) {
            if (!completed[getCompletionKey(step.number, subStep.number)]) {
              return { step: step.number, subStep: subStep.number };
            }
          }
        }
        return { step: STEPS.length, subStep: STEPS.at(-1).subSteps.length };
      },

      isLastStep: () => isLastStep(get().step),
      isLastSubStep: () => isLastSubStep(get().step, get().subStep),

      getResumeDeadline: () => {
        const { submittedAt } = get();
        if (!submittedAt) {
          return null;
        }
        return new Date(
          new Date(submittedAt).getTime() +
            DELAI_MODIFICATION_HEURES * 60 * 60 * 1000,
        );
      },

      getTypeDemande: () => getTypeDemande(get().typeDemande),
      getFrais: () => getFrais(),
      getDelai: () => getDelai(get().typeDemande),
      hasTypeDemande: () => Boolean(get().typeDemande),
      listTypesDemande: () => TYPES_DEMANDE,

      getAddresseComplete: () => formatAdresse(get().form.residence),

      getResumeForApi: () => {
        const { form } = get();
        return {
          typeDemande: get().typeDemande,
          nom: form.identite.nom,
          prenom: form.identite.prenoms,
          dateNaissance: form.identite.dateNaissance,
          lieuNaissance: form.identite.lieuNaissance,
          sexe: form.identite.sexe,
          adresse: get().getAddresseComplete(),
          nomPere: form.filiation.nomPere,
          nomMere: form.filiation.nomMere,
          pointServiceId: form.contact.pointServiceId,
        };
      },

      reset: () =>
        set({
          typeDemande: null,
          step: 1,
          subStep: 1,
          form: INITIAL_FORM,
          errors: {},
          completed: {},
          activeDemande: null,
          statut: null,
          submittedAt: null,
        }),
    }),
    {
      name: "cni-dossier",
      partialize: (state) => ({
        typeDemande: state.typeDemande,
        step: state.step,
        subStep: state.subStep,
        form: state.form,
        errors: state.errors,
        completed: state.completed,
        activeDemande: state.activeDemande,
        statut: state.statut,
        submittedAt: state.submittedAt,
      }),
    },
  ),
);
