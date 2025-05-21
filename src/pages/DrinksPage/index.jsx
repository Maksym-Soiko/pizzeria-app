import { drinks } from "../../../public/data/drinks.js";
import DrinkItem from "../../components/DrinkItem/index.jsx";

export default function DrinksPage() {
  return (
    <div className="p-4 grid grid-cols-1 min-[715px]:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
      <h1 className="text-2xl font-bold mb-4 col-span-full">Меню: Напої</h1>
      {drinks.map((drink) => (
        <DrinkItem key={drink.id} drink={drink} />
      ))}
    </div>
  );
}