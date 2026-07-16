import type { PortfolioDraft, PublicationRequest } from "./types";

const MAX_SLUG_LENGTH = 48;

export function toPortfolioSlug(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, MAX_SLUG_LENGTH)
    .replace(/-+$/g, "");
}

export function createPublicationRequest(
  draft: PortfolioDraft,
  now = new Date(),
): PublicationRequest {
  const requestedSlug = toPortfolioSlug(draft.slug || draft.displayName);

  return {
    schemaVersion: 1,
    requestedAt: now.toISOString(),
    requestedSlug,
    draft: { ...draft, slug: requestedSlug },
  };
}

