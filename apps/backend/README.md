# Guichet numérique CNI — API Express/PostgreSQL

## Installation
1. Créer PostgreSQL et la base `guichet_cni`.
2. Copier `.env.example` vers `.env` et adapter `DATABASE_URL`.
3. `npm install`
4. `npm run seed`
5. `npm run dev`

## Auth
`POST /api/auth/register`
```json
{"nom":"MABIALA","prenom":"Jean","email":"jean@example.com","telephone":"060000000","password":"Password123!"}
```
`POST /api/auth/login` retourne un JWT.

## Workflow
`brouillon -> soumise -> en_verification -> validee -> rendez_vous -> empreintes_photo_effectuees -> attente_deliberation -> cni_disponible -> retiree`
Branches : `complement_demande -> en_verification`, `en_verification -> refusee`.

## Endpoints
- POST /api/demandes
- GET /api/demandes
- GET /api/demandes/:id
- PUT /api/demandes/:id
- POST /api/demandes/:id/pieces (multipart: fichier + typePiece)
- GET /api/demandes/:id/pieces
- POST /api/demandes/:id/soumettre
- POST /api/demandes/:id/verification
- POST /api/demandes/:id/complement
- PUT /api/demandes/:id/correction
- POST /api/demandes/:id/valider
- POST /api/demandes/:id/refuser
- POST /api/demandes/:id/rendez-vous
- POST /api/demandes/:id/empreintes
- POST /api/demandes/:id/deliberation
- POST /api/demandes/:id/disponible
- POST /api/demandes/:id/retrait
- GET /api/notifications
- PATCH /api/notifications/:id/read
- GET/POST/PUT/DELETE /api/points-service
- GET /api/dashboard

## Important
Le MVP ne peut pas vérifier un registre national CNI externe. Il empêche seulement une seconde demande active pour le même compte citoyen. Une intégration avec le registre officiel devra être ajoutée lorsqu'une API institutionnelle sera disponible.
