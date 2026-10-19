import Link from "next/link";
import Image from "next/image";

export default function PhotographerCard({ photographer }) {
  return (
    <article className="photographer-card">
      <Link href={`/photographer/${photographer.id}`}>
        <Image
          className="photographer-portrait"
          src={`/images/${photographer.portrait}`}
          alt={`Portrait de ${photographer.name}`}
          width={200}
          height={200}
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
