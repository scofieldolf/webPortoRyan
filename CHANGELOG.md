# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.2.0] - 2026-06-16

### Added
- Created comprehensive test suite using Vitest, Happy-DOM/JSDOM, and React Testing Library (`tests/`).
- Added unit tests for layout components (`ThemeToggle`, `FloatingParticles`, `TiltCard`).
- Added unit tests for page-level sections (`Navbar`, `ContactForm`, `ProjectCard`).
- Added integration tests for server-side API routes (`/api/projects` and `/api/contact`).
- Added test coverage validation scripts to `package.json` utilizing `@vitest/coverage-v8`.
- Created detailed API manual in `docs/API.md`.

### Changed
- Improved TypeScript type safety across the entire application by eliminating the `any` type in the contact router and components, replacing it with strict type interfaces.
- Safe-cast DOM extensions in `vapour-text-effect.tsx` context using strict type structures.

### Fixed
- Fixed React `forwardRef` display-name linting warning inside `tests/components/TiltCard.test.tsx` by declaring explicit display names on mock components.
- Resolved contact form submission catch-block type errors by casting caught errors to `unknown` and validating via `instanceof Error`.

### Removed
- Cleaned up 6 unused class definitions (`.neon-glow-amber`, `.neon-border`, `.neon-border::before`, `.glass-panel-hover:hover`, `.dark .glass-panel-hover:hover`, and `.clip-cyber-corner`) in `app/globals.css`, safely reducing the production CSS bundle size.

---

## [1.1.0] - 2026-06-15

### Added
- Integrated Next.js 3D scroll canvas effect (`ContainerScroll`) showcase for desktop layouts.
- Integrated Gooey text morphing animations using SVG filters in `gooey-text-morphing.tsx`.
- Integrated Logos3 carousel component with Embla AutoScroll plugin to render technical skill logos.
- Designed 3D technology stack ribbon inside the skills layout.

### Changed
- Re-architected the About section into an interactive 3D scroll canvas.
- Realigned layout padding, margin offsets, and element spacing for high-density mobile viewports.

### Fixed
- Fixed contact data-write errors on Vercel read-only deployment functions by adding a fallback local write to `/tmp/contacts.json` if standard folder access fails.
- Resolved ESLint JSX comment nesting syntax errors and missing React component display names that were causing Vercel deployment builds to crash.

---

## [1.0.0] - 2026-06-14

### Added
- Initial scaffolding for the portfolio website utilizing Next.js 14 App Router, TypeScript, and Tailwind CSS.
- Established local JSON file-based database layers under `data/` folder for `profile.json`, `projects.json`, and `contacts.json`.
- Created backend Next.js API Routes for serving project lists (`/api/projects`) and processing contact form submissions (`/api/contact`).
- Implemented fully responsive UI components, including mobile-responsive `Navbar`, custom `TiltCard`, background `FloatingParticles`, and `ThemeToggle` mode.
- Configured local environment CLAUDE.md files and guidelines for developer workflows.

[1.2.0]: https://github.com/scofieldolf/web-porto-ryan/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/scofieldolf/web-porto-ryan/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/scofieldolf/web-porto-ryan/releases/tag/v1.0.0
