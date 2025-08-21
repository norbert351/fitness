"use server"

import { db } from "@/db";
import { RegisterTable } from "@/db/schema";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function register(formData: FormData) {
  try {
    const data = Object.fromEntries(formData);

    // Validate required fields
    if (!data.username || 
        !data.email || 
        !data.password || 
        !data.Confirmpassword) {
      return { error: "All fields are required" };
    }

    // Validate password match
    if (data.password !== data.Confirmpassword) {
      return { error: "Passwords don't match" };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password as string, 10);

    // Create user object
    const user = {
      username: data.username as string,
      email: data.email as string,
      password: hashedPassword,
    };

    // Insert into database
    await db.insert(RegisterTable).values(user);

    // Redirect on success
     // Better to redirect to login page after registration
  }catch (error: any) {
    // Handle specific database errors
    if (error.code === 'ER_DUP_ENTRY' || error.message.includes('unique constraint')) {
      return { error: "Email already registered" };
    }
    return { error: error.message || "Registration failed" };
  }
   redirect("/login");
} 