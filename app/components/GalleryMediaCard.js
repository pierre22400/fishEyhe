import styles from "./MediaCard.module.css";
import Image from "next/image";

export default function MediaCard({
  media,
  onSelect,
  onLike,
  isLoading = false,
}) {
  return (
    <article className={styles.card}>
      <button
        type="button"
        className={styles.likeButton}
        onClick={onLike}
        disabled={isLoading}
        aria-label={`Aimer ${media.title}, ${media.likes} likes`}
      >
        <span>{media.likes}</span>
        <span aria-hidden="true">♥</span>
        {isLoading && (
          <span role="status">Enregistrement en cours…</span>
        )}
      </button>

      <div className={styles.info}>
        <h2 className={styles.title}>{media.title}</h2>

        <button
          type="button"
          className={styles.likeButton}
          onClick={onLike}
          aria-label={`Aimer ${media.title}, ${media.likes} likes`}
        >
          <span>{media.likes}</span>
          <span aria-hidden="true">♥</span>
        </button>
      </div>
    </article>
  );
}
