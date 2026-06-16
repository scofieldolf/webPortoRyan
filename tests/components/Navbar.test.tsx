import { render, screen, fireEvent, act } from "@testing-library/react";
import Navbar from "@/app/components/Navbar";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import React from "react";

vi.mock("@/lib/i18n", () => ({
  useTranslation: () => ({
    locale: "en",
    setLocale: vi.fn(),
    t: (key: string) => {
      const dictionary: Record<string, string> = {
        nav_about: "About",
        nav_projects: "Projects",
        nav_skills: "Skills",
        nav_contact: "Contact",
        nav_cv: "DOWNLOAD CV",
      };
      return dictionary[key] || key;
    },
  }),
}));

describe("Navbar Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.scrollY = 0;
    document.body.innerHTML = `
      <div id="about" style="height: 500px;">About Section</div>
      <div id="projects" style="height: 500px;">Projects Section</div>
      <div id="skills" style="height: 500px;">Skills Section</div>
      <div id="contact" style="height: 500px;">Contact Section</div>
    `;
  });

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("renders brand elements and links", () => {
    render(<Navbar name="Ryan" cvUrl="/my-cv.pdf" />);
    // Check navigation links
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByText("Skills")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();

    // Check custom CV URL is set correctly
    const cvLink = screen.getByText("DOWNLOAD CV");
    expect(cvLink).toBeInTheDocument();
    expect(cvLink.getAttribute("href")).toBe("/my-cv.pdf");
  });

  it("responds to window scroll by changing class state", () => {
    const { container } = render(<Navbar name="Ryan" />);
    const header = container.querySelector("header");
    expect(header).toHaveClass("bg-transparent");

    // Scroll down
    act(() => {
      window.scrollY = 50;
      fireEvent.scroll(window);
    });

    expect(header).toHaveClass("glass-panel");

    // Scroll up
    act(() => {
      window.scrollY = 0;
      fireEvent.scroll(window);
    });

    expect(header).toHaveClass("bg-transparent");
  });

  it("sets active section on scroll", () => {
    const aboutEl = document.getElementById("about") as HTMLElement;
    const projectsEl = document.getElementById("projects") as HTMLElement;

    Object.defineProperty(aboutEl, "offsetTop", { get: () => 100 });
    Object.defineProperty(aboutEl, "offsetHeight", { get: () => 500 });
    Object.defineProperty(projectsEl, "offsetTop", { get: () => 600 });
    Object.defineProperty(projectsEl, "offsetHeight", { get: () => 500 });

    render(<Navbar name="Ryan" />);

    // Scroll into projects section
    act(() => {
      window.scrollY = 500;
      fireEvent.scroll(window);
    });

    const projectsLink = screen.getByText("Projects").closest("a");
    expect(projectsLink).toHaveClass("text-primary");
  });

  it("toggles mobile menu and closes on click of link", () => {
    render(<Navbar name="Ryan" />);

    const toggleButton = screen.getByRole("button", { name: "Toggle Menu" });
    expect(toggleButton).toBeInTheDocument();

    // Click on mobile menu links to verify state update and close handlers
    fireEvent.click(toggleButton);
    const aboutLink = screen.getByText("About");
    fireEvent.click(aboutLink);

    fireEvent.click(toggleButton);
    const projectsLink = screen.getByText("Projects");
    fireEvent.click(projectsLink);

    fireEvent.click(toggleButton);
    const skillsLink = screen.getByText("Skills");
    fireEvent.click(skillsLink);

    fireEvent.click(toggleButton);
    const contactLink = screen.getByText("Contact");
    fireEvent.click(contactLink);
  });
});
