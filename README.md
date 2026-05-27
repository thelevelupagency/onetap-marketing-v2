# OneTap Marketing V2

A professional marketing website for OneTap Card, built with Next.js, Tailwind CSS v4, and Framer Motion.

## Features

- **Professional Design**: Modern, responsive UI with brand-aligned aesthetics.
- **Interactive Animations**: MacBook scroll effects, animated background gradients, and smooth text transitions.
- **Mobile First**: Optimized for seamless experience across all device sizes.
- **Conversion Focused**: Integrated call-to-actions pointing to the OneTap application.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [Aceternity UI](https://ui.aceternity.com/)
- **Icons**: [Lucide React](https://lucide.dev/) & [Tabler Icons](https://tabler-icons.io/)

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Environment files (committed, public URLs only):

- [`.env.development`](.env.development) — `next dev` / preview (`card-dev`, `app-dev`)
- [`.env.production`](.env.production) — production builds (`card`, `app`)
- [`.env.local`](.env.local) — optional machine overrides (gitignored), e.g. `NEXT_PUBLIC_SITE_URL=http://localhost:3000`

### Checks before PR

```bash
npm run typecheck
npm run lint
npm run build
```

## AI-assisted development

- **[AGENTS.md](./AGENTS.md)** — operating guide (architecture, CI, playbooks).
- **`.cursor/`** — rules, skills, agents, and templates for Cursor.
- **Ship it** — in Cursor chat, run typecheck + lint + build and get a PR summary (see [`.cursorrules`](.cursorrules)).
- **CI** — PRs to `dev` / `main` require lint, typecheck, and build ([`docs/engineering/ci-workflow.md`](docs/engineering/ci-workflow.md)).

## Organization

This project is maintained by [The LevelUp Agency](https://github.com/thelevelupagency).
