import prisma from "./prisma";

export function getPhotographers() {
  return prisma.photographer.findMany({ orderBy: { id: "asc" } });
}

export function getPhotographerById(photographerId) {
  return prisma.photographer.findUnique({ where: { id: photographerId } });
}

export function getPhotographerMedia(photographerId) {
  return prisma.media.findMany({ where: { photographerId } });
}
