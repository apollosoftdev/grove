import "dotenv/config";

import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import bcrypt from "bcryptjs";
import { faker } from '@faker-js/faker';
import { PrismaClient } from "../src/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set.");
}

const prisma = new PrismaClient({
  adapter: new PrismaMariaDb(connectionString),
});

async function admin() {
  const email = process.env.ADMIN_EMAIL ?? "admin@grove.local";
  const password = process.env.ADMIN_PASSWORD ?? "admin12345";
  const passwordHash = await bcrypt.hash(password, 12);

  const admin = await prisma.user.upsert({
    where: { email },
    update: { role: "ADMIN" },
    create: {
      email,
      name: "Administrator",
      passwordHash,
      role: "ADMIN",
    },
  });

  console.log(`Seeded admin user: ${admin.email}`);
  console.log(`Password: ${password}  (change this after first login)`);
}

async function products() {
  // 1. Optional: Clear existing products to prevent duplicates
  console.log('Cleaning up old products...');
  await prisma.product.deleteMany();

  console.log('Generating 50 fake products...');

  // 2. Generate data array using Faker
  const productsData = Array.from({ length: 50 }).map(() => {
    // Generate a realistic price in cents or whole dollars (e.g., $10 to $500)
    const randomPrice = faker.number.int({ min: 10, max: 500 });
    
    // Pick a realistic rating between 1 and 5 (or leave null occasionally)
    const randomRating = faker.helpers.maybe(() => faker.number.int({ min: 1, max: 5 }), { probability: 0.85 }) ?? null;

    return {
      name: faker.commerce.productName(),
      property: faker.commerce.productAdjective(), // e.g., "Durable", "Ergonomic", "Sleek"
      // image: faker.image.url({ width: 640, height: 480 }),
      utility: faker.commerce.productDescription(), // Gives a practical description of the item
      price: randomPrice,
      rating: randomRating,
      comment: faker.helpers.maybe(() => faker.lorem.sentence(), { probability: 0.7 }) ?? null, // Simulates a user comment
    };
  });

  // 3. Batch insert using createMany
  const created = await prisma.product.createMany({
    data: productsData,
  });

  console.log(`✅ Successfully seeded ${created.count} products!`);
}

async function main() {
  console.log('🚀 Starting global seeding process...');

  // OPTION A: Run sequentially (Best for tables with foreign key dependencies)
  await admin();
  await products();

  console.log('🎉 All database seed functions executed successfully!');
}


main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
