import { render, screen, waitFor } from "@testing-library/react";
import Home from "@/app/page";
import { describe, it, expect, vi, beforeEach } from "vitest";
import fs from "fs";
import React from "react";

// Mock nested components to simplify page testing
vi.mock("@/app/components/ContactForm", () => ({
  default: () => <div data-testid="contact-form">Contact Form</div>,
}));

vi.mock("@/app/components/ProjectCard", () => ({
  default: ({ title }: any) => <div data-testid="project-card">{title}</div>,
}));

vi.mock("@/app/components/Navbar", () => ({
  default: ({ name }: any) => <nav data-testid="navbar">{name}</nav>,
}));

vi.mock("@/app/components/FloatingParticles", () => ({
  default: () => <div data-testid="floating-particles">Particles</div>,
}));

vi.mock("@/app/components/TiltCard", () => ({
  default: ({ children }: any) => <div data-testid="tilt-card">{children}</div>,
}));

vi.mock("@/components/ui/logos3", () => ({
  Logos3: () => <div data-testid="logos3">Logos</div>,
}));

vi.mock("@/components/ui/container-scroll-animation", () => ({
  ContainerScroll: ({ children, titleComponent }: any) => (
    <div data-testid="container-scroll">
      <div>{titleComponent}</div>
      <div>{children}</div>
    </div>
  ),
}));

vi.mock("fs", () => {
  const readFileSync = vi.fn();
  return {
    default: {
      readFileSync,
    },
    readFileSync,
  };
});

describe("Home Page (Server Component)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with mock data files successfully", async () => {
    const mockProfile = {
      name: "Ryan Viryavan",
      role: "DevOps Engineer",
      location: "Jakarta, Indonesia",
      email: "ryan@test.com",
      phone: "https://wa.me/62812345",
      github_url: "https://github.com/scofieldolf",
      linkedin_url: "https://linkedin.com/in/ryan",
      cv_url: "/my-cv.pdf",
      about_summary: "Summary info.",
      about_details: "Detail info.",
      skills: ["Docker", "Kubernetes", "AWS"],
    };

    const mockProjects = [
      {
        title: "K8s Cluster Deployer",
        description: "Deploys cluster on AWS.",
        tech: ["Bash", "Terraform"],
        github_url: "https://github.com/k8s",
        demo_url: "#",
      },
    ];

    vi.mocked(fs.readFileSync).mockImplementation((path) => {
      if (typeof path === "string" && path.includes("profile.json")) {
        return JSON.stringify(mockProfile);
      }
      if (typeof path === "string" && path.includes("projects.json")) {
        return JSON.stringify(mockProjects);
      }
      throw new Error("File not found");
    });

    const PageElement = await Home();
    render(PageElement);

    // Verify profile rendered using precise query
    expect(screen.getByRole("heading", { name: /Hello, I'm/i })).toHaveTextContent("Ryan Viryavan");
    expect(screen.getAllByText(/DevOps Engineer/i).length).toBeGreaterThan(0);

    // Verify dynamic about components content
    await waitFor(() => {
      expect(screen.getByText("Summary info.")).toBeInTheDocument();
      expect(screen.getByText("Detail info.")).toBeInTheDocument();
      expect(screen.getByText("Docker")).toBeInTheDocument();
    });

    // Verify projects rendered
    expect(screen.getByTestId("project-card")).toBeInTheDocument();
    expect(screen.getByText("K8s Cluster Deployer")).toBeInTheDocument();
  });

  it("handles file reading failures by using fallback profile", async () => {
    vi.mocked(fs.readFileSync).mockImplementation(() => {
      throw new Error("Failed to read");
    });

    const PageElement = await Home();
    render(PageElement);

    // Default fallback name
    expect(screen.getByRole("heading", { name: /Hello, I'm/i })).toHaveTextContent("Ryan");
    expect(screen.getAllByText(/Frontend Developer/i).length).toBeGreaterThan(0);
    expect(screen.getByText("NO PROJECTS REGISTERED")).toBeInTheDocument();
  });
});
