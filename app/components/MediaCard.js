import styles from "./MediaCard.module.css";
import Image from "next/image";

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
          <Image
            className={styles.image}
            src={`/images/${media.image}`}
            alt={media.title}
            width={400}
            height={300}
            sizes="(max-width: 800px) 50vw, (max-width: 1100px) 33vw, 400px"
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
