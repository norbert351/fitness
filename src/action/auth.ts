"use server"
import { eq, and, gt } from 'drizzle-orm';
import crypto from 'crypto';
import { passwordResetTokens, RegisterTable } from '@/db/schema';
import { hash } from 'bcryptjs';
import { db } from '@/db';

// Generate 6-digit numeric token
function generateResetToken(): string {
  return crypto.randomInt(100000, 999999).toString();
}

export async function createPasswordResetToken(email: string) {
  const user = await db.select()
    .from(RegisterTable)
    .where(eq(RegisterTable.email, email))
    .limit(1);
  
  if (!user[0]) throw new Error('User not found');

  const token = generateResetToken();
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 1);

  await db.insert(passwordResetTokens).values({
    user_id: user[0].id,
    token,
    expires_at: expiresAt
  });

  // In a real app, implement your email sending logic here
  console.log(`Password reset token for ${email}: ${token}`);
  
  return { success: true };
}

export async function verifyResetToken(email: string, token: string) {
  const user = await db.select()
    .from(RegisterTable)
    .where(eq(RegisterTable.email, email))
    .limit(1);
  
  if (!user[0]) throw new Error('User not found');

  const now = new Date();
  const tokenRecord = await db.select()
    .from(passwordResetTokens)
    .where(
      and(
        eq(passwordResetTokens.user_id, user[0].id),
        eq(passwordResetTokens.token, token),
        gt(passwordResetTokens.expires_at, now)
      ))
    .limit(1);

  if (!tokenRecord[0]) throw new Error('Invalid or expired token');

  return { valid: true, userId: user[0].id };
}

export async function resetPassword(userId: number, newPassword: string) {
  const hashedPassword = await hash(newPassword, 10);
  
  await db.update(RegisterTable)
    .set({ password: hashedPassword })
    .where(eq(RegisterTable.id, userId));

  await db.delete(passwordResetTokens)
    .where(eq(passwordResetTokens.user_id, userId));

  return { success: true };
}