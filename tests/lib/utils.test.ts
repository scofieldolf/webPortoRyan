import { cn } from "@/lib/utils";
import { describe, it, expect } from "vitest";

describe("cn utility function", () => {
  it("should combine class names", () => {
    expect(cn("class1", "class2")).toBe("class1 class2");
  });

  it("should handle conditional class names", () => {
    expect(cn("class1", true && "class2", false && "class3")).toBe("class1 class2");
  });

  it("should merge tailwind classes correctly", () => {
    // px-2 and px-4 should merge into px-4
    expect(cn("px-2", "px-4")).toBe("px-4");
    // text-red-500 and text-blue-500 should merge to text-blue-500
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });
});
