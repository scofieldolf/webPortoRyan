# 2. JSON File-Based Data Storage

## Status

Approved

## Context

The portfolio application requires a way to fetch project details, profile metadata, and save contact form submissions. Spinning up a relational database (PostgreSQL) or document database (MongoDB) adds hosting costs, connection pool management overhead, and increases configuration complexity.

## Decision

We decided to use **local JSON files under the `data/` folder** as the primary data storage layer, rather than utilizing an external database or backend service (such as Supabase or Prisma). 

*   `data/profile.json`: Stores profile summary, contact info, and skill arrays.
*   `data/projects.json`: Stores the array of featured portfolio projects.
*   `data/contacts.json`: Append-only storage file to record contact form submissions.

We also designed fallback writing mechanism to `/tmp/contacts.json` to handle serverless execution environments (like Vercel functions) where the project directory is read-only.

## Consequences

*   **Pros:**
    *   Zero database hosting cost, zero database configuration, and zero connection pools to manage.
    *   Data updates (projects, profile details) are version-controlled in Git, making content updates auditable.
    *   Extremely fast read access via direct Node.js filesystem API (`fs.readFileSync`).
*   **Cons:**
    *   No relational query capabilities or transactional consistency guards.
    *   Serverless runs have ephemeral filesystems; contact messages saved to `/tmp` are lost when serverless instances shut down. (A future integration can write submissions to an external storage if needed).
