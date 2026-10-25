import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { isValidVisitorId, registerMediaLike, VISITOR_COOKIE } from "../../../../../lib/likes";

export async function POST(request, { params }) {
  const { id } = await params;
  const mediaId = Number(id);
  if (!Number.isSafeInteger(mediaId) || mediaId <= 0) {
    return NextResponse.json({ error: "Identifiant invalide" }, { status: 400 });
  }

  const prior = request.cookies.get(VISITOR_COOKIE)?.value;
  const valid = isValidVisitorId(prior);
  const visitorId = valid ? prior : randomUUID();

  try {
    const result = await registerMediaLike(mediaId, visitorId);
    if (!result) {
      return NextResponse.json({ error: "Média introuvable" }, { status: 404 });
    }
    const response = NextResponse.json(result);
    if (!valid) {
      response.cookies.set(VISITOR_COOKIE, visitorId, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
      });
    }
    return response;
  } catch (error) {
    console.error("Erreur lors du like :", error);
    return NextResponse.json({ error: "Impossible d'enregistrer le like" }, { status: 500 });
  }
}
