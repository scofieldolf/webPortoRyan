import { render, screen, waitFor } from "@testing-library/react";
import { GooeyText } from "@/components/ui/gooey-text-morphing";
import { GooeyTextDemo } from "@/components/ui/GooeyTextDemo";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import React from "react";

describe("GooeyText Component", () => {
  let timeouts: any[] = [];

  beforeEach(() => {
    timeouts = [];
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb: any) => {
      const id = setTimeout(cb, 10);
      timeouts.push(id);
      return 1;
    });
  });

  afterEach(() => {
    timeouts.forEach(clearTimeout);
    vi.restoreAllMocks();
  });

  it("renders correctly with texts", async () => {
    const texts = ["First", "Second"];
    const { container } = render(<GooeyText texts={texts} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders GooeyTextDemo successfully", async () => {
    render(<GooeyTextDemo />);

    await waitFor(() => {
      // The text elements should be populated after a few animation loops
      expect(screen.getByText(/Design/i) || screen.getByText(/Engineering/i)).toBeInTheDocument();
    }, { timeout: 2000 });
  });
});
