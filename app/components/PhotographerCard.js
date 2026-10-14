export default function PhotographerCard({ photographer }) {
  return (
    <article>
      <img className="photographer-portrait"
      src={`/images/${photographer.portrait}`}
      alt={`Portrait de ${photographer.name}`}
      />
      <h2>{photographer.name}</h2>
      <p>{photographer.city}, {photographer.country}</p>
      <p>{photographer.price} € / jour.</p>
   </article>
  );
}