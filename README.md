# GNA — Guichet Numérique de l’Administration

> Plateforme numérique visant à simplifier et fluidifier les démarches administratives en République du Congo.

## Présentation

Le **Guichet Numérique de l’Administration (GNA)** est une plateforme permettant aux citoyens d’accéder plus facilement aux services administratifs.

L’objectif est de centraliser les démarches, réduire les déplacements inutiles et permettre aux citoyens de mieux suivre l’évolution de leurs demandes.

## Problématique

Les démarches administratives peuvent être longues et nécessiter plusieurs déplacements, notamment lorsque le citoyen ne dispose pas d'informations suffisantes sur l'état de sa demande.

GNA apporte une solution numérique pour rendre ces démarches plus accessibles, plus transparentes et plus simples à suivre.

## Objectifs

* Simplifier l'accès aux services administratifs.
* Permettre la création d'un compte citoyen.
* Permettre aux citoyens de soumettre leurs demandes en ligne.
* Fournir une référence pour chaque demande.
* Faciliter le suivi de l'état d'une demande.
* Centraliser progressivement les services administratifs.

## MVP

Le MVP actuel couvre principalement :

### US1 — Création d'un compte citoyen

Le citoyen peut créer son compte à partir de ses informations personnelles.

### US2 — Connexion

Le citoyen peut se connecter à son espace personnel et accéder aux fonctionnalités qui lui sont destinées.

### US3 — Demande de CNI

Un citoyen connecté peut effectuer une demande de Carte Nationale d'Identité (CNI).

Chaque demande possède une référence et un statut permettant son identification et son suivi.

## Évolution prévue

Le projet pourra progressivement intégrer :

* la gestion des comptes agents ;
* le traitement des demandes par les agents ;
* la validation ou le rejet des demandes ;
* le suivi détaillé des demandes par les citoyens ;
* la gestion de plusieurs services administratifs.

## Parcours utilisateur

```text
Création du compte
        ↓
Connexion
        ↓
Espace citoyen
        ↓
Demande de CNI
        ↓
Référence de la demande
        ↓
Suivi de la demande
```

## Technologies

Le frontend du projet est développé avec :

* React
* Vite
* JavaScript
* Tailwind CSS
* React Router
* shadcn/ui

## Installation

### Prérequis

* Node.js
* npm
* Git

### Installation

```bash
git clone <URL_DU_REPOSITORY>
cd squad3
npm install
```

### Lancer le projet

```bash
cd apps/frontend
npm run dev
```

## Structure du projet

Le projet est organisé autour d'une application frontend située dans :

```text
apps/
└── frontend/
    ├── public/
    ├── src/
    │   ├── api/
    │   ├── components/
    │   ├── context/
    │   ├── hooks/
    │   ├── layouts/
    │   ├── lib/
    │   ├── pages/
    │   └── store/
    └── ...
```


## Statut

**MVP en cours de développement.**


### GNA

**Simplifier les démarches administratives, un service à la fois.**
