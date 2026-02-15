import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    const validUser = process.env.ADMIN_USER || "admin";
    const validPassword = process.env.ADMIN_PASSWORD || "admin123";

    if (username === validUser && password === validPassword) {
      return NextResponse.json({ authenticated: true });
    }

    return NextResponse.json(
      { error: "Invalid credentials." },
      { status: 401 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 }
    );
  }
}
