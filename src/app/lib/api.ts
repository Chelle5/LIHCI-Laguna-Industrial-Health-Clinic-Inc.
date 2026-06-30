export const apiBase = import.meta.env.VITE_API_URL?.trim().replace(/\/+$/g, "") || "";

export function apiUrl(path: string) {
  return apiBase ? `${apiBase}${path}` : path;
}

export async function fetchJson(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  const text = await response.text();
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    try {
      return { response, data: JSON.parse(text) };
    } catch {
      return { response, data: { success: false, error: text } };
    }
  }

  return { response, data: { success: false, error: text } };
}
