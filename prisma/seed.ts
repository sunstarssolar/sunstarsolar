import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const pinHash = await bcrypt.hash("1234", 12);

  const worker = await prisma.worker.upsert({
    where: {
      workerCode: "SMW-001",
    },
    update: {
      name: "Ramesh",
      pinHash,
      active: true,
    },
    create: {
      id: "smw001",
      workerCode: "SMW-001",
      name: "Ramesh",
      pinHash,
      active: true,
    },
  });

  console.log("Worker created successfully:");
  console.log(worker.workerCode);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });