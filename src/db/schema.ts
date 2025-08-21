import { datetime, int, mysqlTable, serial, varchar } from 'drizzle-orm/mysql-core';

export const RegisterTable = mysqlTable('register', {
  id: int().autoincrement().primaryKey(),
  username: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  role: varchar({ length: 20 }).default('user').notNull(),
  emailVerified: datetime("email_verified"),
});

export const passwordResetTokens = mysqlTable('password-reset',{
  id: int().autoincrement().primaryKey(),
  // user_id: int().notNull().references(()=>RegisterTable.id),
  email: varchar("email", { length: 255 }).notNull(),
  otp: varchar({length: 6}).notNull(),
  // code: varchar('code', { length: 6 }).notNull(),
  expires_at: datetime("expires_at").notNull(),
});

export const verificationTokens = mysqlTable("verification_tokens", {
  token: varchar("token", { length: 255 }).primaryKey(),
  email: varchar({ length: 255 }).notNull(),
  expiresAt: datetime("expires_at").notNull(),
});