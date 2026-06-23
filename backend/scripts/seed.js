import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const CATEGORIES = [
  'Electronics', 'Books', 'Fashion', 'Gaming', 'Home',
  'Sports', 'Beauty', 'Automotive', 'Office', 'Toys'
];

async function main() {
  const BATCH_SIZE = 5000;
  const TOTAL_RECORDS = 200000;

  console.log('Starting seed script...');
  console.log(`Target: ${TOTAL_RECORDS} products in batches of ${BATCH_SIZE}.`);

  for (let i = 0; i < TOTAL_RECORDS; i += BATCH_SIZE) {
    const batch = Array.from({ length: BATCH_SIZE }).map(() => ({
      name: faker.commerce.productName(),
      category: faker.helpers.arrayElement(CATEGORIES),
      price: parseFloat(faker.commerce.price({ min: 1, max: 1000 })),
      createdAt: faker.date.past({ years: 2 }),
    }));

    await prisma.product.createMany({
      data: batch,
      skipDuplicates: true,
    });

    console.log(`Inserted ${i + BATCH_SIZE} / ${TOTAL_RECORDS} products.`);
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
