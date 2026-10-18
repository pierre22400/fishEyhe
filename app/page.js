import PhotographerCard from "./components/PhotographerCard";
import prisma from "../lib/prisma";



export default async function Home() {
  const photographers = await prisma.photographer.findMany();
  return (
    <main>
      <h1>FishEye</h1>
      <p>Découvrez nos photographes</p>
      <section className="photographers-grid">
        {photographers.map((photographer) => (
          <PhotographerCard key={photographer.id} photographer={photographer} />
        ))}
      </section>
    </main>
  );
}
