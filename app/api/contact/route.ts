import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const filePath = path.join(process.cwd(), "data", "contacts.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    const contacts: object[] = JSON.parse(raw);

    contacts.push({
      name,
      email,
      message,
      created_at: new Date().toISOString(),
    });

    fs.writeFileSync(filePath, JSON.stringify(contacts, null, 2), "utf-8");

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
