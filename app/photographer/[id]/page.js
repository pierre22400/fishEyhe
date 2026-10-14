import photographers from "../../../data/photographer.json";
import { notFound } from "next/navigation";
import media from "../../../data/media.json";
import MediaCard from "../../components/MediaCard";

export default async function PhotographerPage({ params }) {
  const { id } = await params;

  const photographer = photographers.find(
    (photographer) => photographer.id === Number(id),
  );
  if (!photographer) {
    notFound();
  }
  const photographerMedia = media.filter(
    (item) => item.photographerId === Number(id),
  );
  return (
    <main>
      <h1>{photographer.name}</h1>
      <section aria-label="Galerie du photographe">
  {photographerMedia.map((item) => (
  <MediaCard
    key={item.id}
    media={item}
  />
))}
</section>
      <p>Identifiant : {id}</p>
    
    </main>
  );
}
