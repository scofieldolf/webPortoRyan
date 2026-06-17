"use client";

import React from "react";
import Link from "next/link";

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary">
      {/* Top minimal header */}
      <header className="border-b border-border bg-card/50 backdrop-blur px-6 py-4 sticky top-0 z-50 flex items-center justify-between">
        <Link href="/" className="text-lg font-bold tracking-tight hover:text-primary transition-colors">
          Ryan Portfolio
        </Link>
        <Link
          href="/#projects"
          className="text-sm font-semibold font-mono text-muted-foreground hover:text-primary flex items-center gap-1.5 transition-colors border border-border px-3 py-1.5 rounded-lg bg-muted/20"
        >
          ← Back to Portfolio
        </Link>
      </header>
      <main className="max-w-5xl mx-auto px-6 py-10">
        {children}
      </main>
    </div>
  );
}
