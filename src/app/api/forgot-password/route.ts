import { db } from '@/db';
import { RegisterTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 12;

export async function findUserByEmail(email: string) {
  const [user] = await db.select()
    .from(RegisterTable)
    .where(eq(RegisterTable.email, email));
  return user;
}

export async function updateUserPassword(userId: number, newPassword: string): Promise<void> {
  const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
  await db.update(RegisterTable)
    .set({ password: hashedPassword })
    .where(eq(RegisterTable.id, userId));
}