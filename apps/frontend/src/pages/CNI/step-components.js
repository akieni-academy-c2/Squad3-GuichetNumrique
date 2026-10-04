import { ActeNaissance } from "./steps/ActeNaissance.jsx";
import { Adresse } from "./steps/Adresse.jsx";
import { Contact } from "./steps/Contact.jsx";
import { EtatCivil } from "./steps/EtatCivil.jsx";
import { NaissanceFiliation } from "./steps/NaissanceFiliation.jsx";
import { Nationalite } from "./steps/Nationalite.jsx";
import { Paiement } from "./steps/Paiement.jsx";
import { PhotoIdentite } from "./steps/PhotoIdentite.jsx";
import { Recapitulatif } from "./steps/Recapitulatif.jsx";
import { RendezVous } from "./steps/RendezVous.jsx";

export const STEP_COMPONENTS = {
  etat_civil: EtatCivil,
  naissance_filiation: NaissanceFiliation,
  adresse: Adresse,
  contact: Contact,
  acte_naissance: ActeNaissance,
  nationalite: Nationalite,
  photo_identite: PhotoIdentite,
  rendez_vous: RendezVous,
  // paiement: Paiement,
  recapitulatif: Recapitulatif,
};
