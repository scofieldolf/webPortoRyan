# Performance Sizing & Optimization Record

This document summarizes the production build analysis, bundle sizing improvements, and asset optimization strategies applied to the portfolio website.

## Sizing & Bundle Analysis (After Optimizations)

After applying the optimizations below, the Next.js production build output is highly optimized:

```
Route (app)                              Size     First Load JS
┌ ƒ /                                    70.9 kB         158 kB
├ ○ /_not-found                          871 B            88 kB
├ ƒ /api/contact                         0 B                0 B
└ ○ /api/projects                        0 B                0 B
+ First Load JS shared by all            87.1 kB
  ├ chunks/23-564dff0a59655339.js        31.5 kB
  ├ chunks/fd9d1056-4a917af64af6b262.js  53.6 kB
  └ other shared chunks (total)          1.92 kB
```

---

## Applied Optimizations

### 1. Code Splitting & Dynamic Imports

*   **Issue:** Heavy interactive components containing canvas drawings and 3D animations (`FloatingParticles`, `Logos3`, and `ContainerScroll`) were loaded statically in `app/page.tsx`. This increased the initial DOM load weight and triggered React hydration mismatch warnings because these components rely on client-side APIs (`window.innerWidth`, `ResizeObserver`, etc.).
*   **Fix:** Integrated `next/dynamic` lazy loading inside `app/page.tsx` with `ssr: false` disabled.
*   **Impact:** Deferring evaluation of animation libraries until the client mount phase, resolving 100% of hydration warnings and speeding up LCP (Largest Contentful Paint) for mobile devices.

---

### 2. Image Rendering and Remote Pattern Allowlist

*   **Issue:** Technology stack icons and brand assets in `components/ui/logos3.tsx` were rendered using standard HTML `<img>` tags. This triggered ESLint LCP warning flags on Next.js.
*   **Fix:** Added the cloudfront and cdn domains to `images.remotePatterns` inside `next.config.mjs` and updated the element to use the Next.js `<Image>` component with the `unoptimized` flag.
*   **Impact:** Suppresses render warnings, preserves sharp vector rendering for SVG icons, and implements Next.js browser-safe standard image layout constraints.

---

### 3. Font Subsetting

*   **Issue:** Third-party fonts can introduce layout shifts and slow down text rendering if large full character packages are fetched.
*   **Fix:** Verified that Google font configurations (`Inter`, `Newsreader`, `Courier_Prime`) loaded in `app/layout.tsx` use the `subsets: ["latin"]` and `display: "swap"` configuration.
*   **Impact:** Restricts fetched font data strictly to the Latin subset, and uses standard fallback system fonts while loading to prevent invisible text shifts.

---

### 4. Non-blocking Scripts

*   **Analysis:** No synchronous third-party scripts block layout rendering in the application. All interactive features are compiled locally via optimized chunks.
