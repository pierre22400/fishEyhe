import { notFound } from "next/navigation";
import Link from "next/link";
import prisma from "../../../lib/prisma";
import MediaGallery from "../../components/MediaGallery";
import ContactModal from "../../components/ContactModal";
import styles from "./photographer.module.css";
import Image from "next/image";

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
      <Link href="/" className={styles.brand}>
        <Image
          src="/images/logo.png"
          alt="FishEye — Retour à l'accueil"
          width={200}
          height={50}
        />
      </Link>
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

        <Image
          className={styles.portrait}
          src={`/images/${photographer.portrait}`}
          alt={`Portrait de ${photographer.name}`}
          width={200}
          height={200}
        />
      </header>

      <section aria-label="Galerie du photographe">
        <MediaGallery media={photographerMedia} price={photographer.price} />
      </section>
    </main>
  );
}
