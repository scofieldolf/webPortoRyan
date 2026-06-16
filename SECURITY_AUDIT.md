# Security Audit & Remediation Report

This report details the security vulnerability audit, risks identified, vulnerable structures, and implemented fixes to ensure application and API security.

---

## Security Audit & Remediation Table

| Category | Vulnerability Risk | Code/File | Fix/Remediation Implemented | Status |
|---|---|---|---|---|
| **Rate Limiting** | **Medium:** DoS / spam submission of contacts folder leading to disk storage exhaustion. | `app/api/contact/route.ts` | Implemented an in-memory rate limiter that restricts contact submissions to a maximum of 5 requests per minute per client IP address. Returns `429 Too Many Requests`. | Patched |
| **Exposure of Internals** | **Low:** Error messages returning raw Node stack traces or private directory strings. | `app/api/projects/route.ts`, `app/api/contact/route.ts` | Verified all 500 error catch blocks return standardized, generic messages (e.g. "An internal server error occurred.") instead of raw JS error dumps. | Compliant |
| **SQL Injection** | **None:** Relational database query injections. | Space-wide | The application uses local read-only static JSON files; no SQL queries are executed. | Not Applicable |
| **XSS** | **Low:** User-supplied tags rendered dynamically in layouts. | `app/components/ContactForm.tsx`, page renderers | Input text is not rendered back. Profile elements are escaped by standard React JSX rendering engines. | Compliant |
| **Secrets Exposure** | **Low:** Private API keys or access tokens hardcoded in configuration files. | Space-wide | No database keys, secrets, or remote tokens are stored in the codebase. | Compliant |
| **Insecure Dependencies** | **Critical:** Remote Code Execution / DoS / Bypass in Next.js versions <= 14.2.5. | `package.json` | Upgraded `next` dependency to version `14.2.35` (safe version) to resolve critical vulnerabilities. | Patched |

---

## Detailed Remediation Actions

### 1. In-Memory Rate Limiting

*   **Risk:** Automated bot spammers could submit contact forms indefinitely. Since the server appends messages to a file (`data/contacts.json`), spamming can grow the file to megabytes, leading to disk write latency and serverless execution timeouts.
*   **Remediation:** Added a sliding-window in-memory map to count requests per client IP.
*   **Vulnerable Structure:**
    ```typescript
    export async function POST(req: NextRequest) {
      try {
        const { name, email, message } = await req.json();
        // saves immediately
    ```
*   **Secure Patch:**
    ```typescript
    const ipCache = new Map<string, number[]>();
    const RATE_LIMIT_WINDOW_MS = 60 * 1000;
    const MAX_REQUESTS_PER_WINDOW = 5;

    function isRateLimited(ip: string): boolean {
      const now = Date.now();
      const timestamps = ipCache.get(ip) || [];
      const activeTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
      if (activeTimestamps.length >= MAX_REQUESTS_PER_WINDOW) return true;
      activeTimestamps.push(now);
      ipCache.set(ip, activeTimestamps);
      return false;
    }

    export async function POST(req: NextRequest) {
      try {
        const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "127.0.0.1";
        if (isRateLimited(ip)) {
          return NextResponse.json(
            { error: "Too many contact submissions. Please try again later." },
            { status: 429 }
          );
        }
    ```

---

## Verification

- **Rate Limit Unit Test:** Added a test in `tests/api/contact.test.ts` verifying that 5 submissions from the same IP succeed, the 6th returns `429`, and a request from a different IP concurrently succeeds.
- **TypeScript Check:** Compiled with `npx tsc --noEmit` returning `0` errors.
- **Unit Tests Run:** All 59 tests passed.
