/**
 * FishEye — contact du photographe.
 * Fenêtre native accessible : ouverture, fermeture et validation HTML.
 */
"use client";
import { useState, useRef, useEffect, useId } from "react";
import "./ContactModal.css";

export default function ContactModal({ photographer }) {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    }
  }, [isOpen]);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const message = formData.get("message");
    console.log({ firstName, lastName, email, message });
  }

  return (
    <>
      <button
        className="contact-trigger"
        type="button"
        onClick={() => setIsOpen(true)}
      >
        Contactez-moi
      </button>
      {isOpen && (
        <dialog
          className="contact-dialog"
          ref={modalRef}
          aria-labelledby={titleId}
          onClose={() => setIsOpen(false)}
        >
          <button
            className="contact-close"
            type="button"
            aria-label="Fermer la fenêtre de contact"
            onClick={() => modalRef.current?.close()}
          >
            ×
          </button>
          <h2 className="contact-heading" id={titleId}>
            Contactez-moi
            <span>{photographer.name}</span>
          </h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <label htmlFor="firstName">Prénom</label>
            <input id="firstName" name="firstName" type="text" autoComplete="given-name" required />
            <label htmlFor="lastName">Nom</label>
            <input id="lastName" name="lastName" type="text" autoComplete="family-name" required />
            <label htmlFor="email">E-mail</label>
            <input id="email" name="email" type="email" autoComplete="email" required />
            <label htmlFor="message">Votre message</label>
            <textarea id="message" rows={5} name="message" required />
            <button className="contact-submit" type="submit">Envoyer</button>
          </form>
        </dialog>
      )}
    </>
  );
}
