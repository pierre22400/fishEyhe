"use client";

import MediaCard from "./MediaCard";

import { useState, useRef, useEffect } from "react";

export default function MediaGallery({ media }) {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [sortBy, setSortBy] = useState("popularity");
  // Reference to the close button (associe cette référence à un élément HTML.)
  const closeButtonRef = useRef(null);
  // Reference to the opener button (associe cette référence à un élément HTML.)
  const openerRef = useRef(null);
// Reference to the modal container (associe cette référence à un élément HTML.)
  const modalRef = useRef(null);

  // Focus the close button when a media item is selected
  useEffect(() => {
    if (selectedMedia) {
      closeButtonRef.current?.focus();
    }
  }, [selectedMedia]);

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

    const currentIndex = sortedMedia.findIndex(
      (item) => item.id === selectedMedia.id
    );

    const nextIndex = (currentIndex + 1) % sortedMedia.length;

    setSelectedMedia(sortedMedia[nextIndex]);
  }

  function handlePrevious() {
    if (!selectedMedia || sortedMedia.length === 0) return;

    const currentIndex = sortedMedia.findIndex(
      (item) => item.id === selectedMedia.id
    );

    const previousIndex =
      (currentIndex - 1 + sortedMedia.length) % sortedMedia.length;

    setSelectedMedia(sortedMedia[previousIndex]);
  }

  function handleKeyDown(event) {
    if (event.key === "ArrowRight") {
      handleNext();
    }

    if (event.key === "ArrowLeft") {
      handlePrevious();
    }

    if (event.key === "Escape") {
      handleClose();
    }
      if (event.key === "Tab") {
    handleTabKey(event);
  }
  }

  // Function to handle opening the media item and setting the opener reference
  //Cette fonction effectue deux opérations, dans cet ordre :
  // 1. Elle mémorise le bouton qui a ouvert la modale.
  // 2. Elle sélectionne le média pour afficher la modale
  function handleOpen(event, item) {
    openerRef.current = event.currentTarget;
    setSelectedMedia(item);
  }
  // Function to handle closing the media item and returning focus to the opener
  function handleClose() {
    setSelectedMedia(null);
    openerRef.current?.focus();
  }
// Function to handle tab key navigation within the modal
  function handleTabKey(event) {
  const buttons = modalRef.current.querySelectorAll("button");

  const firstButton = buttons[0];
  const lastButton = buttons[buttons.length - 1];

  if (event.shiftKey && document.activeElement === firstButton) {
    event.preventDefault();
    lastButton.focus();
  } else if (!event.shiftKey && document.activeElement === lastButton) {
    event.preventDefault();
    firstButton.focus();
  }
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
          onSelect={(event) => handleOpen(event, item)}
        />
      ))}

      {selectedMedia && (
        <div
            ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-label="Média sélectionné"
          onKeyDown={handleKeyDown}
        >
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

          <button
            // Reference to the close button (associe cette référence à un élément HTML.)
            ref={closeButtonRef}
            type="button"
            onClick={handleClose}
          >
            Fermer
          </button>
        </div>
      )}

      <p>
        Média sélectionné : {selectedMedia?.title ?? "Aucun"}
      </p>
    </section>
  );
}