import { useCart } from "../../context/CartContext/index.jsx";
import { pizzas } from "../../../public/data/pizzas.js";
import { drinks } from "../../../public/data/drinks.js";

export default function CartItem({ item }) {
  const { updateQuantity, removeItem } = useCart();

  const optionsDescription = item.options
    ? [
        item.options.size && `Розмір: ${item.options.size.toLowerCase()}`,
        item.options.crust && `Тип тіста: ${item.options.crust.toLowerCase()}`,
        Array.isArray(item.options.toppings) && item.options.toppings.length > 0
          ? `Додаткові інгредієнти: ${item.options.toppings
              .join(", ")
              .toLowerCase()}`
          : null,
        item.options.volume && `Обʼєм: ${item.options.volume}`,
      ]
        .filter(Boolean)
        .join("; ")
    : "";

  let image = item.image;
  if (!image)
  {
    if (item.type === "pizza")
    {
      const pizza = pizzas.find((p) => p.id === item.id);
      if (pizza && pizza.image) image = pizza.image;
    }

    else if (item.type === "drink")
    {
      const drink = drinks.find((d) => d.id === item.id);
      if (drink && drink.image) image = drink.image;
    }
  }

  return (
    <div className="flex justify-between items-center border-b pb-3 gap-4">
      {image && (
        <img
          src={image}
          alt={item.pizza?.name || item.name}
          className="w-20 h-20 object-contain rounded"/>
      )}

      <div className="flex-1">
        <h3 className="font-semibold">{item.pizza?.name || item.name}</h3>
        <p className="text-sm text-gray-600">{optionsDescription}</p>
        <p className="text-sm font-medium">Ціна за одиницю: {item.price} грн</p>
      </div>

      <div className="flex items-center gap-1 sm:gap-2 min-w-[48px] justify-end">
        <input
          type="number"
          min="1"
          className="w-10 h-8 sm:w-16 sm:h-10 text-center text-base sm:text-lg font-semibold border-2 border-yellow-300 rounded-lg shadow-sm focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all duration-150 outline-none bg-white hover:border-yellow-400"
          value={item.quantity}
          onChange={(e) => {
            const val = parseInt(e.target.value, 10);
            if (!isNaN(val)) updateQuantity(item.id, item.options, val);
          }}/>
        <button
          className="text-red-600 font-bold p-0.5 sm:p-1 rounded hover:bg-gray-100 transition flex-shrink-0 cursor-pointer"
          onClick={() => removeItem(item.id, item.options)}
          title="Видалити"
          style={{ minWidth: 32, minHeight: 32 }}>
          <img
            src="https://cdn-icons-png.flaticon.com/128/3917/3917211.png"
            alt="Видалити"
            className="w-5 h-5 sm:w-6 sm:h-6"
            style={{ minWidth: 20, minHeight: 20 }}/>
        </button>
      </div>
    </div>
  );
}