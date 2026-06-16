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
      headers: { "x-real-ip": "1.0.0.1" },
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
      headers: { "x-real-ip": "1.0.0.2" },
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
      headers: { "x-real-ip": "1.0.0.3" },
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
      headers: { "x-real-ip": "1.0.0.4" },
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
      headers: { "x-real-ip": "1.0.0.5" },
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
      headers: { "x-real-ip": "1.0.0.6" },
      body: "invalid-json",
    });

    // Mock json to reject/throw
    request.json = () => Promise.reject(new Error("Parse error"));

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe("An internal server error occurred.");
  });

  it("should trigger rate limiting after 5 consecutive submissions from same IP", async () => {
    vi.mocked(fs.existsSync).mockReturnValue(true);
    vi.mocked(fs.readFileSync).mockReturnValue("[]");
    vi.mocked(fs.writeFileSync).mockImplementation(() => {});

    // First 5 requests succeed
    for (let i = 0; i < 5; i++) {
      const request = new NextRequest("http://localhost/api/contact", {
        method: "POST",
        headers: { "x-real-ip": "1.2.3.4" },
        body: JSON.stringify({ name: "Ryan", email: "ryan@test.com", message: `Hi ${i}` }),
      });
      const response = await POST(request);
      expect(response.status).toBe(201);
    }

    // 6th request from same IP is rate limited
    const limitRequest = new NextRequest("http://localhost/api/contact", {
      method: "POST",
      headers: { "x-real-ip": "1.2.3.4" },
      body: JSON.stringify({ name: "Ryan", email: "ryan@test.com", message: "Hi spam" }),
    });
    const limitResponse = await POST(limitRequest);
    const limitData = await limitResponse.json();

    expect(limitResponse.status).toBe(429);
    expect(limitData.error).toBe("Too many contact submissions. Please try again later.");

    // Request from different IP still succeeds
    const otherRequest = new NextRequest("http://localhost/api/contact", {
      method: "POST",
      headers: { "x-real-ip": "5.6.7.8" },
      body: JSON.stringify({ name: "Ryan", email: "ryan@test.com", message: "Hi from friend" }),
    });
    const otherResponse = await POST(otherRequest);
    expect(otherResponse.status).toBe(201);
  });
});
