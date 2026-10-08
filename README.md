# LessonKit UI

A small design system for online tutoring platforms: lesson cards, subject badges,
progress bars and buttons, built with **Tailwind CSS v4** and **tailwind-variants**.

Live demo: https://oleksandr-barskyi.github.io/lessonkit-ui/

## Why tailwind-variants

Class strings for every state of a component get long fast. `tv()` keeps them in one
typed definition per component:

- **variants** for independent axes (`intent`, `size`, `tone`);
- **slots** for multi-part components, so one call styles the card, its header, title and
  status pill together;
- **compoundVariants** for combinations that need their own rule, for example a compact
  live card gets a thinner ring, and each subject colour is a pair of `subject` x
  `appearance`;
- **defaultVariants** so call sites stay short;
- **tailwind-merge** under the hood, so a caller's `className="px-8"` replaces the
  variant's padding instead of fighting it;
- `VariantProps<typeof button>` gives the React components typed props for free.

## What is inside

```
src/
  lib/lesson.ts          pure lesson logic: status (upcoming, live, done), progress, "starts in"
  ui/variants.ts         tv() definitions: button, subjectBadge, lessonCard (slots), progress (slots)
  ui/components.tsx      thin React components over the variants
  App.tsx                demo: today's schedule of an online school with filters and compact view
```

Logic and styling rules are tested without rendering React: `lesson.test.ts` covers
status boundaries and rounding, `variants.test.ts` checks that compound variants and
className merging produce the expected classes.

## Run

```bash
npm install
npm run dev
npm test
npm run build
```

Stack: React 19, TypeScript, Vite, Tailwind CSS v4, tailwind-variants, Vitest, Biome.
