CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  prenom VARCHAR(100) NOT NULL,
  email VARCHAR(180) NOT NULL UNIQUE,
  telephone VARCHAR(30),
  password_hash TEXT NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'citoyen' CHECK (role IN ('citoyen','agent','admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS points_service (
  id SERIAL PRIMARY KEY,
  nom VARCHAR(150) NOT NULL,
  arrondissement VARCHAR(120) NOT NULL,
  adresse TEXT,
  telephone VARCHAR(30),
  actif BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS demandes (
  id SERIAL PRIMARY KEY,
  reference VARCHAR(40) NOT NULL UNIQUE,
  citoyen_id INTEGER NOT NULL REFERENCES users(id),
  point_service_id INTEGER REFERENCES points_service(id),
  type_demande VARCHAR(30) NOT NULL CHECK (type_demande IN ('premiere_demande','renouvellement','remplacement')),
  statut VARCHAR(40) NOT NULL DEFAULT 'brouillon',
  nom VARCHAR(100),
  prenom VARCHAR(100),
  date_naissance DATE,
  lieu_naissance VARCHAR(180),
  sexe VARCHAR(20),
  adresse TEXT,
  nom_pere VARCHAR(150),
  nom_mere VARCHAR(150),
  motif_complement TEXT,
  motif_refus TEXT,
  submitted_at TIMESTAMPTZ,
  modification_deadline TIMESTAMPTZ,
  verified_at TIMESTAMPTZ,
  validated_at TIMESTAMPTZ,
  biometric_at TIMESTAMPTZ,
  deliberated_at TIMESTAMPTZ,
  available_at TIMESTAMPTZ,
  withdrawn_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_demandes_citoyen ON demandes(citoyen_id);
CREATE INDEX IF NOT EXISTS idx_demandes_statut ON demandes(statut);

CREATE TABLE IF NOT EXISTS pieces (
  id SERIAL PRIMARY KEY,
  demande_id INTEGER NOT NULL REFERENCES demandes(id) ON DELETE CASCADE,
  type_piece VARCHAR(50) NOT NULL,
  nom_fichier TEXT NOT NULL,
  chemin TEXT NOT NULL,
  mime_type VARCHAR(100),
  taille INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS rendez_vous (
  id SERIAL PRIMARY KEY,
  demande_id INTEGER NOT NULL UNIQUE REFERENCES demandes(id) ON DELETE CASCADE,
  point_service_id INTEGER NOT NULL REFERENCES points_service(id),
  date_rendez_vous TIMESTAMPTZ NOT NULL,
  statut VARCHAR(30) NOT NULL DEFAULT 'planifie',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS notifications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  demande_id INTEGER REFERENCES demandes(id) ON DELETE CASCADE,
  titre VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  lue BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS demande_historique (
  id SERIAL PRIMARY KEY,
  demande_id INTEGER NOT NULL REFERENCES demandes(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id),
  ancien_statut VARCHAR(40),
  nouveau_statut VARCHAR(40) NOT NULL,
  commentaire TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
