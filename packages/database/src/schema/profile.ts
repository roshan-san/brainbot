import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const profileTable = pgTable("profiles", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().unique(),
  name: varchar("name").notNull(),
});
