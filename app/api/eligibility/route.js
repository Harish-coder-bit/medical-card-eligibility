import { NextResponse } from "next/server";
import { createSubmission, getAllSubmissions } from "@/services/eligibility";
import { eligibilitySchema } from "@/schemas/eligibility";

export async function POST(request) {
  try {
    const body = await request.json();

    const result = eligibilitySchema.safeParse(body);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      return NextResponse.json(
        { error: "Validation failed.", fieldErrors },
        { status: 400 }
      );
    }

    const submission = createSubmission(result.data);

    return NextResponse.json(
      { message: "Application submitted successfully.", submission },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ submissions: getAllSubmissions() });
}
