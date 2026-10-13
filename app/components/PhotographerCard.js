export default function PhotographerCard({ photographer }) {
  return (
    <article>
      <h2>{photographer.name}</h2>
      <p>{photographer.city}, {photographer.country}</p>
      <p>{photographer.price} € / jour.</p>
   </article>
  );
}