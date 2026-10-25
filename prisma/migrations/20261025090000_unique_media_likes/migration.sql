-- Enregistrer un seul like par navigateur et par média.
CREATE TABLE "MediaLike" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "mediaId" INTEGER NOT NULL,
    "visitorId" TEXT NOT NULL,
    CONSTRAINT "MediaLike_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE UNIQUE INDEX "MediaLike_mediaId_visitorId_key" ON "MediaLike"("mediaId", "visitorId");
