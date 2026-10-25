
"use client";

import { useState, useRef } from "react";
import styles from "../photographer/[id]/photographer.module.css";
import MediaCard from "./MediaCard";
import MediaLightbox from "./MediaLightbox";

export default function MediaGallery({ media, price }) {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [sortBy, setSortBy] = useState("popularity");
  const [mediaList, setMediaList] = useState(media);

  // Mémorise le bouton qui a ouvert la lightbox.
  const openerRef = useRef(null);

  // Calcule le nombre total de likes.
  const totalLikes = mediaList.reduce(
    (total, item) => total + item.likes,
    0,
  );

  // Enregistre un like et met à jour le média concerné.
  async function handleLike(item) {
    try {
      const response = await fetch(`/api/media/${item.id}/like`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'enregistrement du like");
      }

      const data = await response.json();

      setMediaList((previousMedia) =>
        previousMedia.map((mediaItem) =>
          mediaItem.id === item.id
            ? { ...mediaItem, likes: data.likes }
            : mediaItem,
        ),
      );
    } catch (error) {
      console.error("Impossible d'enregistrer le like :", error);
    }
  }

  // Trie les médias selon le critère sélectionné.
  const sortedMedia = [...mediaList].sort((a, b) => {
    if (sortBy === "popularity") {
      return b.likes - a.likes;
    }

    if (sortBy === "date") {
      return new Date(b.date) - new Date(a.date);
    }

    if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    }

    return 0;
  });

  // Ouvre la lightbox et mémorise le bouton d'origine.
  function handleOpen(event, item) {
    openerRef.current = event.currentTarget;
    setSelectedMedia(item);
  }

  // Ferme la lightbox et restaure le focus.
  function handleClose() {
    setSelectedMedia(null);
    openerRef.current?.focus();
  }

  return (
    <section aria-label="Galerie du photographe">
      <div className={styles.sortBar}>
        <label htmlFor="media-sort" className={styles.sortLabel}>
          Trier par
        </label>

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

      <div className={styles.gallery}>
        {sortedMedia.map((item) => (
          <MediaCard
            key={item.id}
            media={item}
            onSelect={(event) => handleOpen(event, item)}
            onLike={() => handleLike(item)}
          />
        ))}
      </div>

      <MediaLightbox
        selectedMedia={selectedMedia}
        media={sortedMedia}
        onSelect={setSelectedMedia}
        onClose={handleClose}
      />

      <aside
        className={styles.likesPanel}
        aria-label="Statistiques du photographe"
      >
        <span>
          <span aria-label={`${totalLikes} mentions J’aime`}>
            {totalLikes} <span aria-hidden="true">♥</span>
          </span>
        </span>

        <span>{price} € / jour</span>
      </aside>
    </section>
  );
}
