import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/button";
import { describe, it, expect } from "vitest";
import React from "react";

describe("Button UI Component", () => {
  it("renders correctly with default styles", () => {
    render(<Button>Test Button</Button>);
    const button = screen.getByRole("button", { name: "Test Button" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-primary");
  });

  it("applies variant and size classes", () => {
    render(<Button variant="destructive" size="sm">Delete</Button>);
    const button = screen.getByRole("button", { name: "Delete" });
    expect(button).toHaveClass("bg-destructive");
    expect(button).toHaveClass("h-9");
  });

  it("renders as a child element when asChild is true", () => {
    render(
      <Button asChild>
        <a href="/test-url">Link Button</a>
      </Button>
    );
    const link = screen.getByRole("link", { name: "Link Button" });
    expect(link).toBeInTheDocument();
    expect(link.getAttribute("href")).toBe("/test-url");
  });
});
