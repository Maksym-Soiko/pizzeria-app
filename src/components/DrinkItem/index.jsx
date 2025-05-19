import { useCart } from "../../context/CartContext/index.jsx";

export default function DrinkItem({ drink }) {
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem({
      id: drink.id,
      type: "drink",
      name: drink.name,
      price: drink.price,
      options: {
        volume: drink.volume,
      },
    });
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg mb-6 border border-gray-100 hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden group flex flex-col w-full sm:w-[320px] md:w-[300px] mx-auto">
      {drink.image && (
        <div className="relative w-full h-32 flex-shrink-0 mb-2 flex items-center justify-center bg-white">
          <img
            src={drink.image}
            alt={drink.name}
            className="max-h-34 w-auto object-contain rounded-t-2xl group-hover:scale-105 transition-transform duration-300"/>
        </div>
      )}
      <div className="absolute -top-4 -right-4 bg-blue-100 rounded-full w-16 h-16 opacity-30 group-hover:scale-110 transition-transform duration-300"></div>
      <h2 className="text-2xl font-extrabold text-gray-800 mb-1 tracking-tight drop-shadow">
        {drink.name}
      </h2>
      <p className="text-gray-500 mb-1">
        Обʼєм:{" "}
        <span className="font-semibold text-blue-700">{drink.volume}</span>
      </p>
      <p className="text-gray-700 mb-3">
        Ціна: <span className="font-bold text-blue-600">{drink.price} грн</span>
      </p>
      <button
        className="mt-2 px-6 py-2 bg-gradient-to-r from-blue-400 to-blue-500 text-white font-bold rounded-xl shadow hover:from-blue-500 hover:to-blue-600 transition-colors text-lg w-full hover:cursor-pointer"
        onClick={handleAdd}>
        Додати в кошик
      </button>
    </div>
  );
}