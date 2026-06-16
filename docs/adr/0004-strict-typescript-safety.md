# 4. Enforce Strict TypeScript Safety

## Status

Approved

## Context

JavaScript and loose TypeScript (using type assertions or `any` declarations) allow compiler errors to escape build checks. This results in runtime crashes (e.g. `TypeError: Cannot read property of undefined`) that are difficult to debug in production serverless environments.

## Decision

We decided to enforce **strict TypeScript type safety** by enabling `"strict": true` in `tsconfig.json` and refactoring the codebase to eliminate the use of the `any` escape hatch. 

Actions taken:
1. Created explicit interfaces for models (e.g. `ContactMessage`).
2. Replaced caught block error variables from `: any` to `: unknown` and validated them with runtime type guards (`instanceof Error`).
3. Eliminated type assertions (`as any`) by defining extended inline interface mappings where custom browser DOM features are used.

## Consequences

*   **Pros:**
    *   Finds errors at compile time before code reaches production servers.
    *   Improves IDE auto-complete and self-documenting code quality.
    *   Prevents runtime null/undefined pointer crashes.
*   **Cons:**
    *   Requires additional boilerplate code to define interfaces.
    *   Adds slight friction when integrating with loosely typed third-party JS modules.
