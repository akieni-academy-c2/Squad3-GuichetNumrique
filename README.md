# squad3

Monorepo npm avec Turborepo.

## Structure

```
squad3/
├── package.json          # racine : workspaces apps/*, scripts turbo
├── turbo.json            # pipelines dev / build / start / lint
└── apps/
    ├── frontend/         # @frontend/squad3  - Vite + React + TypeScript
    └── backend/          # @backend/squad3   - Express, JavaScript
```

## Installation

```bash
npm install
```

## Commandes

Depuis la racine :

| Commande        | Description                                                 |
| --------------- | ----------------------------------------------------------- |
| `npm run dev`   | Lance les deux apps en mode développement                   |
| `npm run build` | Build de production                                         |
| `npm run start` | Démarre les builds de production                            |
| `npm run lint`  | Vérifie le frontend (TypeScript) et le backend (syntaxe JS) |

Pour cibler une seule app :

```bash
npm run dev --workspace @frontend/squad3
npm run dev --workspace @backend/squad3
```
