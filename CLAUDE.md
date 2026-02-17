# Hondo

A word-guessing game where players try to reach 100 points in as few turns as possible. Built with SvelteKit.

## Tech Stack

- **SvelteKit 2** with **Svelte 5** (runes syntax) — static adapter for deployment
- **TypeScript**
- **SCSS** for styling
- **Vite** for build tooling

## Commands

```bash
npm run dev          # Dev server on port 3000
npm run build        # Production build
npm run preview      # Preview built app
npm run check        # Svelte type checking
npm run lint         # Prettier + ESLint checks
npm run format       # Auto-format with Prettier
```

There are no automated tests.

## Project Structure

- `src/routes/` — SvelteKit file-based routing (+page.svelte, +layout.svelte)
- `src/lib/components/` — Svelte components (game/, modals/, icon/)
- `src/lib/state/` — Svelte stores for state management
  - `game.ts` — Game state stores
  - `global.ts` — UI state (loading, modals, toasts)
  - `user.ts` — User preferences (dark mode)
  - `mutations.ts` — State mutation functions and core game logic
  - `getters.ts` — Derived stores for computed values/statistics
- `src/lib/js/` — Utilities, types, constants, word lists
- `src/lib/scss/` — Global styles, variables, theming

## Code Conventions

- **Prettier**: tabs, single quotes, no trailing commas, 100 char line width
- **Naming**: camelCase for JS/TS, kebab-case for CSS classes
- **Components**: TypeScript (`lang="ts"`), props via `$props()`, reactivity via `$derived`/`$effect`/`$state`, scoped SCSS styles
- **State**: Svelte writable stores, mutations centralized in `mutations.ts`, localStorage persistence
- **Accessibility**: `.sr` class for screen reader text, aria attributes, semantic HTML
