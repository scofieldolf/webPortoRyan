import { render, screen } from "@testing-library/react";
import ProjectCard from "@/app/components/ProjectCard";
import { describe, it, expect, vi } from "vitest";

// Mock TiltCard so it doesn't try to resolve animation values in standard render
vi.mock("./TiltCard", () => ({
  default: ({ children, className }: any) => (
    <div className={className} data-testid="tilt-card">
      {children}
    </div>
  ),
}));

describe("ProjectCard Component", () => {
  it("renders the project title, description, and list of technologies", () => {
    render(
      <ProjectCard
        title="Admin Dashboard"
        description="A control panel for system admins."
        tech={["React", "NodeJS", "ChartJS"]}
        github_url="https://github.com/admin"
        demo_url="https://admin.demo.com"
      />
    );

    expect(screen.getByText("Admin Dashboard")).toBeInTheDocument();
    expect(screen.getByText("A control panel for system admins.")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("NodeJS")).toBeInTheDocument();
    expect(screen.getByText("ChartJS")).toBeInTheDocument();

    const githubLink = screen.getByText("GitHub");
    expect(githubLink).toBeInTheDocument();
    expect(githubLink.getAttribute("href")).toBe("https://github.com/admin");

    const demoLink = screen.getByText("Demo");
    expect(demoLink).toBeInTheDocument();
    expect(demoLink.getAttribute("href")).toBe("https://admin.demo.com");
  });

  it("handles fallback layout when links are missing or placeholders", () => {
    render(
      <ProjectCard
        title="Offline App"
        description="Simple note taking app."
        tech={["HTML", "CSS"]}
        github_url="#"
        demo_url="#"
      />
    );

    expect(screen.getByText("No Code")).toBeInTheDocument();
    expect(screen.getByText("Demo Offline")).toBeInTheDocument();
  });
});
