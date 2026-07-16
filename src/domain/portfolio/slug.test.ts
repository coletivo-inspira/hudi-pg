import { describe, expect, it } from "vitest";
import { createPublicationRequest, toPortfolioSlug } from "./slug";
import type { PortfolioDraft } from "./types";

const baseDraft: PortfolioDraft = {
  templateId: "smartfolio",
  themeId: "hudi-blue",
  displayName: "Joao da Silva",
  profession: "Fotografo",
  tagline: "Olhares que contam historias",
  bio: "Registro pessoas e territorios.",
  slug: "Joao da Silva",
  email: "joao@example.com",
  instagram: "joaofoto",
  projects: [],
  blocks: [],
  consentToReview: true,
};

describe("toPortfolioSlug", () => {
  it("normaliza acentos, espacos e simbolos", () => {
    expect(toPortfolioSlug(" Canto dos Passaros & Cia ")).toBe("canto-dos-passaros-cia");
    expect(toPortfolioSlug("Olhares!!! 2026")).toBe("olhares-2026");
  });

  it("limita o identificador e remove hifens nas extremidades", () => {
    expect(toPortfolioSlug("---Meu projeto---")).toBe("meu-projeto");
    expect(toPortfolioSlug("a".repeat(80))).toHaveLength(48);
  });
});

describe("createPublicationRequest", () => {
  it("cria um envelope versionado e normaliza o slug", () => {
    const request = createPublicationRequest(baseDraft, new Date("2026-07-16T12:00:00.000Z"));

    expect(request.schemaVersion).toBe(1);
    expect(request.requestedSlug).toBe("joao-da-silva");
    expect(request.requestedAt).toBe("2026-07-16T12:00:00.000Z");
  });
});
