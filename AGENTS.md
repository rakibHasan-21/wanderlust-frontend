<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Wanderlust

Single-package Next.js (App Router) travel landing page, still mostly a shell — `src/app/page.tsx` is the main (empty) page. Assets are prepped in `public/images/` (banners, `Wanderlast.png` brand images, `public/images/destinations/*`). npm only (package-lock.json). No tests, no CI, no pre-commit hooks.

## Commands

- `npm run dev` — dev server (Turbopack). Next.js 16 allows only one dev server per project directory: if one is already running it exits with "Another next dev server is already running" and prints the existing PID/log. Reuse the running server instead of force-killing it.
- `npm run build`
- `npm run lint` — ESLint only; no typecheck script, use `npx tsc --noEmit` (passes clean)
- No tests exist; don't invent test commands.

## Framework gotchas

- **React Compiler is enabled** (`reactCompiler: true` in `next.config.ts`): never mutate props/state, no synchronous `setState` inside effects, no conditional hooks. The React-compiler lint rules are active, and vendored files that violate them (see below) are already failing `npm run lint` as of now — `src/components/ui/carousel.tsx` and `src/hooks/use-mobile.ts` (`react-hooks/set-state-in-effect`) plus an unused-`Image` warning in `page.tsx`. Treat these as known baseline failures, not something your change caused.
- New code must keep `tsc --noEmit` and `npm run lint` clean, except for the baseline failures above.

## Styling & shadcn kit

- Tailwind v4 via Turbopack (`@tailwindcss/turbopack` rule in `next.config.ts`). There is **no `tailwind.config`**: theme tokens, oklch color variables, radius scale, and the `.dark` custom variant all live in `src/app/globals.css`.
- `src/components/ui/*` is a pre-installed full shadcn kit, style `base-nova` per `components.json`, built on **`@base-ui/react` primitives — not Radix**. Component APIs are not the Radix-based shadcn from your training data; always open the specific component before editing it. Add new components with the shadcn CLI (`npx shadcn add <component>`), which follows `components.json`.
- `cn` is the `cn` npm package re-exported from `@/lib/utils`. UI kit files import it from `"cn"` directly; app code uses `@/lib/utils`. Match the file you're editing. Path alias: `@/*` → `./src/*`.
- Font wiring is incomplete: `globals.css` expects a `--font-sans` CSS variable, but `src/app/layout.tsx` loads Josefin Sans via `.className` (not `variable`). If you touch fonts, reconcile both halves.
