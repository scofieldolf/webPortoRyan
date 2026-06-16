import { render, screen, fireEvent } from "@testing-library/react";
import TiltCard from "@/app/components/TiltCard";
import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";

// Mock framer-motion hooks and components
vi.mock("framer-motion", () => {
  const React = require("react");
  const setMock = vi.fn();
  const getMock = vi.fn().mockReturnValue(0);

  return {
    motion: {
      div: React.forwardRef(({ children, className, style, ...props }: any, ref: any) => {
        const resolvedStyle = { ...style };
        if (style && typeof style.transform === "object" && "get" in style.transform) {
          resolvedStyle.transform = style.transform.get();
        }
        return (
          <div ref={ref} className={className} style={resolvedStyle} {...props}>
            {children}
          </div>
        );
      }),
    },
    useMotionValue: () => ({
      set: setMock,
      get: getMock,
    }),
    useSpring: (value: any) => value,
    useTransform: (value: any, input?: any, output?: any) => {
      if (typeof value === "function") {
        return { get: () => value([0, 0]) };
      }
      return { get: () => (output ? output[0] : "") };
    },
  };
});

describe("TiltCard Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Default to desktop width
    window.innerWidth = 1024;
  });

  it("renders children successfully", () => {
    render(
      <TiltCard>
        <div data-testid="card-child">Hello Card</div>
      </TiltCard>
    );

    expect(screen.getByTestId("card-child")).toBeInTheDocument();
  });

  it("adds resize event listener on mount and updates layout state", () => {
    const addSpy = vi.spyOn(window, "addEventListener");
    const removeSpy = vi.spyOn(window, "removeEventListener");

    const { unmount } = render(
      <TiltCard>
        <div>Content</div>
      </TiltCard>
    );

    expect(addSpy).toHaveBeenCalledWith("resize", expect.any(Function));

    unmount();
    expect(removeSpy).toHaveBeenCalledWith("resize", expect.any(Function));
  });

  it("handles mouse actions in desktop mode", () => {
    // Set desktop width
    window.innerWidth = 1024;

    const { container } = render(
      <TiltCard>
        <div>Content</div>
      </TiltCard>
    );

    const cardElement = container.firstChild as HTMLElement;
    expect(cardElement).toBeInTheDocument();

    // Mock getBoundingClientRect
    cardElement.getBoundingClientRect = () => ({
      width: 200,
      height: 200,
      left: 0,
      top: 0,
      right: 200,
      bottom: 200,
      x: 0,
      y: 0,
      toJSON: () => {},
    });

    // Trigger mouse enter
    fireEvent.mouseEnter(cardElement);

    // Mouse move
    fireEvent.mouseMove(cardElement, { clientX: 50, clientY: 50 });

    // Mouse leave
    fireEvent.mouseLeave(cardElement);
  });

  it("bypasses tilt effects in mobile mode", () => {
    // Set mobile width
    window.innerWidth = 500;

    const { container } = render(
      <TiltCard>
        <div>Content</div>
      </TiltCard>
    );

    const cardElement = container.firstChild as HTMLElement;

    // Mouse movements shouldn't set motion values when on mobile
    fireEvent.mouseEnter(cardElement);
    fireEvent.mouseMove(cardElement, { clientX: 50, clientY: 50 });
    expect(cardElement.style.transform).toBe("none");
  });
});
