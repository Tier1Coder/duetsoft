import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        slug: "sample-product-1",
        title: "Sample Product 1",
        description: "This is a seeded product.",
      },
      {
        slug: "sample-product-2",
        title: "Sample Product 2",
        description: "Another seeded product.",
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
