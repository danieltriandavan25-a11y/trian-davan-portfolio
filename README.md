# Trian Davan — Portfolio

Phase 1: project foundation only. No sections (Hero, Work, Services,
About, Contact) or animations yet.

## Stack

- React + Vite
- Tailwind CSS v4 (via `@tailwindcss/vite`, no separate config file —
  tokens live in `src/index.css`)
- Origin UI — copy-paste Tailwind components, dropped into
  `src/components/ui/` as they're added
- React Bits — copy-paste animation components, dropped into
  `src/components/` (or a dedicated `animations/` folder) once a
  later phase actually introduces motion

## Folder structure

```
src/
  components/
    layout/       Navbar, Container, and other structural pieces
    ui/            Origin UI components land here, one file per component
  sections/        Hero, SelectedWork, Services, etc. — one file per section, added phase by phase
  lib/
    utils.js       cn() helper (clsx + tailwind-merge) that Origin UI components expect
  index.css        design tokens (color, type, spacing) + base styles
  App.jsx
  main.jsx
```

## Design tokens

Defined in `src/index.css` under `@theme`: a near-monochrome color
scale (`--color-ink`, `--color-ink-muted`, `--color-ink-faint`,
`--color-surface`, `--color-border`), a system font stack, and a
shared max content width. Every future section should pull from
these rather than introducing new colors.

## Run locally

```
npm install
npm run dev
```
