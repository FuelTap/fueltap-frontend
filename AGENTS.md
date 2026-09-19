# Repository Guidelines

## Project Structure & Module Organization
FuelTap is a Next.js frontend and backend-for-frontend for fuel delivery, using React, TypeScript, and Tailwind CSS.

- `app/`: routes, layouts, and global styles; `(onboarding)/` contains authentication screens and `user/` contains account and ordering screens.
- `components/`: feature components grouped by domain; `ui/` and `animate-ui/` hold reusable primitives.
- `context/` and `hooks/`: shared providers and custom hooks.
- `lib/server/`: server-side authentication, wallet, and KYC operations. `lib/helpers/` contains fetch and cookie utilities; `lib/validators/` contains Zod schemas.
- `public/`: static assets. `proxy.ts`: request interception logic.

## Build, Test, and Development Commands
Use pnpm, as specified in `package.json`, and retain `pnpm-lock.yaml`.

- `pnpm install`: install dependencies.
- `pnpm dev`: start development on port 5000.
- `pnpm build`: create the production build.
- `pnpm start`: serve the production build on port 5000.
- `pnpm lint`: run ESLint with Next.js Core Web Vitals and TypeScript rules.

## Coding Style & Naming Conventions
Use strict TypeScript and the `@/` alias for imports from the repository root. Match nearby code: two-space indentation, double quotes, and semicolons. Use PascalCase for feature components, camelCase for functions and variables, and `use` prefixes for hooks. Preserve existing lowercase or kebab-case primitive filenames. Keep route entry points named `page.tsx` and `layout.tsx`. Reuse existing UI primitives and validation schemas. ESLint is configured; no dedicated formatter is configured.

## Testing Guidelines
No automated test framework, test script, or coverage threshold is currently configured. Run `pnpm lint` and `pnpm build` before submitting changes. Manually verify affected flows, including relevant authentication, ordering, or wallet behavior, and check responsive UI changes. Record verification steps and results in the PR. Establish a naming convention alongside any future test framework.

## Commit & Pull Request Guidelines
History uses `feat:`, `chore:`, and scoped forms such as `feat(frontend):`. Follow `CONTRIBUTING.md`: use a type prefix and keep the description to 50 characters or fewer. Prefer a scope when useful. Keep PRs focused, explain behavior changes, link relevant issues, and include screenshots for visual changes plus verification results.

## Security & Configuration
Set the backend `API_URL` in a local environment file. Keep credentials and tokens out of commits and client code; `.env*` files are ignored. Preserve server-side authentication and cookie handling.
