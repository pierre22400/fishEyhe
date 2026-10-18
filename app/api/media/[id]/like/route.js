
import prisma from "../../../../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  const { id } = await params;
  const mediaId = Number(id);

  if (!Number.isSafeInteger(mediaId) || mediaId <= 0) {
    return NextResponse.json(
      { error: "Identifiant invalide" },
      { status: 400 }
    );
  }

  try {
    const media = await prisma.media.update({
      where: { id: mediaId },
      data: {
        likes: { increment: 1 },
      },
    });

    return NextResponse.json({ likes: media.likes });
  } catch (error) {
    console.error("Erreur lors du like :", error);

    return NextResponse.json(
      { error: "Impossible d'enregistrer le like" },
      { status: 500 }
    );
  }
}
