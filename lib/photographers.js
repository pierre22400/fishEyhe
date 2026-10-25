import prisma from "@/lib/prisma";

export async function getPhotographers() {
  return prisma.photographer.findMany({
    orderBy: {
      id: "asc",
    },
  });
}

export async function getPhotographerById(id) {
  const photographer = await prisma.photographer.findUnique({
    where: { id },
  });

  if (!photographer) {
    return null;
  }

  const media = await prisma.media.findMany({
    where: { photographerId: id },
  });

  return { photographer, media };
}