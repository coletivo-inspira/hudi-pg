# HUDI Pages architecture

## Scope

HUDI Pages is a statically exported Next.js application. It collects a typed
portfolio draft, renders a local live preview and submits a publication request
to a separate Cloudflare Worker. GitHub credentials never reach the browser.

## Modules

- `src/domain/portfolio`: portfolio contracts, slug rules and publication payload.
- `src/domain/templates`: central template and theme registry.
- `src/components/Builder`: stateful editor and live preview.
- `src/services/submission.ts`: browser-side publication adapter.
- `worker`: secure bridge between the static site and GitHub automation.

The UI depends on domain contracts. External integrations depend on the
publication request, so GitHub and Cloudflare details do not leak into the
builder components.

## Template extension

Every template is registered through a `TemplateManifest`. A manifest declares
its version, allowed themes and block capabilities. User-created content can use
only `UserBlockKind`. `trusted-html` is an admin-only capability and must pass a
review before publication. Arbitrary JavaScript is never accepted.

The initial release exposes one deep `smartfolio` template with three visual
themes. New themes can be added without changing publication contracts. New
templates should include a manifest, renderer and contract tests.

## Publication flow

1. The browser creates a `PublicationRequest` with schema version 1.
2. The Cloudflare Worker validates origin, payload size and forbidden content.
3. The Worker emits a GitHub `repository_dispatch` event to the moderation repo.
4. Automation creates or updates one repository per portfolio.
5. Content-only updates can publish automatically after ownership validation.
6. Template or trusted HTML changes require Coletivo Inspira review.

The expected public address is `inspira.dev.br/<slug>`. DNS and the custom domain
workflow remain infrastructure concerns, outside the static frontend.

## Editing and ownership

The first submission returns a request id. Production automation should exchange
that request for a private edit link with a revocable token. Tokens must be
hashed at rest, scoped to one portfolio and never included in the generated site.

## Security boundaries

- No GitHub token in `NEXT_PUBLIC_*` variables.
- Restrict Worker CORS to the production and preview origins.
- Reject payloads larger than 64 KiB.
- Reject `script`, event-handler attributes and `trusted-html` from public forms.
- Apply Cloudflare rate limiting before enabling anonymous production traffic.
- Pin GitHub Actions and use least-privilege repository permissions.

