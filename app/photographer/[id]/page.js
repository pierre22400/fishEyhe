import { notFound } from "next/navigation";
import prisma from "../../../lib/prisma";
import MediaGallery from "../../components/MediaGallery";
import ContactModal from "../../components/ContactModal";
import styles from "./photographer.module.css";

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
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.identity}>
          <h1 className={styles.name}>{photographer.name}</h1>

          <p className={styles.location}>
            {photographer.city}, {photographer.country}
          </p>

          <p className={styles.tagline}>{photographer.tagline}</p>
        </div>

        <div className={styles.contact}>
          <ContactModal photographer={photographer} />
        </div>

        <img
          className={styles.portrait}
          src={`/images/${photographer.portrait}`}
          alt={photographer.name}
        />
      </header>

      <section aria-label="Galerie du photographe">
        <MediaGallery media={photographerMedia} price={photographer.price} />
      </section>
    </main>
  );
}
