import React, { useState } from "react";
import { useCart } from "../../context/CartContext/index.jsx";
import { Dialog, Transition } from "@headlessui/react";

export default function DrinkItem({ drink }) {
  const { addItem } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setIsModalOpen(true);
    setTimeout(() => setIsModalOpen(false), 1200);
  };

  return (
    <>
      <div className="p-4 sm:p-6 bg-white rounded-2xl shadow-lg mb-6 border border-gray-100 hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden group flex flex-col w-full max-w-xs sm:w-[320px] md:w-[300px] mx-auto">
        {drink.image && (
          <div className="relative w-full h-28 sm:h-32 flex-shrink-0 mb-2 flex items-center justify-center bg-white">
            <img
              src={drink.image}
              alt={drink.name}
              className="max-h-24 sm:max-h-32 w-auto object-contain rounded-t-2xl group-hover:scale-105 transition-transform duration-300"/>
          </div>
        )}
        <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-blue-100 rounded-full w-10 h-10 sm:w-16 sm:h-16 opacity-30 group-hover:scale-110 transition-transform duration-300"></div>
        <h2 className="text-lg sm:text-2xl font-extrabold text-gray-800 mb-1 tracking-tight drop-shadow">
          {drink.name}
        </h2>
        <p className="text-gray-500 mb-1 text-xs sm:text-base">
          Обʼєм:{" "}
          <span className="font-semibold text-blue-700">{drink.volume}</span>
        </p>
        <p className="text-gray-700 mb-3 text-sm sm:text-base">
          Ціна:{" "}
          <span className="font-bold text-blue-600">{drink.price} грн</span>
        </p>
        <button
          className="mt-2 px-4 sm:px-6 py-2 bg-gradient-to-r from-blue-400 to-blue-500 text-white font-bold rounded-xl shadow hover:from-blue-500 hover:to-blue-600 transition-colors text-base sm:text-lg w-full cursor-pointer"
          onClick={handleAdd}>
          Додати в кошик
        </button>
      </div>

      <Transition appear show={isModalOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="relative z-20"
          onClose={() => setIsModalOpen(false)}>
          <Transition.Child
            as={React.Fragment}
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
              as={React.Fragment}
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
                   Напій "{drink.name}" додано у кошик.
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