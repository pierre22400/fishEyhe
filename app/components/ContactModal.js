/**
 * ============================================================
 * FISHEYE — COMPOSANT ContactModal
 * ============================================================
 *
 * Rôle :
 * Afficher et gérer le formulaire de contact d'un photographe.
 *
 * Fonctionnalités :
 * - Ouvrir la fenêtre modale depuis le bouton "Contactez-moi".
 * - Afficher le nom du photographe sélectionné.
 * - Saisir les informations du visiteur et son message.
 * - Fermer la modale et gérer son accessibilité.
 *
 * Architecture :
 * Client Component ("use client").
 * Utilise React pour gérer les interactions utilisateur.
 * Reçoit les informations du photographe via ses props.
 *
 * Utilisation :
 * Intégré à la page app/photographer/[id]/page.js.
 *
 * ============================================================
 */

"use client";
import { useState, useRef, useEffect } from "react";

export default function ContactModal({ photographer }) {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  

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
 console.log({
  firstName,
  lastName,
  email,
  message,
});
}
  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        Contactez-moi
      </button>
      {isOpen && (
        <dialog ref={modalRef} onClose={() => setIsOpen(false)}>
          <button
            type="button"
            aria-label="Fermer la fenêtre de contact"
            onClick={() => modalRef.current?.close()}
          >
            ×
          </button>
          <h2>Contactez-moi</h2>
          <p>{photographer.name}</p>
        <form onSubmit={handleSubmit}>
  <label htmlFor="firstName">Prénom</label>
  <input id="firstName" name="firstName" type="text" />
  <label htmlFor="lastName">Nom</label>
  <input id="lastName" name="lastName" type="text" />
  <label htmlFor="email">E-mail</label>
  <input id="email" name="email" type="email" />
<label htmlFor="message">Votre message</label>
<textarea rows={5} id="message" name="message"></textarea>
  <button type="submit">Envoyer</button>
</form>
        </dialog>
      )}
    </>
  );
}
