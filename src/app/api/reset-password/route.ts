import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { NextRequest } from "next/server";
import { passwordResetTokens, RegisterTable } from "@/db/schema";

export async function POST(req: NextRequest) {
  const { email, newPassword } = await req.json();

  if (!email || !newPassword) {
    return new Response("Missing fields", { status: 400 });
  }

  const user = await db.query.RegisterTable.findFirst({
    where: (u) => eq(u.email, email),
  });

  if (!user) {
    return new Response("User not found", { status: 404 });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await db
    .update(RegisterTable)
    .set({ password: hashedPassword })
    .where(eq(RegisterTable.email, email));

  // Optional: clean up expired OTPs
  await db
    .delete(passwordResetTokens)
    .where(eq(passwordResetTokens.email, email));

  return new Response("Password reset successful", { status: 200 });
}