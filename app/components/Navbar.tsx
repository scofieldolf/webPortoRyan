"use client";

import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import { useTranslation } from "@/lib/i18n";

interface NavbarProps {
  name: string;
  cvUrl?: string;
}

export default function Navbar({ name, cvUrl }: NavbarProps) {
  const { t, locale, setLocale } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = ["about", "projects", "skills", "contact"];
    const handleScroll = () => {
      // 1. Header scroll detection
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // 2. Active section detection
      const scrollPosition = window.scrollY + 160; // offset for navbar height + buffer
      let currentSection = "";

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentSection = section;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Run initially
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "glass-panel border-b border-primary/10 shadow-sm py-2"
          : "bg-transparent border-b border-transparent py-4"
      }`}
    >
      <nav className="mx-auto max-w-5xl px-6 flex flex-col md:flex-row md:items-center md:justify-between gap-0">
        <div className="flex items-center justify-between w-full md:w-auto">
          <a
            href="#"
            className="flex items-center gap-1.5 text-xl font-bold tracking-tight text-primary hover:opacity-80 transition-opacity group"
          >
            <span className="text-xs font-mono text-primary/70 mr-0.5">[SYS]</span>
            <span className="flex items-center font-mono select-none">
              <span className="text-xl font-black">r</span>
              <span
                className={`overflow-hidden transition-all duration-500 ease-in-out whitespace-nowrap inline-block ${
                  isScrolled
                    ? "max-w-0 opacity-0 group-hover:max-w-[120px] group-hover:opacity-100 group-hover:ml-0.5"
                    : "max-w-[120px] opacity-100 ml-0.5"
                }`}
              >
                yanDevOps
              </span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-0.5" />
          </a>

          <div className="flex items-center gap-4 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-muted-foreground hover:text-primary focus:outline-none transition-colors"
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

        {/* Collapsible Navigation Menu */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out
            md:flex md:flex-row md:items-center md:gap-8 md:w-auto md:h-auto md:opacity-100 md:translate-y-0
            flex flex-col items-start w-full text-sm font-mono text-muted-foreground
            ${
              isOpen
                ? "max-h-[350px] opacity-100 translate-y-0 mt-4 pb-4 border-t border-border/50 md:border-none pt-4 md:pt-0"
                : "max-h-0 opacity-0 -translate-y-2 pointer-events-none md:pointer-events-auto md:mt-0 md:max-h-none"
            }
          `}
        >
          <a
            href="#about"
            onClick={() => setIsOpen(false)}
            className={`transition-colors py-2 md:py-0 w-full md:w-auto border-b border-border/50 md:border-none flex items-center ${
              activeSection === "about" ? "text-primary font-bold" : "hover:text-primary"
            }`}
          >
            <span>{t("nav_about")}</span>
          </a>
          <a
            href="#projects"
            onClick={() => setIsOpen(false)}
            className={`transition-colors py-2 md:py-0 w-full md:w-auto border-b border-border/50 md:border-none flex items-center ${
              activeSection === "projects" ? "text-primary font-bold" : "hover:text-primary"
            }`}
          >
            <span>{t("nav_projects")}</span>
          </a>
          <a
            href="#skills"
            onClick={() => setIsOpen(false)}
            className={`transition-colors py-2 md:py-0 w-full md:w-auto border-b border-border/50 md:border-none flex items-center ${
              activeSection === "skills" ? "text-primary font-bold" : "hover:text-primary"
            }`}
          >
            <span>{t("nav_skills")}</span>
          </a>
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className={`transition-colors py-2 md:py-0 w-full md:w-auto border-b border-border/50 md:border-none flex items-center ${
              activeSection === "contact" ? "text-primary font-bold" : "hover:text-primary"
            }`}
          >
            <span>{t("nav_contact")}</span>
          </a>

          {/* Action Area (Desktop: Sidebar Divider + CV Button + ThemeToggle, Mobile: Column CV Button) */}
          <div className="w-full md:w-auto md:flex items-center md:gap-4 md:border-l md:border-border md:pl-4 mt-4 md:mt-0">
            <a
              href={cvUrl || "/cv-ryan.pdf"}
              download
              className="w-full md:w-auto inline-flex items-center justify-center px-4 py-2 rounded-xl border border-primary/20 hover:border-primary/45 text-primary hover:bg-primary/5 transition-all text-xs font-semibold select-none shadow-sm shadow-primary/5 active:scale-95"
            >
              {t("nav_cv")}
            </a>
            <div className="hidden md:block">
              <ThemeToggle />
            </div>

            {/* Language Switcher */}
            <div className="flex items-center gap-1.5 font-mono text-xs mt-2 md:mt-0">
              <button
                onClick={() => setLocale("en")}
                className={`px-2 py-1 rounded transition-colors ${
                  locale === "en" ? "bg-primary text-primary-foreground font-bold" : "hover:text-primary text-muted-foreground"
                }`}
                aria-label="Set language to English"
              >
                EN
              </button>
              <span className="text-border">/</span>
              <button
                onClick={() => setLocale("id")}
                className={`px-2 py-1 rounded transition-colors ${
                  locale === "id" ? "bg-primary text-primary-foreground font-bold" : "hover:text-primary text-muted-foreground"
                }`}
                aria-label="Set bahasa ke Indonesia"
              >
                ID
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
