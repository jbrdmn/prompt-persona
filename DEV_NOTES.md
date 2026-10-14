# Prompt Persona — Dev Notes
_Last updated: 2026-10-14_

## What it is
A 15-question quiz that tells you how you use AI, mapping you to one of 6 "prompt personas" with a results breakdown and share buttons (X, LinkedIn, native share, copy link). Fully static, no backend. Originally generated in Bolt and then refined by hand.

Live URL: https://prompt-persona-lac.vercel.app (as linked from the portfolio's `lib/projects.ts`).

## Stack
- Vite 5 + React 18 + TypeScript + Tailwind 3
- Framer Motion (screen transitions), Recharts (results chart), lucide-react (icons)
- Light/dark theme via `src/context/ThemeContext.tsx`
- Vercel static hosting

## Run locally
```bash
npm install
npm run dev
npm run typecheck   # tsc --noEmit -p tsconfig.app.json
npm run build       # vite build (does not typecheck)
npm run lint
```

## Environment variables
None. The code reads no `import.meta.env.*` values. An empty `.env` exists locally (Bolt leftover) and is gitignored.

## Deploy
- Vercel team: PERSONAL `jbrdmn` (`team_Y8kdCEVMpD9RdwqF9m8FGryI`)
- Project: `prompt-persona` (`prj_HrRgkqB5iBCTv0D94jtNu8pATO54`)
- **This checkout is not linked** (no `.vercel/` folder). Run `vercel link --scope jbrdmn` and pick `prompt-persona` before deploying from the CLI.
- Git remote: `github.com/jbrdmn/prompt-persona`, branch `main`
- Auto-deploy on push: not confirmed from the repo. Manual: `vercel --prod --scope jbrdmn`
- No `vercel.json`. Not needed: the app is a single route and results live in the URL hash, so there are no deep paths to rewrite.

## Architecture
- `src/App.tsx`: three-screen state machine `landing` → `quiz` → `results`, animated with `AnimatePresence`. On load, if the URL hash holds encoded results it jumps straight to `results`.
- `src/data/questions.ts` (15 questions), `src/data/personas.ts` (6 personas)
- `src/utils/scoring.ts`: `encodeResults` / `decodeResults` / `getResultsHash` / `parseResultsFromHash`. Section scores are serialised into the hash so a result URL is shareable with no server.
- `src/utils/share.ts`: share intents built from `window.location.href` (includes the results hash)
- `src/components/`: `Landing`, `Quiz`, `Results`, `ThemeToggle`
- `src/types.ts`: `Scores`, `SectionScores`
- `.bolt/` holds the original Bolt template config and prompt; not used at build time.

## Decisions & gotchas
- **Results in the URL hash** is the persistence and sharing mechanism. Changing question order, section keys or the encoding breaks old shared links.
- `vite.config.ts` has `optimizeDeps.exclude: ['lucide-react']` from the Bolt template. In other Vite projects this has caused a blank white screen in dev; if that happens, delete the `optimizeDeps` block.
- `og:image` in `index.html` is a relative path (`/og-image.png`). Most social scrapers need an absolute URL, so link previews may show no image.
- Package name is still the Bolt default `vite-react-typescript-starter`.

## Known issues / open work
- Absolute `og:image` / `og:url` not set (see above).
- `public/Screenshot_2026-02-18_at_17.01.52.png` and `src/.DS_Store` look like stray files.
- No README, no tests.
