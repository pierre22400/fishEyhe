export default function PhotographerCard({ photographer }) {
  return (
    <article className="photographer-card">
      <img
        className="photographer-portrait"
        src={`/images/${photographer.portrait}`}
        alt={`Portrait de ${photographer.name}`}
      />
      <h2 className="photographer-name">{photographer.name}</h2>
      <p className="photographer-location">
        {photographer.city}, {photographer.country}
      </p>
      <p>{photographer.tagline}</p>
      <p>{photographer.price} € / jour.</p>
    </article>
  );
}
