"use client";
import MediaCard from "./MediaCard";

import { useState } from "react";

function handleNext() {
  if (!selectedMedia || media.length === 0) return;

  const currentIndex = media.findIndex((item) => item.id === selectedMedia.id);

  const nextIndex = (currentIndex + 1) % media.length;

  setSelectedMedia(media[nextIndex]);
}

export default function MediaGallery({ media }) {
  const [selectedMedia, setSelectedMedia] = useState(null);

  return (
    <section aria-label="Galerie du photographe">
      {media.map((item) => (
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
