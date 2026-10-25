# FishEye

**Projet 5 — Parcours Développeur React, OpenClassrooms**

FishEye est une application web permettant de découvrir des photographes professionnels et de consulter leurs réalisations.

Ce projet met l'accent sur l'organisation du code, l'interactivité des composants React et l'accessibilité des interfaces.

## Fonctionnalités

- Affichage d'une liste de photographes.
- Consultation d'une page individuelle pour chaque photographe.
- Galerie de photographies et de vidéos.
- Tri des médias par popularité, date ou titre.
- Lightbox avec navigation au clavier.
- Formulaire de contact avec validation des champs.
- Système de likes avec compteur actualisé.
- Prévention des likes multiples pour un même navigateur et un même média.
- Conservation des likes après actualisation de la page.
- Gestion des états de chargement et des erreurs lors de l'enregistrement des likes.

## Technologies

- **Next.js 16** — Framework React et routage.
- **React 19** — Composants interactifs.
- **JavaScript** — Logique applicative.
- **CSS / CSS Modules** — Mise en forme.
- **Prisma 7** — Accès aux données et migrations.
- **SQLite** — Base de données locale.
- **ESLint** — Analyse statique du code.

## Installation

### 1. Prérequis

- Node.js et npm.
- Git.
- Une base SQLite locale configurée.

### 2. Cloner le dépôt

```bash
git clone https://github.com/pierre22400/fishEyhe.git
cd fishEyhe
```

### 3. Installer les dépendances

```bash
npm install
```

### 4. Configurer la base de données

Créer un fichier `.env` à la racine du projet :

```env
DATABASE_URL="file:./dev.db"
```

Appliquer les migrations :

```bash
npx prisma migrate deploy
```

Générer le client Prisma :

```bash
npx prisma generate
```

**Important :** les migrations créent la structure de la base, mais ne garantissent pas la présence de photographes et de médias. Une base initialisée avec les données du projet est nécessaire pour afficher les galeries.

### 5. Démarrer l'application

```bash
npm run dev
```

Ouvrir ensuite :

http://localhost:3000

Sous Windows PowerShell, si l'exécution des scripts npm est bloquée, utiliser `npm.cmd` et `npx.cmd`.

## Structure du projet

```text
app/
  api/
    media/[id]/like/       API d'enregistrement des likes
  components/              Composants React
  photographer/[id]/       Pages des photographes
  generated/prisma/        Client Prisma généré
  page.js                  Page d'accueil

lib/
  photographers.js         Requêtes liées aux photographes
  likes.js                 Gestion des likes uniques
  prisma.js                Connexion Prisma

prisma/
  migrations/              Historique des migrations
  schema.prisma            Modèle de données

public/
  images/                  Ressources visuelles
```

## Navigation et accessibilité

L'application utilise des éléments HTML sémantiques, des libellés accessibles et des composants interactifs utilisables au clavier.

La lightbox permet notamment :

- `Entrée` : ouvrir un média depuis son bouton.
- `Flèche droite` : afficher le média suivant.
- `Flèche gauche` : afficher le média précédent.
- `Échap` : fermer la lightbox.
- `Tab` : naviguer entre les commandes.

La fermeture de la lightbox restaure le focus vers le bouton d'ouverture.

**Un contrôle d'accessibilité complet reste à effectuer.** Aucune conformité WCAG ou RGAA n'est revendiquée à ce stade.

## Fonctionnement des likes

Les likes sont enregistrés dans SQLite par l'intermédiaire d'une API Next.js.

Chaque navigateur reçoit un identifiant conservé dans un cookie. Une contrainte d'unicité dans la base de données empêche l'enregistrement de plusieurs likes pour un même média et un même identifiant visiteur.

Après un like :

- Le compteur est actualisé.
- Le bouton est désactivé.
- L'état est conservé après actualisation de la page.

Ce mécanisme limite les doublons par navigateur. Il ne constitue pas une authentification des utilisateurs et ne garantit pas une unicité par personne physique.

## Formulaire de contact

Le formulaire permet de saisir un prénom, un nom, une adresse e-mail et un message.

Les champs obligatoires sont validés par le navigateur. Après une soumission valide, les informations sont affichées dans la console et la fenêtre se ferme.

**Aucun e-mail n'est envoyé** : le formulaire est une fonctionnalité de démonstration.

## Vérifications techniques

Exécuter :

```bash
npm run lint
npm run build
```

Les dernières qualifications locales ont validé :

- ESLint : PASS.
- Build de production Next.js : PASS.
- Affichage des médias : PASS.
- Tri des galeries : PASS.
- Navigation clavier dans la lightbox : PASS.
- Prévention des likes multiples : PASS.
- Persistance des likes après rechargement : PASS.
- Migration SQLite : PASS.

Ces résultats correspondent à la qualification locale du 25 octobre 2026 et ne remplacent pas une campagne complète de tests automatisés ou d'accessibilité.

## Statut du projet

Projet développé dans le cadre de la formation OpenClassrooms.

Les corrections fonctionnelles issues des retours du mentor ont été intégrées et testées localement. Le contrôle d'accessibilité final reste à réaliser.

## Auteur

Projet personnel réalisé dans le cadre du parcours Développeur React d'OpenClassrooms.