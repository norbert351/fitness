"use server";

import { db } from "@/db";
import { RegisterTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateRole(userId: number, newRole: string) {
  await db
    .update(RegisterTable)
    .set({ role: newRole })
    .where(eq(RegisterTable.id, userId));
  revalidatePath("/users");
}

export async function deleteUser(userId: number) {
  await db.delete(RegisterTable).where(eq(RegisterTable.id, userId));
  revalidatePath("/users");
}

export async function createUser() {
  // Implementation using RegisterTable
}

export async function updateUser() {
  // Implementation using RegisterTable
}
