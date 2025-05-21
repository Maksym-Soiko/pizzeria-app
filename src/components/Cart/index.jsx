import { useCart } from "../../context/CartContext/index.jsx";
import CartItem from "../CartItem/index.jsx";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cartItems, totalPrice } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh] px-4 py-8 sm:px-6 md:px-8">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
          alt="Порожній кошик"
          className="w-20 h-20 sm:w-24 sm:h-24 mb-4 opacity-60"/>
        <div className="text-lg sm:text-xl text-gray-400 font-semibold mb-2 text-center">
          Кошик порожній
        </div>
        <div className="text-sm sm:text-base text-gray-500 text-center">
          Додайте піцу або напій, щоб оформити замовлення!
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto mt-6 sm:mt-10 px-2 sm:px-6 md:px-8">
      <div className="bg-white/90 rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100 p-3 sm:p-6 md:p-8 flex flex-col gap-4 sm:gap-6 animate-fade-in">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-center text-gray-800 mb-2 tracking-tight drop-shadow">
          Ваш кошик
        </h2>

        <div className="flex flex-col gap-3 sm:gap-4">
          {cartItems.map((item, index) => (
            <CartItem key={index} item={item} />
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 sm:mt-6 gap-2 sm:gap-0">
          <span className="text-base sm:text-lg font-semibold text-gray-700">
            Загальна сума:
          </span>
          <span className="text-lg sm:text-2xl font-bold text-yellow-500 drop-shadow">
            {totalPrice} грн
          </span>
        </div>

        <button
          className="mt-4 sm:mt-6 w-full py-2 sm:py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-base sm:text-lg md:text-xl font-bold rounded-lg sm:rounded-2xl shadow-lg hover:from-yellow-500 hover:to-yellow-600 transition-colors duration-200 active:scale-95 cursor-pointer"
          onClick={() => navigate("/checkout")}>
          Оформити замовлення
        </button>
      </div>
    </div>
  );
}