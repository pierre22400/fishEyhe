import PhotographerCard from "./components/PhotographerCard";
import data from "../data/photographer.json";

const photographers = data.photographers;

export default function Home() {
  return (
    <main>
      <h1>FishEye</h1>
      <p>Découvrez nos photographes</p>

      {photographers.map((photographer) => (
        <PhotographerCard
          key={photographer.id}
          photographer={photographer}
        />
      ))}
    </main>
  );
}