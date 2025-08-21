import { db } from "@/db";
import { RegisterTable, verificationTokens } from "@/db/schema";
import { eq, and, lt } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    // Check if token exists and is not expired
    const [tokenRecord] = await db
      .select()
      .from(verificationTokens)
      .where(
        and(
          eq(verificationTokens.token, token),
          lt(verificationTokens.expiresAt, new Date(Date.now() + 1000 * 60 * 60)) // still valid
        )
      );

    if (!tokenRecord) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    }

    const email = tokenRecord.email;

    if (!email) {
      return NextResponse.json({ error: "Email not found in token" }, { status: 400 });
    }

    // Update user to mark email as verified
    await db
      .update(RegisterTable)
      .set({ emailVerified: new Date() })
      .where(eq(RegisterTable.email, email));

    // Optionally delete the token after use
    await db
      .delete(verificationTokens)
      .where(eq(verificationTokens.token, token));

    return NextResponse.json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Verification Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}