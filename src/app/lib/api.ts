export const apiBase = import.meta.env.VITE_API_URL?.trim().replace(/\/+$/g, "") || "";

export function apiUrl(path: string) {
  return apiBase ? `${apiBase}${path}` : path;
}
