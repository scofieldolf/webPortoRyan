# 5. Vitest Testing Harness

## Status

Approved

## Context

We need to verify the correctness of our API handlers, helper functions, page logic, and client-side components. Running manual tests in the browser is slow, prone to oversight, and cannot be integrated into automated CI/CD checks.

## Decision

We decided to use **Vitest** combined with **Happy-DOM / JSDOM** and **React Testing Library** as the primary testing runner and environment.

Vitest is chosen because:
1. It is extremely fast, utilizing Vite's native compilation caching and ESM-first module loading.
2. It requires almost zero configuration, sharing alias resolutions directly from our JS/TS compilers.
3. It has built-in mock/spy features (`vi.mock`, `vi.fn`, `vi.spyOn`) compatible with standard Jest matchers.
4. It provides out-of-the-box coverage analysis using the V8 engine (`@vitest/coverage-v8`).

## Consequences

*   **Pros:**
    *   Fast, reliable test runs (tests run under ~1.5s).
    *   Zero-config TypeScript compile integration.
    *   Enables checking for regression errors programmatically before commits.
*   **Cons:**
    *   Requires JSDOM which mocks browser behavior but does not fully run the layout engine, so visual/css anomalies must be tested manually or via E2E tools (like Playwright).
