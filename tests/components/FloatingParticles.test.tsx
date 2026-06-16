import { render } from "@testing-library/react";
import FloatingParticles from "@/app/components/FloatingParticles";
import { describe, it, expect, vi } from "vitest";

// Mock framer-motion to render div statically
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, className, style, ...props }: any) => (
      <div className={className} style={style} {...props} data-testid="motion-div">
        {children}
      </div>
    ),
  },
}));

describe("FloatingParticles Component", () => {
  it("renders particles container and all 15 particles", () => {
    const { container } = render(<FloatingParticles />);
    expect(container.firstChild).toBeInTheDocument();

    const particles = container.querySelectorAll("[data-testid='motion-div']");
    expect(particles.length).toBe(15);
  });
});
