import photographers from "../../../data/photographer.json";
import { notFound } from "next/navigation";

export default async function PhotographerPage({ params }) {
  const { id } = await params;

  const photographer = photographers.find(
    (photographer) => photographer.id === Number(id),
  );
if (!photographer) {
  notFound();
}
  return (
    <main>
      <h1>{photographer.name}</h1>
      <p>Identifiant : {id}</p>
    </main>
  );
}
