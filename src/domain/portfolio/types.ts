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

export type OptionalUserBlockKind = Exclude<UserBlockKind, "hero" | "projects">;

export interface PortfolioBlock {
  id: string;
  kind: OptionalUserBlockKind;
  title: string;
  content: string;
}

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
  blocks: PortfolioBlock[];
  consentToReview: boolean;
}

export interface PublicationRequest {
  schemaVersion: 1;
  requestedAt: string;
  requestedSlug: string;
  draft: PortfolioDraft;
}
