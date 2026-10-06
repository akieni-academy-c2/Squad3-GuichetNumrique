# GNA : Guichet Numérique de l’Administration

> Plateforme numérique visant à simplifier et fluidifier les démarches administratives en République du Congo.

## Équipe

** Squad 3**

Projet réalisé dans le cadre de notre deuxieme evaluation de la formation Akieni  **Guichet Numérique de l’Administration**.

### Répartition des rôles

| Nom | Rôle | Périmètre |
| --- | --- | --- |
| Jérôme NDZOULOU | Product Manager (PM) | Pilotage du produit |
| Germain NKOIA | Business Analyst (BA) | Analyse des besoins |
| Koumbat ILURICH VISION | Business Analyst (BA) | Analyse des besoins |
| Salomon Prestige IKEKE NKOUMANDO | Développeur Fullstack · **Lead Full** | Frontend et Backend |
| Emmanuelito MBOUSSA | Développeur Fullstack · **Architecte Frontend** | Frontend |
| Souveraine MABELEMO | Développeur Fullstack | Frontend |
| Alphady MONDZALI | Développeur Fullstack · **Architecte Backend** | Backend |
| Tony Ndedi NAVECK FALL | Développeur Fullstack | Backend |
| Japhet Piergy BASSA | Développeur Fullstack | Backend |

### Contributions

| Nom | Contribution principale |
| --- | --- |
| Emmanuelito MBOUSSA | Mise en place du squelette du projet et de l'organisation en monorepo, ainsi que de la base du frontend |
| Salomon Prestige IKEKE NKOUMANDO | Restructuration du formulaire de demande de CNI |
| Alphady MONDZALI | Développement de l'API backend et gestion des routes |
| Japhet Piergy BASSA | Administration du dépôt (repository) |
| Souveraine MABELEMO | Rédaction de la documentation de l'application |
| Tony Ndedi NAVECK FALL | À compléter |

### Organisation du développement

* **Frontend (`apps/frontend`)** : Emmanuelito MBOUSSA, Souveraine MABELEMO
* **Backend (`apps/backend`)** : Alphady MONDZALI, Tony Ndedi NAVECK FALL, Japhet Piergy BASSA
* **Transverse (Frontend et Backend)** : Salomon Prestige IKEKE NKOUMANDO, en tant que Lead Full

## Statut

**MVP en cours de développement.**

## Installation

### Prérequis

* Node.js 20 ou supérieur
* npm
* Git

### Installation

```bash
git clone <URL_DU_REPOSITORY>
cd squad3
npm install
```

### Lancer le projet

Pour lancer le projet en mode développement :

```bash
npm run dev
```

Le monorepo utilise **Turbo** pour gérer les différentes applications.

### Construire le projet

```bash
npm run build
```

### Formater le code

```bash
npm run format
```

Pour vérifier le formatage :

```bash
npm run format:check
```

## Technologies

### Frontend

* React
* Vite
* JavaScript
* Tailwind CSS
* React Router
* shadcn
* Zustand
* Lucide React

### Backend

* Express
* JavaScript

### Outils

* Turbo
* npm
* Prettier

## Architecture du projet

Le projet est organisé en **monorepo** avec deux applications principales :

```text
squad3/
├── package.json          # Racine : workspaces apps/*, scripts Turbo
├── turbo.json            # Configuration des tâches dev / build / start
├── .prettierrc.json      # Configuration Prettier
└── apps/
    ├── frontend/         # @frontend/squad3 — Vite + React, JavaScript
    └── backend/          # @backend/squad3  — Express, JavaScript
```

### Frontend

L'application frontend est développée avec React, Vite et JavaScript. Elle contient notamment les composants, pages, layouts, hooks, contextes, stores et services nécessaires à l'interface utilisateur.

### Backend

L'application backend est développée avec Express et JavaScript. Elle constitue la partie serveur de la plateforme.

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

### GNA

**Simplifier les démarches administratives, un service à la fois.**