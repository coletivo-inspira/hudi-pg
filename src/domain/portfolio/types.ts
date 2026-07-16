export type ThemeId = "hudi-blue" | "editorial-light" | "deep-focus";

export type UserBlockKind =
  | "hero"
  | "about"
  | "projects"
  | "gallery"
  | "testimonials"
  | "links"
  | "contact";

export type AdminBlockKind = UserBlockKind | "trusted-html";

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  url: string;
}

export interface PortfolioDraft {
  templateId: "smartfolio";
  themeId: ThemeId;
  displayName: string;
  profession: string;
  tagline: string;
  bio: string;
  slug: string;
  email: string;
  instagram: string;
  projects: PortfolioProject[];
  consentToReview: boolean;
}

export interface PublicationRequest {
  schemaVersion: 1;
  requestedAt: string;
  requestedSlug: string;
  draft: PortfolioDraft;
}

