# Portfolio Rebuild — JSON-Based Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild Ryan's portfolio web app to use local JSON files in `/data` instead of Supabase.

**Architecture:** All dynamic content (projects list) is served from a static JSON file via a Next.js API Route. Contact form submissions are written to a `contacts.json` file (appended). The frontend is an App Router Next.js 14 single-page portfolio with Hero, About, Skills, Projects, and Contact sections.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, fs (Node.js filesystem module for JSON read/write in API routes), no external DB.

---

## File Structure

```
/c/webPortoRyan/
├── data/
│   ├── projects.json          # List of showcase projects
│   ├── profile.json           # Ryan's personal info, skills, about text
│   └── contacts.json          # Contact form submissions (appended at runtime)
├── app/
│   ├── api/
│   │   ├── projects/route.ts  # GET /api/projects — reads data/projects.json
│   │   └── contact/route.ts   # POST /api/contact — appends to data/contacts.json
│   ├── components/
│   │   ├── ContactForm.tsx    # Client component: contact form
│   │   ├── ThemeToggle.tsx    # Client component: dark/light mode toggle
│   │   └── ProjectCard.tsx    # Pure UI component: single project card
│   ├── globals.css            # Tailwind directives, global styles
│   ├── layout.tsx             # Root layout: metadata, Inter font
│   └── page.tsx               # Main page: Hero, About, Skills, Projects, Contact
├── public/
│   └── cv-ryan.pdf            # CV download (placeholder if not present)
├── tailwind.config.ts         # Accent colors defined here
├── package.json
└── tsconfig.json
```

---

## Task 1: Create JSON Data Files (content-agent)

**Files:**
- Create: `data/projects.json`
- Create: `data/profile.json`
- Create: `data/contacts.json`
- Modify: `docs/superpowers/specs/2026-06-10-backend-design.md`

- [ ] **Step 1: Create /data directory**

```bash
mkdir -p /c/webPortoRyan/data
```

- [ ] **Step 2: Create data/projects.json**

```json
[
  {
    "title": "Personal Portfolio Website",
    "description": "Website portofolio responsif yang dibangun menggunakan Next.js, Tailwind CSS, dan TypeScript.",
    "tech": ["Next.js", "TypeScript", "Tailwind CSS"],
    "github_url": "https://github.com/scofieldolf/webPortoRyan",
    "demo_url": "#"
  },
  {
    "title": "E-Commerce Dashboard",
    "description": "Dashboard admin untuk mengelola produk, transaksi, dan statistik penjualan.",
    "tech": ["React", "Chart.js", "Tailwind CSS"],
    "github_url": "#",
    "demo_url": "#"
  },
  {
    "title": "Task Management App",
    "description": "Aplikasi manajemen tugas harian dengan fitur drag-and-drop dan kategori tugas.",
    "tech": ["React", "CSS Modules", "Context API"],
    "github_url": "#",
    "demo_url": "#"
  }
]
```

- [ ] **Step 3: Create data/profile.json**

```json
{
  "name": "Ryan",
  "role": "Frontend Developer",
  "location": "Indonesia",
  "email": "ryan@example.com",
  "github_url": "https://github.com/scofieldolf",
  "linkedin_url": "https://linkedin.com/in/ryan",
  "cv_url": "/cv-ryan.pdf",
  "about_summary": "Saya adalah mahasiswa/profesional IT yang bersemangat mengembangkan website modern.",
  "about_details": "Fokus utama saya saat ini adalah mendalami ekosistem React dan Next.js.",
  "skills": ["HTML5", "CSS3", "JavaScript", "TypeScript", "React.js", "Next.js", "Tailwind CSS", "Git & GitHub", "Node.js"]
}
```

- [ ] **Step 4: Create data/contacts.json (empty array)**

```json
[]
```

- [ ] **Step 5: Commit**

```bash
git add data/
git commit -m "feat: add JSON data layer (projects, profile, contacts)"
```

