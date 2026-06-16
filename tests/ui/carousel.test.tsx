import { render, screen, fireEvent } from "@testing-library/react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import { describe, it, expect, vi } from "vitest";
import React from "react";

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

describe("Carousel UI Component", () => {
  it("renders the carousel and items correctly", () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
          <CarouselItem>Slide 2</CarouselItem>
        </CarouselContent>
        <CarouselPrevious data-testid="prev-btn" />
        <CarouselNext data-testid="next-btn" />
      </Carousel>
    );

    expect(screen.getByRole("region")).toBeInTheDocument();
    expect(screen.getByText("Slide 1")).toBeInTheDocument();
    expect(screen.getByText("Slide 2")).toBeInTheDocument();
    expect(screen.getByTestId("prev-btn")).toBeInTheDocument();
    expect(screen.getByTestId("next-btn")).toBeInTheDocument();
  });

  it("handles navigation button clicks", () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
        </CarouselContent>
        <CarouselPrevious data-testid="prev-btn" />
        <CarouselNext data-testid="next-btn" />
      </Carousel>
    );

    const prevBtn = screen.getByTestId("prev-btn");
    const nextBtn = screen.getByTestId("next-btn");

    fireEvent.click(prevBtn);
    fireEvent.click(nextBtn);
  });

  it("handles keyboard events", () => {
    const { container } = render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
        </CarouselContent>
      </Carousel>
    );

    const carousel = container.firstChild as HTMLElement;
    fireEvent.keyDown(carousel, { key: "ArrowRight" });
    fireEvent.keyDown(carousel, { key: "ArrowLeft" });
  });

  it("throws error when useCarousel is used outside provider", () => {
    // Suppress console.error output for the intentional boundary error
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const TestComponent = () => {
      return <CarouselContent>Content</CarouselContent>;
    };

    expect(() => render(<TestComponent />)).toThrow(
      "useCarousel must be used within a <Carousel />"
    );

    consoleSpy.mockRestore();
  });
});
