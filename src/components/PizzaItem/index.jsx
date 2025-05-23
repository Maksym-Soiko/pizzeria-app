import { useState, Fragment } from "react";
import { useCart } from "../../context/CartContext/index.jsx";
import { Dialog, Transition } from "@headlessui/react";

export default function PizzaItem({ pizza }) {
  const [size, setSize] = useState("Мала");
  const [crust, setCrust] = useState(pizza.crustTypes[0]);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const { addItem } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleTopping = (topping) => {
    setSelectedToppings((prev) =>
      prev.includes(topping)
        ? prev.filter((t) => t !== topping)
        : [...prev, topping]
    );
  };

  const calcPrice = () => {
    const basePrice = pizza.basePrices[size];
    const toppingsPrice = selectedToppings.reduce(
      (sum, topping) =>
        sum + pizza.toppings.find((t) => t.name === topping).price,
      0
    );
    return basePrice + toppingsPrice;
  };

  const handleAdd = () => {
    addItem({
      id: pizza.id,
      type: "pizza",
      name: pizza.name,
      price: calcPrice(),
      options: {
        size,
        crust,
        toppings: selectedToppings,
      },
    });
    setIsModalOpen(true);
    setTimeout(() => setIsModalOpen(false), 1200);
  };

  return (
    <>
      <div
        className="w-full max-w-xs sm:w-[320px] md:w-[300px] bg-white rounded-2xl shadow-lg mb-6 border border-gray-100 hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden group flex flex-col mx-auto md:mx-0"
        style={{ minWidth: 0 }}>
        <div className="relative w-full h-36 sm:h-40 flex-shrink-0 mb-2 flex items-center justify-center bg-white">
          <img
            src={pizza.image}
            alt={pizza.name}
            className="max-h-32 sm:max-h-40 w-auto object-contain rounded-t-2xl group-hover:scale-105 transition-transform duration-300"/>
          <div className="absolute -top-4 -right-4 bg-yellow-100 rounded-full w-12 h-12 sm:w-16 sm:h-16 opacity-30 group-hover:scale-110 transition-transform duration-300"></div>
        </div>
        <div className="flex-1 flex flex-col px-2 sm:px-4 pb-4">
          <h2 className="text-lg sm:text-xl font-extrabold text-gray-800 mb-1 tracking-tight drop-shadow">
            {pizza.name}
          </h2>
          <p className="text-gray-500 mb-2 text-xs sm:text-sm">
            {pizza.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-2 mb-2">
            <div className="flex flex-col items-start bg-gray-50 rounded-lg px-2 py-1 shadow-sm border border-gray-200 w-full sm:w-auto">
              <label
                className="block text-xs font-medium text-gray-700 mb-1"
                htmlFor={`size-select-${pizza.id}`}>
                Розмір:
              </label>
              <div className="relative w-full">
                <select
                  id={`size-select-${pizza.id}`}
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="appearance-none w-full rounded-md border border-yellow-300 bg-white py-1.5 pl-3 pr-8 text-xs font-semibold text-gray-800 shadow-sm focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 transition-all duration-150 cursor-pointer hover:border-yellow-400">
                  {Object.keys(pizza.basePrices).map((sz) => (
                    <option key={sz} value={sz}>
                      {sz}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-yellow-400 text-xs">
                  ▼
                </span>
              </div>
            </div>
            <div className="flex flex-col items-start bg-gray-50 rounded-lg px-2 py-1 shadow-sm border border-gray-200 w-full sm:w-auto">
              <label
                className="block text-xs font-medium text-gray-700 mb-1"
                htmlFor={`crust-select-${pizza.id}`}>
                Тісто:
              </label>
              <div className="relative w-full">
                <select
                  id={`crust-select-${pizza.id}`}
                  value={crust}
                  onChange={(e) => setCrust(e.target.value)}
                  className="appearance-none w-full rounded-md border border-yellow-300 bg-white py-1.5 pl-3 pr-8 text-xs font-semibold text-gray-800 shadow-sm focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 transition-all duration-150 cursor-pointer hover:border-yellow-400">
                  {pizza.crustTypes.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-yellow-400 text-xs">
                  ▼
                </span>
              </div>
            </div>
          </div>

          <div className="mb-2">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Додаткові інгредієнти:
            </label>
            <div className="flex flex-wrap gap-1">
              {pizza.toppings.map((topping) => (
                <label
                  key={topping.name}
                  className="flex items-center bg-gray-100 rounded-lg px-2 py-1 cursor-pointer hover:bg-yellow-50 transition-colors text-xs">
                  <input
                    type="checkbox"
                    checked={selectedToppings.includes(topping.name)}
                    onChange={() => toggleTopping(topping.name)}
                    className="mr-1 accent-yellow-500"/>
                  <span className="text-gray-700">
                    {topping.name}{" "}
                    <span className="text-yellow-600 font-semibold">
                      (+{topping.price} грн)
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </div>

          <button
            className="mt-auto px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-bold rounded-xl shadow hover:from-yellow-500 hover:to-yellow-600 transition-colors text-base w-full cursor-pointer"
            onClick={handleAdd}>
            Додати в кошик ({calcPrice()} грн)
          </button>
        </div>
      </div>

      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-20"
          onClose={() => setIsModalOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black/20" />
          </Transition.Child>
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-xs bg-white rounded-2xl p-6 text-center shadow-xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-bold text-green-600">
                  Додано у кошик!
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-600">
                   Піцу "{pizza.name}" додано у кошик.
                  </p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}