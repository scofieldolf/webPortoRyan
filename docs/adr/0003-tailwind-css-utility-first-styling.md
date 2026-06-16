# 3. Tailwind CSS Utility-First Styling

## Status

Approved

## Context

We need a styling solution that enables rapid UI layout, responsive styling (mobile-first), dark/light mode toggle support, and high performance. Classic CSS files or CSS-in-JS (like styled-components) introduce performance overhead, CSS class name management, and bundle bloat.

## Decision

We decided to use **Tailwind CSS** as our styling engine. Style guidelines are configured in `tailwind.config.ts` and `app/globals.css`.

Tailwind is chosen because:
1. It uses a utility-first class name system that compiles into a tiny, purged CSS file.
2. It has native mobile breakpoints (`sm`, `md`, `lg`) and dark mode class selectors (`dark:`) built directly into standard class parameters.
3. It fits React component design patterns, where styling is declared alongside components.

## Consequences

*   **Pros:**
    *   No stylesheet names or BEM naming conventions to maintain.
    *   Extremely responsive mobile layouts are easily defined inline.
    *   Dark/light mode styling is highly maintainable via `.dark` toggle classes.
*   **Cons:**
    *   Can lead to long, cluttered `className` strings in JSX code. We manage this by using the `clsx` and `tailwind-merge` utility helpers (`cn`) to combine classes programmatically.
