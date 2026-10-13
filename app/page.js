import PhotographerCard from "./components/PhotographerCard";

const photographers = [
  { id: 243, name: "Mimi Keel", city: "London", country: "UK", price: 400 },
  { id: 930, name: "Ellie-Rose Wilkens", city: "Paris", country: "France", price: 250 },
  { id: 82, name: "Tracy Galindo", city: "Montreal", country: "Canada", price: 500 }
];

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