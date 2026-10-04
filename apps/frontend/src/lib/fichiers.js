const registre = new Map();

export function setFichier(typePiece, file) {
  registre.set(typePiece, file);
}

export function getFichier(typePiece) {
  return registre.get(typePiece) ?? null;
}

export function removeFichier(typePiece) {
  registre.delete(typePiece);
}

export function hasFichier(typePiece) {
  return registre.has(typePiece);
}

export function validateFichier(fichier, config) {
  if (!fichier) {
    return "Aucun fichier sélectionné.";
  }

  const extension = "." + fichier.name.split(".").pop().toLowerCase();

  if (!config.extensions.includes(extension)) {
    return `Format non accepté. Formats attendus : ${config.extensions.join(", ")}.`;
  }

  if (config.maxSizeMb && fichier.size > config.maxSizeMb * 1024 * 1024) {
    return `Le fichier dépasse la taille maximale de ${config.maxSizeMb} Mo.`;
  }

  return null;
}

export function describeFichier(fichier) {
  return {
    nom: fichier.name,
    taille: fichier.size,
    mime: fichier.type,
    extension: "." + fichier.name.split(".").pop().toLowerCase(),
  };
}

export function formatTaille(octets) {
  if (octets < 1024) {
    return octets + " o";
  }
  if (octets < 1024 * 1024) {
    return (octets / 1024).toFixed(0) + " Ko";
  }
  return (octets / (1024 * 1024)).toFixed(1) + " Mo";
}
