import { render, screen } from "@testing-library/react";
import RootLayout from "@/app/layout";
import { describe, it, expect, vi } from "vitest";
import React from "react";

vi.mock("next/font/google", () => {
  return {
    Inter: () => ({ variable: "sans-var" }),
    Newsreader: () => ({ variable: "serif-var" }),
    Courier_Prime: () => ({ variable: "mono-var" }),
  };
});

describe("RootLayout", () => {
  it("renders html layout with children", () => {
    const { container } = render(
      <RootLayout>
        <div data-testid="child">Layout Children</div>
      </RootLayout>
    );

    expect(screen.getByTestId("child")).toBeInTheDocument();

    // In JSDOM, rendering <html> inside the test container doesn't always put it at the root of container,
    // so we can search the HTML element or query selector.
    const html = container.querySelector("html");
    expect(html).toBeInTheDocument();
    expect(html).toHaveClass("sans-var");
    expect(html).toHaveClass("serif-var");
    expect(html).toHaveClass("mono-var");
  });
});
