"use client";

import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

interface NavbarProps {
  name: string;
}

export default function Navbar({ name }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-indigo-500/10">
      <nav className="mx-auto max-w-5xl px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0">
        <div className="flex items-center justify-between w-full md:w-auto">
          <a href="#" className="flex items-center gap-2 text-xl font-bold tracking-tight text-indigo-400 hover:text-indigo-300 transition-colors">
            <span className="text-xs font-mono text-indigo-500">[SYS]</span>
            <span>{name.toUpperCase()}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </a>

          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-400 hover:text-indigo-400 focus:outline-none transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <div
          className={`${
            isOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 w-full md:w-auto text-sm font-mono text-gray-400`}
        >
          <a
            href="#about"
            onClick={() => setIsOpen(false)}
            className="hover:text-indigo-400 transition-colors py-2 md:py-0 w-full md:w-auto border-b border-indigo-500/5 md:border-none group flex items-center gap-1"
          >
            <span className="text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">{"//"}</span>
            <span>About</span>
          </a>
          <a
            href="#projects"
            onClick={() => setIsOpen(false)}
            className="hover:text-indigo-400 transition-colors py-2 md:py-0 w-full md:w-auto border-b border-indigo-500/5 md:border-none group flex items-center gap-1"
          >
            <span className="text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">{"//"}</span>
            <span>Projects</span>
          </a>
          <a
            href="#skills"
            onClick={() => setIsOpen(false)}
            className="hover:text-indigo-400 transition-colors py-2 md:py-0 w-full md:w-auto border-b border-indigo-500/5 md:border-none group flex items-center gap-1"
          >
            <span className="text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">{"//"}</span>
            <span>Skills</span>
          </a>
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="hover:text-indigo-400 transition-colors py-2 md:py-0 w-full md:w-auto md:border-none group flex items-center gap-1"
          >
            <span className="text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">{"//"}</span>
            <span>Contact</span>
          </a>

          <div className="hidden md:block border-l border-indigo-500/10 pl-4">
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}
