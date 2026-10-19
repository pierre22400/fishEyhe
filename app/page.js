import PhotographerCard from "./components/PhotographerCard";
import prisma from "../lib/prisma";
import Image from "next/image";

export default async function Home() {
  const photographers = await prisma.photographer.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return (
    <main>
      <header className="home-header">
        <h1 className="home-logo">
          <Image
            src="/images/logo.png"
            alt="FishEye"
            width={200}
            height={50}
            priority
          />
        </h1>

        <p className="home-heading">Nos photographes</p>
      </header>

      <section className="photographers-grid">
        {photographers.map((photographer) => (
          <PhotographerCard key={photographer.id} photographer={photographer} />
        ))}
      </section>
    </main>
  );
}
