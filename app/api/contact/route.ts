import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

interface ContactMessage {
  name: string;
  email: string;
  message: string;
  created_at: string;
}

// In-memory rate limiter cache
const ipCache = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5; // max 5 submissions per minute per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = ipCache.get(ip) || [];

  // Filter out timestamps older than the rate limit window
  const activeTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (activeTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  activeTimestamps.push(now);
  ipCache.set(ip, activeTimestamps);
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "127.0.0.1";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many contact submissions. Please try again later." },
        { status: 429 }
      );
    }

    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    let filePath = path.join(process.cwd(), "data", "contacts.json");
    let raw = "[]";
    try {
      if (fs.existsSync(filePath)) {
        raw = fs.readFileSync(filePath, "utf-8");
      }
    } catch (e) {
      filePath = path.join("/tmp", "contacts.json");
      if (fs.existsSync(filePath)) {
        raw = fs.readFileSync(filePath, "utf-8");
      }
    }

    const contacts: ContactMessage[] = JSON.parse(raw || "[]");

    contacts.push({
      name,
      email,
      message,
      created_at: new Date().toISOString(),
    });

    try {
      fs.writeFileSync(filePath, JSON.stringify(contacts, null, 2), "utf-8");
    } catch (writeErr) {
      // Fallback to /tmp in read-only environments like Vercel
      const tmpPath = path.join("/tmp", "contacts.json");
      try {
        let tmpRaw = "[]";
        if (fs.existsSync(tmpPath)) {
          tmpRaw = fs.readFileSync(tmpPath, "utf-8");
        }
        const tmpContacts: ContactMessage[] = JSON.parse(tmpRaw || "[]");
        tmpContacts.push({
          name,
          email,
          message,
          created_at: new Date().toISOString(),
        });
        fs.writeFileSync(tmpPath, JSON.stringify(tmpContacts, null, 2), "utf-8");
      } catch (tmpErr) {
        console.error("Failed to write contact message to /tmp:", tmpErr);
      }
    }

    return NextResponse.json(
      { message: "Message sent successfully!" },
      { status: 201 }
    );
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "An internal server error occurred." },
      { status: 500 }
    );
  }
}
