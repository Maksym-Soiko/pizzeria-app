import { pizzas } from "../../../public/data/pizzas.js";
import PizzaItem from "../../components/PizzaItem/index.jsx";

export default function PizzaPage() {
  return (
    <div className="p-4 grid grid-cols-1 min-[715px]:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
      <h1 className="text-2xl font-bold mb-4 col-span-full">Меню: Піци</h1>
      {pizzas.map((pizza) => (
        <PizzaItem key={pizza.id} pizza={pizza} />
      ))}
    </div>
  );
}