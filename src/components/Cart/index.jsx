import React from "react";
import { useCart } from "../../context/CartContext/index.jsx";
import CartItem from "../CartItem/index.jsx";

export default function Cart() {
  const { cartItems, totalPrice } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] p-8">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
          alt="Порожній кошик"
          className="w-24 h-24 mb-4 opacity-60"/>
        <div className="text-xl text-gray-400 font-semibold mb-2">
          Кошик порожній
        </div>
        <div className="text-gray-500">
          Додайте піцу або напій, щоб оформити замовлення!
        </div>
      </div>
    );
  }

  return (
    <div className="relative max-w-3xl mx-auto mt-8 bg-white/90 rounded-3xl shadow-2xl border border-gray-100 p-8 flex flex-col gap-6 animate-fade-in">
      <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-2 tracking-tight drop-shadow">
        Ваш кошик
      </h2>
      <div className="divide-y divide-gray-200 flex flex-col gap-4">
        {cartItems.map((item, index) => (
          <CartItem key={index} item={item} />
        ))}
      </div>
      <div className="flex justify-between items-center mt-8">
        <span className="text-lg font-semibold text-gray-700">
          Загальна сума:
        </span>
        <span className="text-2xl font-bold text-yellow-500 drop-shadow">
          {totalPrice} грн
        </span>
      </div>
      <button className="mt-6 w-full py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xl font-bold rounded-2xl shadow-lg hover:from-yellow-500 hover:to-yellow-600 transition-colors duration-200 active:scale-95 cursor-pointer">
        Оформити замовлення
      </button>
    </div>
  );
}
