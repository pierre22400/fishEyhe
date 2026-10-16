"use client";
import MediaCard from "./MediaCard";

import { useState } from "react";



export default function MediaGallery({ media }) {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [sortBy, setSortBy] = useState("popularity");
const mediaWithIds = media.map((item, index) => ({
  ...item,
  id: index,
}));
 
 const sortedMedia = [...mediaWithIds].sort((a, b) => {
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


  function handleNext() {
    if (!selectedMedia || sortedMedia.length === 0) return;

    const currentIndex = sortedMedia.findIndex((item) => item.id === selectedMedia.id);

    const nextIndex = (currentIndex + 1) % sortedMedia.length;

    setSelectedMedia(sortedMedia[nextIndex]);
  }

  function handlePrevious() {
    if (!selectedMedia || sortedMedia.length === 0) return;

const currentIndex = sortedMedia.findIndex(
  (item) => item.id === selectedMedia.id
);

    const previousIndex = (currentIndex - 1 + sortedMedia.length) % sortedMedia.length;

    setSelectedMedia(sortedMedia[previousIndex]);
  }
  return (
    <section aria-label="Galerie du photographe">
      <label htmlFor="media-sort">Trier par : </label>

      <select
        id="media-sort"
        value={sortBy}
        onChange={(event) => setSortBy(event.target.value)}
      >
        <option value="popularity">Popularité</option>
        <option value="date">Date</option>
        <option value="title">Titre</option>
      </select>

      {sortedMedia.map((item) => (
        <MediaCard
          key={item.id}
          media={item}
          onSelect={() => setSelectedMedia(item)}
        />
      ))}
      {selectedMedia && (
        <div role="dialog" aria-modal="true" aria-label="Média sélectionné">
          <h2>{selectedMedia.title}</h2>
          {selectedMedia.image ? (
            <img
              src={`/images/${selectedMedia.image}`}
              alt={selectedMedia.title}
            />
          ) : (
            <video
              src={`/images/${selectedMedia.video}`}
              controls
              aria-label={selectedMedia.title}
            />
          )}
          <button type="button" onClick={handlePrevious}>
            ← Précédent
          </button>
          <button type="button" onClick={handleNext}>
            Suivant →
          </button>
          <button type="button" onClick={() => setSelectedMedia(null)}>
            Fermer
          </button>
        </div>
      )}
      <p>Média sélectionné : {selectedMedia?.title ?? "Aucun"}</p>
    </section>
  );
}
