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
        className={styles.mediaButton}
        onClick={onSelect}
        aria-label={`Ouvrir ${media.title}`}
      >
        {media.image ? (
          <Image
            src={`/images/${media.image}`}
            alt={media.title}
            width={350}
            height={300}
            className={styles.image}
          />
        ) : (
          <video
            src={`/images/${media.video}`}
            className={styles.image}
            muted
            preload="metadata"
          />
        )}
      </button>

      <div className={styles.info}>
        <h2 className={styles.title}>{media.title}</h2>

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
      </div>
    </article>
  );
}