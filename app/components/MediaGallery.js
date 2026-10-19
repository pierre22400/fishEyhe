"use client";
import styles from "../photographer/[id]/photographer.module.css";
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
  const [mediaList, setMediaList] = useState(media);

  // ouvre le dialogue avec showModal() s'il n'est pas déjà ouvert.
  //  Focus the close button when a media item is selected
  useEffect(() => {
    if (selectedMedia) {
      if (!modalRef.current?.open) {
        //éviter de demander l'ouverture d'un dialogue déjà ouvert.
        modalRef.current?.showModal();
      }

      closeButtonRef.current?.focus();
    }
  }, [selectedMedia]);

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

  function handleNext() {
    if (!selectedMedia || sortedMedia.length === 0) return;

    const currentIndex = sortedMedia.findIndex(
      (item) => item.id === selectedMedia.id,
    );

    const nextIndex = (currentIndex + 1) % sortedMedia.length;

    setSelectedMedia(sortedMedia[nextIndex]);
  }

  function handlePrevious() {
    if (!selectedMedia || sortedMedia.length === 0) return;

    const currentIndex = sortedMedia.findIndex(
      (item) => item.id === selectedMedia.id,
    );

    const previousIndex =
      (currentIndex - 1 + sortedMedia.length) % sortedMedia.length;

    setSelectedMedia(sortedMedia[previousIndex]);
  }

  function handleKeyDown(event) {
    if (selectedMedia?.video) {
      return;
    }

    if (event.key === "ArrowRight") {
      handleNext();
    }

    if (event.key === "ArrowLeft") {
      handlePrevious();
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
  function handleCancel(event) {
    event.preventDefault();
    handleClose();
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

      {selectedMedia && (
        <dialog
          ref={modalRef}
          aria-labelledby="media-dialog-title"
          onCancel={handleCancel}
          onKeyDown={handleKeyDown}
        >
          <h2 id="media-dialog-title">{selectedMedia.title}</h2>

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
        </dialog>
      )}

      <p>Média sélectionné : {selectedMedia?.title ?? "Aucun"}</p>
    </section>
  );
}
