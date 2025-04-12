import { pgTable, text } from "drizzle-orm/pg-core";

// Define the schema for the users table
export const users = pgTable("users", {
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  location: text("location").notNull(),
});