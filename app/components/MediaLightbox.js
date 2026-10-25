
"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./MediaLightbox.module.css";

export default function MediaLightbox({ media, onPrevious, onNext, onClose }) {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!dialogRef.current?.open) dialogRef.current?.showModal();
    closeButtonRef.current?.focus();
  }, []);

  function handleClose() {
    dialogRef.current?.close();
    onClose();
  }

  function handleCancel(event) {
    event.preventDefault();
    handleClose();
  }

  function handleKeyDown(event) {
    if (event.target.closest("video, input, textarea, select, [contenteditable='true']")) {
      return;
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      onNext();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      onPrevious();
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="media-dialog-title"
      onCancel={handleCancel}
      onKeyDown={handleKeyDown}
    >
      <button
        ref={closeButtonRef}
        type="button"
        className={styles.close}
        onClick={handleClose}
        aria-label="Fermer la lightbox"
      >×</button>
      <button
        type="button"
        className={styles.previous}
        onClick={onPrevious}
        aria-label="Média précédent"
      >‹</button>
      <div className={styles.content}>
        {media.image ? (
          <Image
            className={styles.media}
            src={`/images/${media.image}`}
            alt={media.title}
            width={1000}
            height={750}
            sizes="(max-width: 1100px) 80vw, 1000px"
          />
        ) : (
          <video
            key={media.id}
            className={styles.media}
            src={`/images/${media.video}`}
            controls
            aria-label={media.title}
          />
        )}
        <h2 id="media-dialog-title" className={styles.title}>{media.title}</h2>
      </div>
      <button
        type="button"
        className={styles.next}
        onClick={onNext}
        aria-label="Média suivant"
      >›</button>
    </dialog>
  );
}
