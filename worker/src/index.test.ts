import { describe, expect, it } from "vitest";
import worker from "./index";

const env = {
  ALLOWED_ORIGIN: "https://coletivo-inspira.github.io",
  GITHUB_ORG: "coletivo-inspira",
  GITHUB_REPOSITORY: "hudi-pg",
  GITHUB_TOKEN: "test-token",
};

describe("submission Worker", () => {
  it("answers CORS preflight without a response body", async () => {
    const response = await worker.fetch(
      new Request("https://worker.example", {
        method: "OPTIONS",
        headers: { Origin: env.ALLOWED_ORIGIN },
      }),
      env,
    );

    expect(response.status).toBe(204);
    expect(await response.text()).toBe("");
    expect(response.headers.get("Access-Control-Allow-Origin")).toBe(
      env.ALLOWED_ORIGIN,
    );
  });

  it("rejects unknown origins before processing content", async () => {
    const response = await worker.fetch(
      new Request("https://worker.example", {
        method: "POST",
        headers: { Origin: "https://example.com" },
        body: "{}",
      }),
      env,
    );

    expect(response.status).toBe(403);
  });
});

