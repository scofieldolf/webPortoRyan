import { render, screen } from "@testing-library/react";
import { Logos3 } from "@/components/ui/logos3";
import { describe, it, expect, vi } from "vitest";
import React from "react";

// Mock embla-carousel-auto-scroll
vi.mock("embla-carousel-auto-scroll", () => {
  return {
    default: vi.fn().mockReturnValue({
      name: "autoScroll",
      options: {},
      init: vi.fn(),
      destroy: vi.fn(),
    }),
  };
});

// Mock embla-carousel-react
vi.mock("embla-carousel-react", () => {
  const on = vi.fn();
  const off = vi.fn();
  const scrollPrev = vi.fn();
  const scrollNext = vi.fn();
  const canScrollPrev = vi.fn().mockReturnValue(true);
  const canScrollNext = vi.fn().mockReturnValue(true);

  const api = {
    on,
    off,
    scrollPrev,
    scrollNext,
    canScrollPrev,
    canScrollNext,
  };

  return {
    default: () => [vi.fn(), api],
  };
});

describe("Logos3 Component", () => {
  it("renders logos without a heading", () => {
    const { container } = render(<Logos3 />);
    expect(container.firstChild).toBeInTheDocument();
    // Logos should render
    const images = screen.getAllByRole("img");
    expect(images.length).toBeGreaterThan(0);
  });

  it("renders heading and custom logos list when provided", () => {
    const customLogos = [
      { id: "custom-1", description: "Custom 1", image: "/custom1.svg" },
      { id: "custom-2", description: "Custom 2", image: "/custom2.svg" },
    ];

    render(<Logos3 heading="Partners" logos={customLogos} />);
    expect(screen.getByText("Partners")).toBeInTheDocument();

    const images = screen.getAllByRole("img");
    expect(images.length).toBe(2);
    expect(screen.getByAltText("Custom 1")).toBeInTheDocument();
    expect(screen.getByAltText("Custom 2")).toBeInTheDocument();
  });
});
