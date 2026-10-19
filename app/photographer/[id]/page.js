import { notFound } from "next/navigation";
import prisma from "../../../lib/prisma";
import MediaGallery from "../../components/MediaGallery";
import ContactModal from "../../components/ContactModal";

export default async function PhotographerPage({ params }) {
  const { id } = await params;
  const photographerId = Number(id);

  if (!Number.isSafeInteger(photographerId) || photographerId <= 0) {
    notFound();
  }

  const photographer = await prisma.photographer.findUnique({
    where: { id: photographerId },
  });

  if (!photographer) {
    notFound();
  }

  const photographerMedia = await prisma.media.findMany({
    where: { photographerId },
  });

  return (
    <main>
      <h1>{photographer.name}</h1>
     <ContactModal photographer={photographer} />
 
      <section aria-label="Galerie du photographe">
        <MediaGallery media={photographerMedia} />
      </section>

      <p>Identifiant : {id}</p>
    </main>
  );
}
