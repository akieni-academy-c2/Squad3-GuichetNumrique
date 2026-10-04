export class ApiError extends Error {
  constructor(message, status, errors = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }
}

export async function apiFetch(
  path,
  { token, body, headers, ...options } = {},
) {
  const isFormData = body instanceof FormData;

  const res = await fetch(`/api${path}`, {
    ...options,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    ...(body !== undefined
      ? { body: isFormData ? body : JSON.stringify(body) }
      : {}),
  });

  if (res.status === 204) {
    return null;
  }

  const payload = await res.json().catch(() => null);

  if (!res.ok) {
    throw new ApiError(
      payload?.error ?? "Une erreur est survenue. Veuillez réessayer.",
      res.status,
      payload?.errors ?? null,
    );
  }

  return payload;
}
