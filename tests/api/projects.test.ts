import { describe, it, expect, vi, beforeEach } from "vitest";
import { GET } from "@/app/api/projects/route";
import fs from "fs";

vi.mock("fs", () => {
  const readFileSync = vi.fn();
  return {
    default: {
      readFileSync,
    },
    readFileSync,
  };
});

describe("GET /api/projects", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return projects list successfully", async () => {
    const mockData = [{ id: 1, title: "Test Project" }];
    vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(mockData));

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(mockData);
  });

  it("should handle reading error and return 500 status", async () => {
    vi.mocked(fs.readFileSync).mockImplementation(() => {
      throw new Error("Read failed");
    });

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe("Failed to load projects.");
  });
});
