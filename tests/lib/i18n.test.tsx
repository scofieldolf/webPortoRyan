import { render, screen, fireEvent } from "@testing-library/react";
import { I18nProvider, useTranslation } from "@/lib/i18n";
import { describe, it, expect, vi, beforeEach } from "vitest";
import React from "react";

const TestComponent = () => {
  const { t, locale, setLocale } = useTranslation();
  return (
    <div>
      <span data-testid="locale">{locale}</span>
      <span data-testid="text-hello">{t("hero_hello")}</span>
      <span data-testid="text-unknown">{t("non_existent_key")}</span>
      <button onClick={() => setLocale("id")} data-testid="btn-id">
        Set ID
      </button>
      <button onClick={() => setLocale("en")} data-testid="btn-en">
        Set EN
      </button>
    </div>
  );
};

describe("i18n Localization Engine", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders default locale and resolves keys", () => {
    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>
    );

    expect(screen.getByTestId("locale")).toHaveTextContent("en");
    expect(screen.getByTestId("text-hello")).toHaveTextContent("Hello, I'm");
    expect(screen.getByTestId("text-unknown")).toHaveTextContent("non_existent_key");
  });

  it("updates locale and translates text", () => {
    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>
    );

    const btnId = screen.getByTestId("btn-id");
    fireEvent.click(btnId);

    expect(screen.getByTestId("locale")).toHaveTextContent("id");
    expect(screen.getByTestId("text-hello")).toHaveTextContent("Halo, Saya");
    expect(localStorage.getItem("locale")).toBe("id");

    const btnEn = screen.getByTestId("btn-en");
    fireEvent.click(btnEn);

    expect(screen.getByTestId("locale")).toHaveTextContent("en");
    expect(screen.getByTestId("text-hello")).toHaveTextContent("Hello, I'm");
    expect(localStorage.getItem("locale")).toBe("en");
  });

  it("loads saved locale from localStorage on mount", () => {
    localStorage.setItem("locale", "id");

    render(
      <I18nProvider>
        <TestComponent />
      </I18nProvider>
    );

    expect(screen.getByTestId("locale")).toHaveTextContent("id");
    expect(screen.getByTestId("text-hello")).toHaveTextContent("Halo, Saya");
  });

  it("throws error when useTranslation is called outside provider", () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow(
      "useTranslation must be used within an I18nProvider"
    );

    consoleSpy.mockRestore();
  });
});
