# Submission Worker

Secure bridge for publication requests. Configure the GitHub token as a secret:

```bash
npx wrangler secret put GITHUB_TOKEN
npx wrangler deploy
```

Use a fine-grained token scoped to the moderation repository and set
`ALLOWED_ORIGIN` to the exact deployed HUDI Pages origin. Configure Cloudflare
rate limiting before accepting public traffic.

