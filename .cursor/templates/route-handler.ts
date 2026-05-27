/**
 * FUTURE: Use when adding src/app/api routes.
 * Requires zod (or add dependency). See marketing-api-delivery skill.
 */
import { NextRequest, NextResponse } from "next/server";
// import { z } from "zod";

// const bodySchema = z.object({
//   name: z.string().min(1).max(80),
// });

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    // const parsed = bodySchema.safeParse(payload);
    // if (!parsed.success) {
    //   return NextResponse.json(
    //     { success: false, error: "Validation failed" },
    //     { status: 400 },
    //   );
    // }

    // TODO: rate limit, Turnstile, delegate to application module
    void payload;

    return NextResponse.json(
      { success: true },
      { status: 201, headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 },
    );
  }
}
