import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST } from "@/app/api/contact/route";
import fs from "fs";
import { NextRequest } from "next/server";

vi.mock("fs", () => {
  const existsSync = vi.fn();
  const readFileSync = vi.fn();
  const writeFileSync = vi.fn();
  return {
    default: {
      existsSync,
      readFileSync,
      writeFileSync,
    },
    existsSync,
    readFileSync,
    writeFileSync,
  };
});

describe("POST /api/contact", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return 400 if fields are missing", async () => {
    const request = new NextRequest("http://localhost/api/contact", {
      method: "POST",
      body: JSON.stringify({ name: "", email: "", message: "" }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("Name, email, and message are required.");
  });

  it("should save contact message successfully to main file path", async () => {
    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(fs.readFileSync).mockReturnValue("[]");
    vi.mocked(fs.writeFileSync).mockImplementation(() => {});

    const request = new NextRequest("http://localhost/api/contact", {
      method: "POST",
      body: JSON.stringify({ name: "Ryan", email: "ryan@test.com", message: "Hi" }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.message).toBe("Message sent successfully!");
    expect(fs.writeFileSync).toHaveBeenCalled();
  });

  it("should fallback to /tmp if reading file throws error", async () => {
    vi.mocked(fs.existsSync).mockImplementation((path) => {
      if (typeof path === "string" && path.includes("tmp")) return true;
      return true;
    });
    vi.mocked(fs.readFileSync).mockImplementation((path) => {
      if (typeof path === "string" && !path.includes("tmp")) {
        throw new Error("Read main failed");
      }
      return "[]";
    });

    const request = new NextRequest("http://localhost/api/contact", {
      method: "POST",
      body: JSON.stringify({ name: "Ryan", email: "ryan@test.com", message: "Hi" }),
    });

    const response = await POST(request);
    expect(response.status).toBe(201);
  });

  it("should handle write failure to main path by fallback to /tmp", async () => {
    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(fs.readFileSync).mockReturnValue("[]");

    // Throw on main file write, succeed on /tmp write
    vi.mocked(fs.writeFileSync).mockImplementation((path) => {
      if (typeof path === "string" && !path.includes("tmp")) {
        throw new Error("Write permission denied");
      }
    });

    const request = new NextRequest("http://localhost/api/contact", {
      method: "POST",
      body: JSON.stringify({ name: "Ryan", email: "ryan@test.com", message: "Hi" }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.message).toBe("Message sent successfully!");
  });

  it("should handle write failure to both main path and /tmp path gracefully", async () => {
    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(fs.readFileSync).mockReturnValue("[]");

    // Throw on all writes
    vi.mocked(fs.writeFileSync).mockImplementation(() => {
      throw new Error("Disk full");
    });

    const request = new NextRequest("http://localhost/api/contact", {
      method: "POST",
      body: JSON.stringify({ name: "Ryan", email: "ryan@test.com", message: "Hi" }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.message).toBe("Message sent successfully!");
  });

  it("should return 500 status when request json parsing completely throws error", async () => {
    const request = new NextRequest("http://localhost/api/contact", {
      method: "POST",
      body: "invalid-json",
    });

    // Mock json to reject/throw
    request.json = () => Promise.reject(new Error("Parse error"));

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe("An internal server error occurred.");
  });
});