---

## Task 2: Build API Routes (backend-agent)

**Files:**
- Create: `app/api/projects/route.ts`
- Modify: `app/api/contact/route.ts`
- Delete: `app/lib/supabase.ts`

- [ ] **Step 1: Create app/api/projects/route.ts**

```typescript
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "data", "projects.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    const projects = JSON.parse(raw);
    return NextResponse.json(projects);
  } catch (err) {
    console.error("Failed to read projects.json:", err);
    return NextResponse.json({ error: "Failed to load projects." }, { status: 500 });
  }
}
```

- [ ] **Step 2: Rewrite app/api/contact/route.ts**

```typescript
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Nama, email, dan pesan wajib diisi." }, { status: 400 });
    }
    const filePath = path.join(process.cwd(), "data", "contacts.json");
    const existing = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    existing.push({ name, email, message, created_at: new Date().toISOString() });
    fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), "utf-8");
    return NextResponse.json({ message: "Pesan berhasil terkirim!" }, { status: 201 });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Terjadi kesalahan pada server." }, { status: 500 });
  }
}
```

- [ ] **Step 3: Delete app/lib/supabase.ts**

```bash
rm app/lib/supabase.ts
```

- [ ] **Step 4: Remove @supabase/supabase-js from package.json**

```bash
npm uninstall @supabase/supabase-js
```

- [ ] **Step 5: Commit**

```bash
git add app/api/
git commit -m "feat: add JSON-based API routes for projects and contact form"
```

---

## Task 3: Implement Portfolio UI Components (frontend-agent)

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/layout.tsx`
- Keep: `app/components/ContactForm.tsx`
- Create: `app/components/ThemeToggle.tsx`
- Create: `app/components/ProjectCard.tsx`

- [ ] **Step 1: Create app/components/ThemeToggle.tsx**

```typescript
"use client";
import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);
  return (
    <button
      onClick={() => setDark(!dark)}
      className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle theme"
    >
      {dark ? "☀️" : "🌙"}
    </button>
  );
}
```

- [ ] **Step 2: Create app/components/ProjectCard.tsx**

```typescript
interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  github_url: string;
  demo_url: string;
}

export default function ProjectCard({ title, description, tech, github_url, demo_url }: ProjectCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300">
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
        <div className="flex flex-wrap gap-2 pt-2">
          {tech.map((t, i) => (
            <span key={i} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2.5 py-1 rounded-md font-medium">
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4 pt-6 text-sm font-semibold">
        <a href={github_url} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">GitHub</a>
        <a href={demo_url} className="text-gray-500 hover:text-gray-900 dark:hover:text-white hover:underline">Demo →</a>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Rewrite app/page.tsx to fetch from /api/projects**

See full implementation in task. Key change: replace direct Supabase calls with `fetch('/api/projects')` in a server component.

- [ ] **Step 4: Add ThemeToggle to nav in layout.tsx or page.tsx**

Add `<ThemeToggle />` to the navbar header.

- [ ] **Step 5: Ensure CV download button is in Hero section**

```tsx
<a href="/cv-ryan.pdf" download className="px-6 py-3 rounded-lg font-semibold border ...">
  Download CV
</a>
```

- [ ] **Step 6: Commit**

```bash
git commit -m "feat: implement responsive portfolio UI with dark/light mode toggle"
```

---

## Task 4: Project-Wide Audit (reviewer-agent)

- [ ] **Step 1: Run npm run build and check for errors**
- [ ] **Step 2: Run npm run lint and fix any issues**
- [ ] **Step 3: Test contact form submission (verify contacts.json is updated)**
- [ ] **Step 4: Test dark/light mode toggle**
- [ ] **Step 5: Verify Supabase is fully removed**
- [ ] **Step 6: Verify responsive design on mobile (resize browser)**
- [ ] **Step 7: Commit final changes and create summary report**
