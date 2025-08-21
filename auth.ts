import { db } from "@/db"
import { RegisterTable } from "@/db/schema"
import bcrypt from "bcryptjs"
import { eq } from "drizzle-orm"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const [user] = await db
          .select()
          .from(RegisterTable)
          .where(eq(RegisterTable.email, credentials.email as string));

        if (!user) {
          throw new Error("User not found");
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!passwordMatch) {
          throw new Error("Invalid password");
        }

        // Return user object in the format NextAuth expects
        return {
          id: user.id.toString(),
          name: user.username, // assuming your schema has a username field
          email: user.email,
        }
      },
    }),
  ],
  // Optional: Add session callback to customize session object
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    }
  },
  // Optional: Configure pages if you want custom paths
  pages: {
    signIn: '/login',
   },
})

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}