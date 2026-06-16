# 1. Use Next.js App Router

## Status

Approved

## Context

We need to build a modern, high-performance personal web portfolio. The application needs a responsive and interactive frontend along with lightweight backend routes to serve static data (profile details and projects) and process user feedback forms. Minimizing server maintenance overhead and deployment complexity is highly desirable.

## Decision

We decided to use **Next.js 14+ (App Router)** as the core framework. 

Next.js provides:
1. Unified frontend rendering and API routing (Serverless / Edge Functions compatibility).
2. Excellent React component abstractions with support for React Server Components (RSC) to serve content with zero bundle weight, alongside Client Components for animations.
3. Native optimizations for fonts, scripts, metadata, and routing.

## Consequences

*   **Pros:**
    *   No need to spin up and maintain a separate backend server (Express/FastAPI), reducing architectural complexity.
    *   Faster initial page load by rendering static sections (Hero, About, Projects) on the server, while retaining the ability to toggle client-side animation logic.
    *   Zero configuration required for deploying preview links and production releases on the Vercel platform.
*   **Cons:**
    *   Strict division between Server Components and Client Components requires explicit `"use client"` directives for Framer Motion or React state elements, necessitating disciplined component design.
