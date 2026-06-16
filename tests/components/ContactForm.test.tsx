import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ContactForm from "@/app/components/ContactForm";
import { describe, it, expect, vi, beforeEach } from "vitest";

describe("ContactForm Component", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  it("renders the initial form fields", () => {
    render(<ContactForm />);

    expect(screen.getByPlaceholderText("Your Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("your.email@example.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Write your message...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Send Message" })).toBeInTheDocument();
  });

  it("allows typing into the form fields", () => {
    render(<ContactForm />);

    const nameInput = screen.getByPlaceholderText("Your Name") as HTMLInputElement;
    const emailInput = screen.getByPlaceholderText("your.email@example.com") as HTMLInputElement;
    const messageInput = screen.getByPlaceholderText("Write your message...") as HTMLTextAreaElement;

    fireEvent.change(nameInput, { target: { value: "Ryan" } });
    fireEvent.change(emailInput, { target: { value: "ryan@test.com" } });
    fireEvent.change(messageInput, { target: { value: "Hello, this is a test message." } });

    expect(nameInput.value).toBe("Ryan");
    expect(emailInput.value).toBe("ryan@test.com");
    expect(messageInput.value).toBe("Hello, this is a test message.");
  });

  it("submits contact message successfully and clears inputs", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ message: "Success!" }),
    });
    vi.stubGlobal("fetch", fetchMock);

    render(<ContactForm />);

    const nameInput = screen.getByPlaceholderText("Your Name");
    const emailInput = screen.getByPlaceholderText("your.email@example.com");
    const messageInput = screen.getByPlaceholderText("Write your message...");
    const submitBtn = screen.getByRole("button", { name: "Send Message" });

    fireEvent.change(nameInput, { target: { value: "Ryan" } });
    fireEvent.change(emailInput, { target: { value: "ryan@test.com" } });
    fireEvent.change(messageInput, { target: { value: "Hi there" } });

    fireEvent.click(submitBtn);

    // Should render loading state
    expect(screen.getByText("Sending...")).toBeInTheDocument();

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock).toHaveBeenCalledWith("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Ryan", email: "ryan@test.com", message: "Hi there" }),
      });
    });

    // Check success status message is rendered
    expect(screen.getByText(/sent successfully/i)).toBeInTheDocument();

    // Check fields are cleared
    expect((nameInput as HTMLInputElement).value).toBe("");
    expect((emailInput as HTMLInputElement).value).toBe("");
    expect((messageInput as HTMLTextAreaElement).value).toBe("");
  });

  it("handles server side error and shows error status message", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: "Server crashed." }),
    });
    vi.stubGlobal("fetch", fetchMock);

    render(<ContactForm />);

    const nameInput = screen.getByPlaceholderText("Your Name");
    const emailInput = screen.getByPlaceholderText("your.email@example.com");
    const messageInput = screen.getByPlaceholderText("Write your message...");
    const submitBtn = screen.getByRole("button", { name: "Send Message" });

    fireEvent.change(nameInput, { target: { value: "Ryan" } });
    fireEvent.change(emailInput, { target: { value: "ryan@test.com" } });
    fireEvent.change(messageInput, { target: { value: "Hi there" } });

    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText("Server crashed.")).toBeInTheDocument();
    });

    // Inputs should NOT be cleared on error
    expect((nameInput as HTMLInputElement).value).toBe("Ryan");
  });

  it("handles catch block errors gracefully", async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error("Network connection lost."));
    vi.stubGlobal("fetch", fetchMock);

    render(<ContactForm />);

    const nameInput = screen.getByPlaceholderText("Your Name");
    const emailInput = screen.getByPlaceholderText("your.email@example.com");
    const messageInput = screen.getByPlaceholderText("Write your message...");
    const submitBtn = screen.getByRole("button", { name: "Send Message" });

    fireEvent.change(nameInput, { target: { value: "Ryan" } });
    fireEvent.change(emailInput, { target: { value: "ryan@test.com" } });
    fireEvent.change(messageInput, { target: { value: "Hi there" } });

    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText("Network connection lost.")).toBeInTheDocument();
    });
  });
});
