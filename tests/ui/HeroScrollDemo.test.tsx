import { render, screen } from "@testing-library/react";
import { HeroScrollDemo } from "@/components/ui/HeroScrollDemo";
import { describe, it, expect, vi } from "vitest";
import React from "react";

// Mock Next.js Image component
vi.mock("next/image", () => ({
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
}));

// Mock framer-motion
vi.mock("framer-motion", () => {
  return {
    motion: {
      div: ({ children, className, style, ...props }: any) => {
        return (
          <div className={className} style={style} {...props}>
            {children}
          </div>
        );
      },
    },
    useScroll: () => ({
      scrollYProgress: { get: () => 0.5 },
    }),
    useTransform: (val: any, input: any, output: any) => {
      return { get: () => output[0] };
    },
  };
});

describe("HeroScrollDemo Component", () => {
  it("renders correctly with heading and images", () => {
    render(<HeroScrollDemo />);
    expect(screen.getByText("Visual Presentation")).toBeInTheDocument();
    expect(screen.getByAltText("Developer Workspace Mockup")).toBeInTheDocument();
  });
});
