import { render } from "@testing-library/react";
import { Logos3Demo } from "@/components/ui/Logos3Demo";
import { describe, it, expect, vi } from "vitest";
import React from "react";

// Mock embla-carousel-react
vi.mock("embla-carousel-react", () => {
  return {
    default: () => [vi.fn(), {
      on: vi.fn(),
      off: vi.fn(),
      scrollPrev: vi.fn(),
      scrollNext: vi.fn(),
      canScrollPrev: vi.fn().mockReturnValue(true),
      canScrollNext: vi.fn().mockReturnValue(true),
    }],
  };
});

describe("Logos3Demo Component", () => {
  it("renders without crashing", () => {
    const { container } = render(<Logos3Demo />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
