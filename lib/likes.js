import prisma from "./prisma";

export const VISITOR_COOKIE = "fisheye_like_visitor";

export function isValidVisitorId(value) {
  return typeof value === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

export async function getLikedMediaIds(visitorId, mediaIds) {
  if (!isValidVisitorId(visitorId) || mediaIds.length === 0) return [];
  const likes = await prisma.mediaLike.findMany({
    where: { visitorId, mediaId: { in: mediaIds } },
    select: { mediaId: true },
  });
  return likes.map((like) => like.mediaId);
}

export async function registerMediaLike(mediaId, visitorId) {
  const exists = await prisma.media.findUnique({
    where: { id: mediaId },
    select: { id: true },
  });
  if (!exists) return null;

  try {
    return await prisma.$transaction(async (tx) => {
      const prior = await tx.mediaLike.findUnique({
        where: { mediaId_visitorId: { mediaId, visitorId } },
      });

      if (prior) {
        const current = await tx.media.findUnique({
          where: { id: mediaId }, select: { likes: true },
        });
        return { likes: current.likes, alreadyLiked: true };
      }

      await tx.mediaLike.create({ data: { mediaId, visitorId } });
      const updated = await tx.media.update({
        where: { id: mediaId },
        data: { likes: { increment: 1 } },
        select: { likes: true },
      });
      return { likes: updated.likes, alreadyLiked: false };
    });
  } catch (error) {
    // Un deuxième appel simultané ne doit pas incrémenter le compteur.
    if (error?.code === "P2002") {
      const current = await prisma.media.findUnique({
        where: { id: mediaId }, select: { likes: true },
      });
      return current ? { likes: current.likes, alreadyLiked: true } : null;
    }
    throw error;
  }
}
