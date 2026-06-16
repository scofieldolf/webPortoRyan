import { render, screen } from "@testing-library/react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { describe, it, expect, vi } from "vitest";
import React from "react";

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

describe("ContainerScroll Component", () => {
  it("renders correctly with title and children", () => {
    render(
      <ContainerScroll titleComponent={<h1 data-testid="title">Scrolling Page</h1>}>
        <div data-testid="child-element">Interactive Inner App</div>
      </ContainerScroll>
    );

    expect(screen.getByTestId("title")).toBeInTheDocument();
    expect(screen.getByTestId("child-element")).toBeInTheDocument();
  });
});
