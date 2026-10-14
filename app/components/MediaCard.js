export default function MediaCard({ media }) {
  return (
    <article>
      <h2>{media.title}</h2>
      <p>{media.likes} likes</p>
    </article>
  );
}