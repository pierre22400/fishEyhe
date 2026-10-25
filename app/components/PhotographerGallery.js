
"use client";
import { useRef, useState } from "react";
import styles from "../photographer/[id]/photographer.module.css";
import GalleryMediaCard from "./GalleryMediaCard";
import MediaLightbox from "./MediaLightbox";

export default function PhotographerGallery({ media, price, likedMediaIds = [] }) {
  const [mediaList, setMediaList] = useState(media);
  const [sortBy, setSortBy] = useState("popularity");
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [likedIds, setLikedIds] = useState(() => new Set(likedMediaIds));
  const [pendingMediaId, setPendingMediaId] = useState(null);
  const [likeError, setLikeError] = useState("");
  const openerRef = useRef(null);

  const totalLikes = mediaList.reduce((total, item) => total + item.likes, 0);
  const sortedMedia = [...mediaList].sort((a, b) => {
    if (sortBy === "popularity") return b.likes - a.likes;
    if (sortBy === "date") return new Date(b.date) - new Date(a.date);
    if (sortBy === "title") return a.title.localeCompare(b.title);
    return 0;
  });

  async function handleLike(item) {
    if (likedIds.has(item.id) || pendingMediaId !== null) return;
    setPendingMediaId(item.id);
    setLikeError("");

    try {
      const response = await fetch(`/api/media/${item.id}/like`, { method: "POST" });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Impossible d'enregistrer le like.");
      }
      if (!Number.isInteger(result.likes)) {
        throw new Error("Réponse invalide du serveur.");
      }
      setMediaList((previous) =>
        previous.map((entry) =>
          entry.id === item.id ? { ...entry, likes: result.likes } : entry,
        ),
      );
      setLikedIds((previous) => new Set([...previous, item.id]));
    } catch (error) {
      setLikeError(error.message || "Erreur lors de l'enregistrement du like.");
    } finally {
      setPendingMediaId(null);
    }
  }

  function handleOpen(event, item) {
    openerRef.current = event.currentTarget;
    setSelectedMedia(item);
  }

  function handleClose() {
    setSelectedMedia(null);
    openerRef.current?.focus();
  }

  function handleNext() {
    if (!selectedMedia || sortedMedia.length === 0) return;
    const index = sortedMedia.findIndex((item) => item.id === selectedMedia.id);
    setSelectedMedia(sortedMedia[(index + 1) % sortedMedia.length]);
  }

  function handlePrevious() {
    if (!selectedMedia || sortedMedia.length === 0) return;
    const index = sortedMedia.findIndex((item) => item.id === selectedMedia.id);
    setSelectedMedia(sortedMedia[(index - 1 + sortedMedia.length) % sortedMedia.length]);
  }

  return (
    <section aria-label="Galerie du photographe">
      <div className={styles.sortBar}>
        <label htmlFor="media-sort" className={styles.sortLabel}>Trier par</label>
        <div className={styles.sortControl}>
          <select
            id="media-sort"
            className={styles.sortSelect}
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
          >
            <option value="popularity">Popularité</option>
            <option value="date">Date</option>
            <option value="title">Titre</option>
          </select>
        </div>
      </div>

      {pendingMediaId !== null && (
        <p className={styles.likeStatus} role="status">
          Enregistrement du like en cours…
        </p>
      )}
      {likeError && (
        <p className={styles.likeError} role="alert">{likeError}</p>
      )}

      <div className={styles.gallery}>
        {sortedMedia.map((item) => (
          <GalleryMediaCard
            key={item.id}
            media={item}
            onSelect={(event) => handleOpen(event, item)}
            onLike={() => handleLike(item)}
            hasLiked={likedIds.has(item.id)}
            isPending={pendingMediaId === item.id}
            likesDisabled={pendingMediaId !== null}
          />
        ))}
      </div>

      {selectedMedia && (
        <MediaLightbox
          media={selectedMedia}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onClose={handleClose}
        />
      )}

      <aside className={styles.likesPanel} aria-label="Statistiques du photographe">
        <span aria-label={`${totalLikes} mentions J’aime`}>
          {totalLikes} <span aria-hidden="true">♥</span>
        </span>
        <span>{price} € / jour</span>
      </aside>
    </section>
  );
}
