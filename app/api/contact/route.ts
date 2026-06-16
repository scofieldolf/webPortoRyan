import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

interface ContactMessage {
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export async function POST(req: NextRequest) {
  try {
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
