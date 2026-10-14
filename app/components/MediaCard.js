import styles from "./MediaCard.module.css";



export default function MediaCard({ media, onSelect }) {
  return (
    <article>
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
    controls
    aria-label={media.title}
  />
)}
      <h2>{media.title}</h2>
      <p>{media.likes} likes</p>
      <button type="button" onClick={onSelect}>
  Sélectionner {media.title}
</button>
    </article>
  );
}


