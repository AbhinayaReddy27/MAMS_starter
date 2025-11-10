// src/lib/api.ts
// Vite env var (with a sensible local default)
const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:8080/api';

export async function apiGet(path: string) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      'x-demo-user-id': 'demo',
      'x-demo-role': 'ADMIN',
    },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function apiPost(path: string, body: any) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-demo-user-id': 'demo',
      'x-demo-role': 'ADMIN',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
