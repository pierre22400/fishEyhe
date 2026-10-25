"use client";

import Image from "next/image";
import styles from "./MediaLightbox.module.css";
import { useEffect, useRef } from "react";




export default function MediaLightbox({
    selectedMedia,
    media,
    onSelect,
    onClose,
}) {

    const modalRef = useRef(null);
    const closeButtonRef = useRef(null);

    useEffect(() => {
        if (selectedMedia && modalRef.current) {
            if (!modalRef.current.open) {
                modalRef.current.showModal();
            }

            closeButtonRef.current?.focus();
        }
    }, [selectedMedia]);
    if (!selectedMedia) return null;

    function handleNext() {
        if (!selectedMedia || media.length === 0) return;
        const currentIndex = media.findIndex(
            (item) => item.id === selectedMedia.id,
        );

        const nextIndex = (currentIndex + 1) % media.length;

        onSelect(media[nextIndex]);
    }

    function handlePrevious() {
        if (!selectedMedia || media.length === 0) return;
        const currentIndex = media.findIndex(
            (item) => item.id === selectedMedia.id,
        );

        const previousIndex =
            (currentIndex - 1 + media.length) % media.length;

        onSelect(media[previousIndex]);
    }
    function handleKeyDown(event) {
        // Laisser les commandes du lecteur vidéo fonctionner.
        if (event.target.closest("video")) {
            return;
        }

        // Ne pas intercepter les champs de formulaire.
        if (
            event.target.closest(
                "input, textarea, select, [contenteditable='true']"
            )
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
    function handleClose() {
  modalRef.current?.close();
  onClose();
}
    return (
        <dialog
            ref={modalRef}
            className={styles.dialog}
            aria-labelledby="media-dialog-title"
onCancel={(event) => {
  event.preventDefault();
  handleClose();
}}
            onClick={handleClose}
            onKeyDown={handleKeyDown}
        >
            <button
                ref={closeButtonRef}
                type="button"
                className={styles.close}
                onClick={onClose}
                
                aria-label="Fermer la lightbox"
            >
                ×
            </button>
            <button
                type="button"
                className={styles.previous}
                onClick={handlePrevious}
                aria-label="Média précédent"
            >
                ‹
            </button>
            <div className={styles.content}>
                {selectedMedia.image ? (
                    <Image
                        className={styles.media}
                        src={`/images/${selectedMedia.image}`}
                        alt={selectedMedia.title}
                        width={1000}
                        height={750}
                    />
                ) : (
                    <video
                        key={selectedMedia.id}
                        className={styles.media}
                        src={`/images/${selectedMedia.video}`}
                        controls
                        aria-label={selectedMedia.title}
                    />
                )}

                <h2 id="media-dialog-title" className={styles.title}>
                    {selectedMedia.title}
                </h2>
            </div>
            <button
                type="button"
                className={styles.next}
                onClick={handleNext}
                aria-label="Média suivant"
            >
                ›
            </button>
        </dialog>
    );
}