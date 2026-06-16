# Project Style Guide

This document establishes coding conventions, layout rules, and architectural patterns to maintain structural and style consistency across the codebase.

---

## 1. File Naming & Organization

- **React Components:** Use `PascalCase` for component files and function declarations (e.g., `ProjectCard.tsx`).
- **Standard Modules & Hooks:** Use `camelCase` or `kebab-case` for utility helper files and hooks (e.g., `i18n.tsx`).
- **REST API Routes:** Always place route handlers inside Next.js structure directories named `route.ts`.
- **Target Directories:**
    *   Application pages, layouts, and API routes reside in the `app/` directory.
    *   Shared UI library components reside in the `components/ui/` directory.
    *   Generic core client components reside in the `app/components/` directory.

---

## 2. Naming Conventions

- **Component Props:** Always suffix component props interfaces with `Props` (e.g., `interface NavbarProps`).
- **Variables & Functions:** Use `camelCase` for variables, helper functions, state variables, and hook definitions.
- **Interfaces & Types:** Use `PascalCase` for all TypeScript interfaces, custom types, and enums.
- **Constants:** Use `UPPER_SNAKE_CASE` for global constant arrays or immutable objects.

---

## 3. Code Structure & Layout

- **Imports Grouping:** Group imports at the top of the file in the following order:
    1.  React and core React dependencies.
    2.  Third-party modules (e.g., `framer-motion`, `lucide-react`).
    3.  Internal utility imports, types, or contexts using the `@/` alias.
    4.  Local relative components and styles.
- **Exports:**
    *   Declare UI elements as `default` or `named` exports, but keep them consistent.
    *   Explicitly define `displayName` on forwarded-ref React components.

---

## 4. Strict Type Safety

- **No Implicit Any:** Never use the `any` type. Define explicit types/interfaces.
- **Type Assertions:** Avoid using type assertions (`as Type`) unless interfacing with dynamic browser APIs that are not covered in the standard typescript definitions.
- **Error Handling in Catches:** Always type catch variables as `unknown` (TypeScript default) and validate them with `instanceof Error` before reading properties:
    ```typescript
    try {
      // code
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "An error occurred";
      // handle error
    }
    ```

---

## 5. API Response Consistency

- **Success Responses:** Return standardized HTTP status codes (`200 OK`, `201 Created`) with typed JSON bodies.
- **Failure Responses:** Always return an object with a single `error` property and a descriptive client-safe message:
    ```typescript
    return NextResponse.json(
      { error: "Detailed message." },
      { status: 400 }
    );
    ```
- **Logging:** Always log internal errors using `console.error` with specific descriptive prefix tags, and avoid using `console.log` in production code.
