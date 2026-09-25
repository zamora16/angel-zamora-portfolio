# Ángel Zamora Martínez — Portfolio

**Personal academic and professional site: research, publications, conferences, teaching, skills and projects, in English and Spanish.**

🌐 **Live:** [zamora16.github.io/angel-zamora-portfolio](https://zamora16.github.io/angel-zamora-portfolio/)

![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![Deploy](https://github.com/zamora16/angel-zamora-portfolio/actions/workflows/deploy.yml/badge.svg)

## Highlights

- **Bilingual (EN/ES)** with a language switcher; all copy lives in `src/dictionaries/en.json` and `es.json`, so content can be edited without touching components.
- **Typed content**: publications and other structured data are typed in `src/lib/types.ts` and kept in `src/lib/data.ts`.
- **Static export** (`output: 'export'`) deployed to GitHub Pages with a GitHub Actions workflow on every push to `master`.
- UI built with shadcn/ui (Radix primitives), Tailwind CSS and Framer Motion.

## Run locally

```bash
npm install
npm run dev        # http://localhost:9003
npm run build      # static site in ./out
npm run typecheck
```

## Structure

```
src/app/           one route per section (research, publications, conferences, teaching, skills, projects, experience, contact)
src/components/    layout (header, footer, language switcher, mobile nav) and UI primitives
src/dictionaries/  EN / ES content
src/lib/           typed data, language context and helpers
```
