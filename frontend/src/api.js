// frontend/src/api.js
const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8000";

export async function generate(prompt, style) {
  const form = new FormData();
  form.append("prompt", prompt);
  if (style) form.append("style", style);

  const res = await fetch(`${API_BASE}/generate`, {
    method: "POST",
    body: form
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Generation failed");
  }
  return res.json();
}

export function downloadUrl(filename) {
  return `${API_BASE}/download/${filename}`;
}
