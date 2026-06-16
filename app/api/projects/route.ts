import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "data", "projects.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    const projects = JSON.parse(raw);
    return NextResponse.json(projects);
  } catch (err: unknown) {
    console.error("Failed to read projects.json:", err);
    return NextResponse.json(
      { error: "Failed to load projects." },
      { status: 500 }
    );
  }
}
