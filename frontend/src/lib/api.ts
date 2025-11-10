
const API = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export async function apiGet(path: string) {
  const res = await fetch(`${API}/api${path}`, {
    headers: { 'x-demo-user-id': 'demo', 'x-demo-role': 'ADMIN' }
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function apiPost(path: string, body: any) {
  const res = await fetch(`${API}/api${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-demo-user-id': 'demo', 'x-demo-role': 'ADMIN' },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
