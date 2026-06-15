"use client";

import TiltCard from "./TiltCard";

interface Project {
  title: string;
  description: string;
  tech: string[];
  github_url: string;
  demo_url: string;
}

export default function ProjectCard({
  title,
  description,
  tech,
  github_url,
  demo_url,
}: Project) {
  const hasGithub = github_url && github_url !== "#";
  const hasDemo = demo_url && demo_url !== "#";

  return (
    <TiltCard className="h-full">
      <div className="h-full group bg-card rounded-2xl border border-border p-6 flex flex-col justify-between transition-all duration-300">
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-card-foreground group-hover:text-primary transition-colors duration-200">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 pt-2">
          {tech.map((t, i) => (
            <span
              key={i}
              className="text-xs bg-muted text-muted-foreground border border-border px-2.5 py-1 rounded-lg font-medium"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 pt-6 text-sm font-semibold">
        {hasGithub ? (
          <a
            href={github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5"
          >
            {/* Simple Inline GitHub SVG */}
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
            GitHub
          </a>
        ) : (
          <span className="text-muted-foreground/50 cursor-not-allowed flex items-center gap-1.5">
            No Code
          </span>
        )}

        {hasDemo ? (
          <a
            href={demo_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:opacity-80 hover:underline flex items-center gap-1"
          >
            Demo
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-3.5 h-3.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
              />
            </svg>
          </a>
        ) : (
          <span className="text-muted-foreground/60 flex items-center gap-1">
            Demo Offline
          </span>
        )}
      </div>
    </div>
    </TiltCard>
  );
}
