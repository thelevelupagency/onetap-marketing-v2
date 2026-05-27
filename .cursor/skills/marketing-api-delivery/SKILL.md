---
name: marketing-api-delivery
description: "INACTIVE for static site — delivers public API routes with validation, rate limits, and Turnstile when leads/analytics are added. Use when implementing src/app/api routes."
---

# Marketing API Delivery (future)

**Do not use until `src/app/api/**` is in scope.** See `marketing-api-future.mdc` and `AGENTS.md`.

## Workflow (when active)

1. Confirm endpoint contract and data store (Supabase, Redis queue, etc.).
2. Start from `.cursor/templates/route-handler.ts`.
3. Add Zod validation, auth if needed, rate limits, Turnstile for public POST.
4. Wire env vars in `.env.example` and CI workflow.
5. Security review via `@security-reviewer`.
6. Integration tests for non-trivial handlers.

## Checklist

- [ ] Input validation
- [ ] Rate limiting + Turnstile on public forms
- [ ] Safe errors and logs (no PII)
- [ ] Privacy disclaimer on data collection forms
- [ ] CI env placeholders updated

## Output format

```markdown
API delivery:
- Route:
- Validation:
- Abuse controls:
- Env vars:

Security notes:
```
