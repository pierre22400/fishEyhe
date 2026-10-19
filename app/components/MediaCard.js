
import styles from "./MediaCard.module.css";

export default function MediaCard({ media, onSelect, onLike }) {
  return (
    <article className={styles.card}>
      <button
        type="button"
        className={styles.mediaButton}
        onClick={onSelect}
        aria-label={`Afficher ${media.title} en grand`}
      >
        {media.image ? (
          <img
            className={styles.image}
            src={`/images/${media.image}`}
            alt={media.title}
          />
        ) : (
          <video
            className={styles.image}
            src={`/images/${media.video}`}
            muted
            preload="metadata"
            aria-label={media.title}
          />
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
