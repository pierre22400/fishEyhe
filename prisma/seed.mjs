
import "dotenv/config";
import fs from "node:fs/promises";
import { PrismaClient } from "../app/generated/prisma/client.ts";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const prisma = new PrismaClient({
  adapter: new PrismaBetterSqlite3({
    url: process.env.DATABASE_URL,
  }),
});

async function main() {
  const photographersData = JSON.parse(
    await fs.readFile("data/photographer.json", "utf8")
  );

  const mediaData = JSON.parse(
    await fs.readFile("data/media.json", "utf8")
  );

  const photographers = Array.isArray(photographersData)
    ? photographersData
    : photographersData.photographers;

  const media = Array.isArray(mediaData)
    ? mediaData
    : mediaData.media;

  if (!Array.isArray(photographers) || !Array.isArray(media)) {
    throw new Error("Format des fichiers JSON inattendu.");
  }

  await prisma.media.deleteMany();
  await prisma.photographer.deleteMany();

  for (const photographer of photographers) {
    await prisma.photographer.create({
      data: {
        id: photographer.id,
        name: photographer.name,
        city: photographer.city,
        country: photographer.country,
        tagline: photographer.tagline,
        price: photographer.price,
        portrait: photographer.portrait,
      },
    });
  }

  for (const item of media) {
    await prisma.media.create({
      data: {
        ...(item.id != null ? { id: item.id } : {}),
        photographerId: item.photographerId,
        title: item.title,
        image: item.image ?? null,
        video: item.video ?? null,
        likes: item.likes ?? 0,
        date: item.date,
        price: item.price,
      },
    });
  }

  console.log(
    `Import terminé : ${photographers.length} photographes et ${media.length} médias.`
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
