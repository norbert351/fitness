import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { email, otp } = await req.json();

  const record = await db.query.passwordResetTokens.findFirst({
    where: (r) => and(eq(r.email, email), eq(r.otp, otp)),
  });

  if (!record) {
    return new Response("Invalid OTP", { status: 404 });
  }

  if (new Date(record.expires_at).getTime() < new Date().getTime()) {
    return new Response("OTP expired", { status: 400 });
  }

  return new Response("OTP verified", { status: 200 });
}