/*
  ============================================================
  BACKEND CONNECTION
  ============================================================
  The site works without a backend: it shows the mock data in
  src/data.js and pretends forms were sent.

  When your backend is ready:
    1. Set API_BASE_URL to your server (e.g. "https://api.example.com")
       or leave it "" if the API is on the same domain.
    2. Set USE_BACKEND to true.

  Endpoints the site expects:
    GET  /api/events
    GET  /api/projects
    GET  /api/knowledge
    GET  /api/committee
    POST /api/contact        { topic, name, email, message }
    POST /api/partnerships   { topic, name, email, organisation, message }
    POST /api/subscribe      { email }
*/

export const API_BASE_URL = "";
export const USE_BACKEND = false;

export async function apiGet(endpoint, fallback) {
  if (!USE_BACKEND) return fallback;

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) throw new Error(`GET ${endpoint} failed (${response.status})`);
    return await response.json();
  } catch (error) {
    console.error(error);
    return fallback; // if the server is down, show the mock data instead
  }
}

export async function apiPost(endpoint, data) {
  if (!USE_BACKEND) {
    console.info("Mock POST (no backend yet):", endpoint, data);
    await new Promise((resolve) => setTimeout(resolve, 600));
    return { success: true };
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error(`POST ${endpoint} failed (${response.status})`);
  return response.json();
}
