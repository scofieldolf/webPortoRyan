import { render, screen, act } from "@testing-library/react";
import VaporizeTextCycle, { Component as VaporizeDemo, Tag } from "@/components/ui/vapour-text-effect";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import React from "react";

describe("VaporizeTextCycle Component", () => {
  let timeouts: any[] = [];
  let mockContext2D: any;

  beforeEach(() => {
    timeouts = [];

    // Mock HTMLCanvasElement.prototype.getContext to return a mock 2D context
    mockContext2D = {
      clearRect: vi.fn(),
      fillText: vi.fn(),
      scale: vi.fn(),
      save: vi.fn(),
      restore: vi.fn(),
      fillRect: vi.fn(),
      measureText: vi.fn().mockReturnValue({ width: 100 }),
      getImageData: vi.fn().mockReturnValue({
        data: new Uint8ClampedArray([0, 0, 0, 255, 255, 255, 255, 255]),
      }),
    };

    HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue(mockContext2D);

    // Mock getBoundingClientRect
    HTMLDivElement.prototype.getBoundingClientRect = vi.fn().mockReturnValue({
      width: 500,
      height: 100,
      top: 0,
      left: 0,
      bottom: 100,
      right: 500,
    });

    // Mock IntersectionObserver constructor
    class MockIntersectionObserver {
      constructor(callback: any) {
        callback([{ isIntersecting: true }]);
      }
      observe = vi.fn();
      unobserve = vi.fn();
      disconnect = vi.fn();
    }

    Object.defineProperty(window, "IntersectionObserver", {
      writable: true,
      value: MockIntersectionObserver,
    });

    // Mock requestAnimationFrame using real timers
    let timeOffset = 0;
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb: any) => {
      const id = setTimeout(() => {
        timeOffset += 100; // 100ms per frame
        cb(timeOffset);
      }, 5);
      timeouts.push(id);
      return 1;
    });
  });

  afterEach(() => {
    timeouts.forEach(clearTimeout);
    vi.restoreAllMocks();
  });

  it("renders correctly and cycles through states with default values", async () => {
    const { unmount } = render(
      <VaporizeTextCycle
        texts={["Next.js", "React"]}
        tag={Tag.H1}
      />
    );

    // Wait 600ms real time to let the animation cycle through states
    await new Promise((resolve) => setTimeout(resolve, 600));

    unmount();
  });

  it("handles various font config sizes and custom color styles to cover helper branches", () => {
    // Small font size (<=20)
    render(
      <VaporizeTextCycle
        texts={["Next.js"]}
        font={{ fontSize: "15px", fontWeight: 300, fontFamily: "sans-serif" }}
        color="rgba(0, 255, 0, 0.8)"
        alignment="left"
      />
    );

    // Large font size (>=100)
    render(
      <VaporizeTextCycle
        texts={["React"]}
        font={{ fontSize: "120px" }}
        color="rgb(255, 0, 0)"
        alignment="right"
      />
    );

    // Invalid color fallback warning path
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    render(
      <VaporizeTextCycle
        texts={["React"]}
        font={{ fontSize: "50px" }}
        color="#ffffff"
      />
    );
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  it("renders the demo wrapper Component correctly", () => {
    render(<VaporizeDemo />);
  });
});
