import { describe, expect, it } from "vitest";
import { createDefaultDraft, getTemplate, templateRegistry } from "./registry";

describe("templateRegistry", () => {
  it("oferece um template estrutural e tres temas", () => {
    const template = getTemplate("smartfolio");

    expect(template.themeIds).toEqual([
      "hudi-blue",
      "editorial-light",
      "deep-focus",
    ]);
    expect(templateRegistry).toHaveLength(1);
  });

  it("reserva HTML livre para templates administrados", () => {
    const template = getTemplate("smartfolio");

    expect(template.userBlocks).not.toContain("trusted-html");
    expect(template.adminBlocks).toContain("trusted-html");
  });

  it("cria um rascunho utilizavel pelo editor", () => {
    const draft = createDefaultDraft();

    expect(draft.templateId).toBe("smartfolio");
    expect(draft.projects).toHaveLength(1);
    expect(draft.consentToReview).toBe(false);
  });
});

