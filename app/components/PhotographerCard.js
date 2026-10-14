import Link from "next/link";

export default function PhotographerCard({ photographer }) {
  return (
    <article className="photographer-card">
      <Link href={`/photographer/${photographer.id}`}>
        <img
          className="photographer-portrait"
          src={`/images/${photographer.portrait}`}
          alt={`Portrait de ${photographer.name}`}
        />
      </Link>
      <h2 className="photographer-name">{photographer.name}</h2>
      <p className="photographer-location">
        {photographer.city}, {photographer.country}
      </p>
      <p>{photographer.tagline}</p>
      <p>{photographer.price} € / jour.</p>
    </article>
  );
}
