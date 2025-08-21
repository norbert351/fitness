"use server"
import { db } from '@/db';
import { RegisterTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
  const { userId, newRole } = await request.json();
  
  try {
    await db.update(RegisterTable)
      .set({ role: newRole })
      .where(eq(RegisterTable.id, userId));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update role' },
      { status: 500 }
    );
  }
}