# Workspace Instructions

This is a small Next.js storefront prototype built with the App Router and a mobile-first landing page in Vietnamese.

## Project overview

- Framework: `next` 16.2.3
- Language: TypeScript + React 19
- Routing: Next.js App Router (`app/` directory)
- Main UI: `app/page.tsx`
- Layout: `app/layout.tsx`
- Global styles: `app/globals.css`

## Primary commands

Use the root scripts from `package.json`:

- `npm install` — install dependencies
- `npm run dev` — start local development server
- `npm run build` — build production app
- `npm run start` — serve production build
- `npm run lint` — run Next.js lint checks

## What to keep in mind

- `app/page.tsx` is a client component (`"use client"`). Keep it client-side when adding UI interactions.
- This project is a single-page e-commerce storefront prototype, not a full backend or API app.
- Preserve the mobile-first layout and Vietnamese content style when updating UI sections.
- Avoid adding unrelated directories or architecture unless the feature requires it.

## Design system & setup workflow

This repo follows a refined e-commerce presentation style with two related design expressions:
- **The Digital Curator**: sophisticated utility with tonal layering, soft glass-like surfaces, and editorial spacing.
- **Glacier — Glassmorphism**: deep navy atmosphere with translucent glass layers, subtle glow, and icy accent tones.

### 1. Understand the project

- Focus on `app/page.tsx` for the main storefront content and layout structure.
- Use `app/globals.css` to implement global color, typography, spacing, surface, and glassmorphism rules.
- Preserve Vietnamese copy and avoid swapping the language to English unless requested.
- Keep the UI calm, premium, and editorial rather than loud or overly promotional.

### 2. Apply the design system

- Use `Be Vietnam Pro` for headings and editorial display text.
- Use `Inter` for body copy, labels, and product details.
- Avoid 1px borders for layout separation; prefer surface tone changes and spacing.
- Use glass-effect panels for floating elements with `backdrop-filter: blur(...)` and semi-transparent backgrounds.
- Keep shadows minimal; use tonal layering and only add soft ambient shadows for truly elevated elements.

### 3. File setup guidance

- `app/globals.css`: define base palette tokens, font stacks, surface tiers, and glass effect utilities.
- `app/page.tsx`: structure sections with generous vertical spacing, editorial layout, and product cards.
- `app/layout.tsx`: preserve root metadata, fonts, and body styling.

### 4. Style rules to enforce

- Do not use solid 1px borders for section separation.
- Use background shade shifts between surface containers.
- Use gradients for key CTA surfaces, especially primary buttons.
- Use subtle glass borders and blur for elevated panels.
- Keep icon usage minimal and outline-based.

## Recommended work areas

- UI/content changes: `app/page.tsx`, `app/globals.css`
- Layout changes: `app/layout.tsx`
- Fonts: uses `next/font/google` inside `app/page.tsx`
- Dependencies and scripts: `package.json`

## Helpful notes for the agent

- This repo has no custom GitHub Actions, no tests, and no existing `.github` customization files.
- Prefer updating the README only when adding or changing project-running instructions or architecture notes.
- Keep changes aligned with a simple storefront demo style.
