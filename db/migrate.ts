import "dotenv/config";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db, pool } from "./index";

async function main() {
  console.log("Running migrations...");
  
  await migrate(db, { migrationsFolder: "./db/migrations" });
  
  console.log("Migrations completed successfully!");
  
  await pool.end();
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
