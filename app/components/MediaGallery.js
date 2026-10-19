"use client";
import styles from "../photographer/[id]/photographer.module.css";
import MediaCard from "./MediaCard";
import lightboxStyles from "./MediaLightbox.module.css";
import Image from "next/image";

import { useState, useRef, useEffect } from "react";

export default function MediaGallery({ media, price }) {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [sortBy, setSortBy] = useState("popularity");
  // Reference to the close button (associe cette référence à un élément HTML.)
  const closeButtonRef = useRef(null);
  // Reference to the opener button (associe cette référence à un élément HTML.)
  const openerRef = useRef(null);
  // Reference to the modal container (associe cette référence à un élément HTML.)
  const modalRef = useRef(null);
  const [mediaList, setMediaList] = useState(media);

  //parcourt tous les médias et additionne leurs likes
  const totalLikes = mediaList.reduce((total, item) => total + item.likes, 0);

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
    // Laisser les commandes du lecteur vidéo fonctionner.
    if (event.target.closest("video")) {
      return;
    }

    // Ne pas intercepter les contrôles de formulaire.
    if (
      event.target.closest("input, textarea, select, [contenteditable='true']")
    ) {
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      handleNext();
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
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

      {selectedMedia && (
        <dialog
          ref={modalRef}
          className={lightboxStyles.dialog}
          aria-labelledby="media-dialog-title"
          onCancel={handleCancel}
          onKeyDown={handleKeyDown}
        >
          <button
            ref={closeButtonRef}
            type="button"
            className={lightboxStyles.close}
            onClick={handleClose}
            aria-label="Fermer la lightbox"
          >
            ×
          </button>

          <button
            type="button"
            className={lightboxStyles.previous}
            onClick={handlePrevious}
            aria-label="Média précédent"
          >
            ‹
          </button>

          <div className={lightboxStyles.content}>
            {selectedMedia.image ? (
              <Image
                className={lightboxStyles.media}
                src={`/images/${selectedMedia.image}`}
                alt={selectedMedia.title}
                width={1000}
                height={750}
                sizes="(max-width: 1100px) 80vw, 1000px"
              />
            ) : (
              <video
                key={selectedMedia.id}
                className={lightboxStyles.media}
                src={`/images/${selectedMedia.video}`}
                controls
                aria-label={selectedMedia.title}
              />
            )}

            <h2 id="media-dialog-title" className={lightboxStyles.title}>
              {selectedMedia.title}
            </h2>
          </div>

          <button
            type="button"
            className={lightboxStyles.next}
            onClick={handleNext}
            aria-label="Média suivant"
          >
            ›
          </button>
        </dialog>
      )}

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
