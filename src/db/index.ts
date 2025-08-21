import 'dotenv/config';
import { drizzle } from "drizzle-orm/mysql2";
 import * as schema from "@/db/schema";
 import mysql from 'mysql2/promise'

const client = mysql.createPool(process.env.DATABASE_URL!)
export const db = drizzle(client, {schema, mode: 'default'})
