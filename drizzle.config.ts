import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./drizzle/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: "postgresql://vjti-db_owner:npg_X8vluLdi9mJS@ep-rough-rice-a5ucboj9-pooler.us-east-2.aws.neon.tech/vjti-db?sslmode=require",
  },
});
