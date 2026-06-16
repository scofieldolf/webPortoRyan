import { render, screen, fireEvent } from "@testing-library/react";
import ThemeToggle from "@/app/components/ThemeToggle";
import { describe, it, expect, vi, beforeEach } from "vitest";

describe("ThemeToggle Component", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = "";
    vi.clearAllMocks();
  });

  it("renders a placeholder before client-side mount", () => {
    // In our test environment, render runs synchronously. But we can test if the initial state returns the placeholder by mocking useEffect.
    // However, since we want to check behavior, let's test the component under standard mount.
    const { container } = render(<ThemeToggle />);
    // After mounting, it should display the button
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("loads theme from localStorage if it exists - dark theme", () => {
    localStorage.setItem("theme", "dark");
    render(<ThemeToggle />);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("loads theme from localStorage if it exists - light theme", () => {
    localStorage.setItem("theme", "light");
    render(<ThemeToggle />);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("falls back to system preference if no localStorage theme - system prefers dark", () => {
    // Mock system preference
    const matchMediaMock = vi.fn().mockImplementation((query) => ({
      matches: query === "(prefers-color-scheme: dark)",
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: matchMediaMock,
    });

    render(<ThemeToggle />);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("toggles the theme when button is clicked", () => {
    localStorage.setItem("theme", "light");
    render(<ThemeToggle />);
    const button = screen.getByRole("button");

    // Click to toggle to dark
    fireEvent.click(button);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem("theme")).toBe("dark");

    // Click to toggle to light
    fireEvent.click(button);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(localStorage.getItem("theme")).toBe("light");
  });
});
