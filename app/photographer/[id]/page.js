import { notFound } from "next/navigation";
import Link from "next/link";
import { getPhotographerById, getPhotographerMedia } from "../../../lib/photographers";
import { getLikedMediaIds, VISITOR_COOKIE } from "../../../lib/likes";
import { cookies } from "next/headers";
import PhotographerGallery from "../../components/PhotographerGallery";
import ContactModal from "../../components/ContactModal";
import styles from "./photographer.module.css";
import Image from "next/image";

export default async function PhotographerPage({ params }) {
  const { id } = await params;
  const photographerId = Number(id);

  if (!Number.isSafeInteger(photographerId) || photographerId <= 0) {
    notFound();
  }

  const photographer = await getPhotographerById(photographerId);

  if (!photographer) {
    notFound();
  }

  const photographerMedia = await getPhotographerMedia(photographerId);
  const visitorId = (await cookies()).get(VISITOR_COOKIE)?.value;
  const likedMediaIds = await getLikedMediaIds(
    visitorId,
    photographerMedia.map((item) => item.id),
  );

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
        <PhotographerGallery
          media={photographerMedia}
          price={photographer.price}
          likedMediaIds={likedMediaIds}
        />
      </section>
    </main>
  );
}
