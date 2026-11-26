// Tiny fetch wrapper: JSON in/out, throws Error(message) using the backend's message when present.
const BASE = import.meta.env.VITE_API_URL;

export async function api(path, { method = 'GET', body } = {}) {
  if (!BASE) throw new Error('API URL is not configured. Set VITE_API_URL in your .env file.');
  let res;
  try {
    res = await fetch(`${BASE}${path}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error('Could not reach the server. Check your connection and try again.');
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Something went wrong. Please try again.');
  return data;
}
