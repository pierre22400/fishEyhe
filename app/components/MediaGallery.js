"use client";
import MediaCard from "./MediaCard";

import { useState } from "react";

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

          <button type="button" onClick={() => setSelectedMedia(null)}>
            Fermer
          </button>
        </div>
      )}
      <p>Média sélectionné : {selectedMedia?.title ?? "Aucun"}</p>
    </section>
  );
}
