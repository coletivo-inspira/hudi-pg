interface Env {
  ALLOWED_ORIGIN: string;
  GITHUB_ORG: string;
  GITHUB_REPOSITORY: string;
  GITHUB_TOKEN: string;
}

const maximumPayloadBytes = 64 * 1024;
const forbiddenContent = /<script|javascript:|on(?:click|load|error)\s*=/i;

function response(body: unknown, status: number, origin: string): Response {
  const headers = {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Headers": "content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    Vary: "Origin",
  };

  if (status === 204) {
    return new Response(null, { status, headers });
  }

  return Response.json(body, {
    status,
    headers,
  });
}

function isPublicationRequest(value: unknown): value is Record<string, unknown> {
  if (!value || typeof value !== "object") return false;
  const payload = value as Record<string, unknown>;
  return (
    payload.schemaVersion === 1 &&
    typeof payload.requestedSlug === "string" &&
    payload.requestedSlug.length >= 3 &&
    payload.requestedSlug.length <= 48 &&
    Boolean(payload.draft && typeof payload.draft === "object")
  );
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin") ?? "";
    if (origin !== env.ALLOWED_ORIGIN) {
      return response({ error: "Origin not allowed" }, 403, env.ALLOWED_ORIGIN);
    }

    if (request.method === "OPTIONS") {
      return response(null, 204, origin);
    }

    if (request.method !== "POST") {
      return response({ error: "Method not allowed" }, 405, origin);
    }

    const body = await request.text();
    if (new TextEncoder().encode(body).byteLength > maximumPayloadBytes) {
      return response({ error: "Payload too large" }, 413, origin);
    }

    if (forbiddenContent.test(body) || body.includes('"trusted-html"')) {
      return response({ error: "Content requires manual review" }, 422, origin);
    }

    let payload: unknown;
    try {
      payload = JSON.parse(body);
    } catch {
      return response({ error: "Invalid JSON" }, 400, origin);
    }

    if (!isPublicationRequest(payload)) {
      return response({ error: "Invalid publication request" }, 422, origin);
    }

    const requestId = crypto.randomUUID();
    const githubResponse = await fetch(
      `https://api.github.com/repos/${env.GITHUB_ORG}/${env.GITHUB_REPOSITORY}/dispatches`,
      {
        method: "POST",
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${env.GITHUB_TOKEN}`,
          "Content-Type": "application/json",
          "User-Agent": "hudi-pages-worker",
          "X-GitHub-Api-Version": "2022-11-28",
        },
        body: JSON.stringify({
          event_type: "portfolio-submission",
          client_payload: { requestId, publication: payload },
        }),
      },
    );

    if (!githubResponse.ok) {
      return response({ error: "Moderation queue unavailable" }, 502, origin);
    }

    return response({ requestId }, 202, origin);
  },
};
