export function notFound(req, res) {
  res.status(404).json({ error: "Not Found" });
}
export function errorHandler(err, req, res, next) {
  console.error(err);
  res
    .status(err.statusCode || 500)
    .json({
      error: err.message || "Erreur serveur",
      ...(err.errors ? { errors: err.errors } : {}),
    });
}
