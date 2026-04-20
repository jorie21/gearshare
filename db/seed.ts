import "dotenv/config";
import { db, pool } from "./index";
import { categories, users } from "./schema";

async function main() {
  console.log("Seeding database...");

  // Seed categories
  const seedCategories = await db.insert(categories).values([
    { name: "Camping", slug: "camping", description: "Tents, sleeping bags, and outdoor gear" },
    { name: "Photography", slug: "photography", description: "Cameras, lenses, and lighting" },
    { name: "Electronics", slug: "electronics", description: "Laptops, gadgets, and more" },
    { name: "Tools", slug: "tools", description: "Power tools and equipment" },
  ]).onConflictDoNothing().returning();

  console.log(`Seeded ${seedCategories.length} categories`);

  // Optional: Seed a test user
  const seedUsers = await db.insert(users).values([
    { name: "Test User", email: "test@gearshare.com" },
  ]).onConflictDoNothing().returning();

  console.log(`Seeded ${seedUsers.length} users`);

  console.log("Seeding completed successfully!");
  
  await pool.end();
}

main().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
