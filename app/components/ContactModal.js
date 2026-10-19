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

import { useState } from "react";




export default function ContactModal({ photographer }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
    <button type="button" onClick={() => setIsOpen(true)}>
        Contactez-moi
        </button>
        {isOpen && (
  <p>La fenêtre est ouverte !</p>
)}
</>
        );

}