import type {
  AdminBlockKind,
  OptionalUserBlockKind,
  PortfolioDraft,
  ThemeId,
  UserBlockKind,
} from "@/domain/portfolio/types";

export interface ThemeManifest {
  id: ThemeId;
  name: string;
  description: string;
  previewTone: "blue" | "light" | "deep";
}

export interface TemplateManifest {
  id: PortfolioDraft["templateId"];
  name: string;
  version: string;
  description: string;
  userBlocks: readonly UserBlockKind[];
  adminBlocks: readonly AdminBlockKind[];
  themeIds: readonly ThemeId[];
}

export interface BlockManifest {
  kind: OptionalUserBlockKind;
  name: string;
  description: string;
}

export const userBlockCatalog: readonly BlockManifest[] = [
  { kind: "about", name: "Texto livre", description: "Uma seção de contexto ou manifesto." },
  { kind: "gallery", name: "Galeria", description: "Contexto para uma seleção de imagens." },
  {
    kind: "testimonials",
    name: "Depoimentos",
    description: "Relatos de clientes, parceiros ou público.",
  },
  { kind: "links", name: "Links", description: "Atalhos para canais e materiais externos." },
  { kind: "contact", name: "Contato", description: "Uma chamada para conversar ou contratar." },
] as const;

export const themes: readonly ThemeManifest[] = [
  {
    id: "hudi-blue",
    name: "Hudi Blue",
    description: "Azul Hudi, camadas claras e foco em conversão.",
    previewTone: "blue",
  },
  {
    id: "editorial-light",
    name: "Editorial",
    description: "Muito respiro, contraste tipográfico e leitura longa.",
    previewTone: "light",
  },
  {
    id: "deep-focus",
    name: "Deep Focus",
    description: "Azul profundo para trabalhos visuais e portfólios autorais.",
    previewTone: "deep",
  },
] as const;

export const templateRegistry: readonly TemplateManifest[] = [
  {
    id: "smartfolio",
    name: "Smartfolio Modular",
    version: "1.0.0",
    description:
      "Uma estrutura flexivel para pessoas, projetos culturais e pequenos negocios.",
    userBlocks: [
      "hero",
      "about",
      "projects",
      "gallery",
      "testimonials",
      "links",
      "contact",
    ],
    adminBlocks: [
      "hero",
      "about",
      "projects",
      "gallery",
      "testimonials",
      "links",
      "contact",
      "trusted-html",
    ],
    themeIds: ["hudi-blue", "editorial-light", "deep-focus"],
  },
] as const;

export function getTemplate(id: PortfolioDraft["templateId"]): TemplateManifest {
  const template = templateRegistry.find((item) => item.id === id);
  if (!template) throw new Error(`Template nao registrado: ${id}`);
  return template;
}

export function createDefaultDraft(): PortfolioDraft {
  return {
    templateId: "smartfolio",
    themeId: "hudi-blue",
    displayName: "Seu nome",
    profession: "Sua especialidade",
    tagline: "Uma frase clara sobre o que você faz.",
    bio: "Conte brevemente sua história, seu trabalho e o impacto que deseja criar.",
    slug: "seu-nome",
    email: "",
    instagram: "",
    projects: [
      {
        id: "project-1",
        title: "Projeto em destaque",
        description: "Explique o desafio, sua contribuição e o resultado.",
        url: "",
      },
    ],
    blocks: [],
    consentToReview: false,
  };
}
