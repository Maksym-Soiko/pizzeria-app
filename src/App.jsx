import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  useLocation,
} from "react-router-dom";
import PizzaPage from "./pages/PizzaPage/index.jsx";
import DrinksPage from "./pages/DrinksPage/index.jsx";
import CartPage from "./pages/CartPage/index.jsx";
import CheckoutPage from "./pages/CheckoutPage/index.jsx";
import { CartProvider, useCart } from "../src/context/CartContext/index.jsx";

function Navigation() {
  const location = useLocation();
  const isCartActive = location.pathname === "/cart";
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-30 flex flex-row items-center mb-6 sm:mb-10 bg-white/80 backdrop-blur rounded-2xl sm:rounded-full shadow-md px-2 sm:px-6 py-2 border border-gray-200 gap-2 sm:gap-0">
      <button
        className="sm:hidden flex items-center px-2 py-2 text-gray-700 focus:outline-none"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Відкрити меню">
        <svg
          className="w-7 h-7"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>

      <div className="hidden sm:flex flex-1 justify-center gap-4">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `px-3 sm:px-5 py-2 rounded-full font-semibold transition-all duration-200 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-yellow-300/60 hover:bg-yellow-100/70 hover:text-yellow-700 ${
              isActive ? "bg-yellow-400 text-white shadow" : "text-gray-700"
            }`
          }>
          Піци
        </NavLink>
        <NavLink
          to="/drinks"
          className={({ isActive }) =>
            `px-3 sm:px-5 py-2 rounded-full font-semibold transition-all duration-200 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-300/60 hover:bg-blue-100/70 hover:text-blue-700 ${
              isActive ? "bg-blue-400 text-white shadow" : "text-gray-700"
            }`
          }>
          Напої
        </NavLink>
      </div>

      {menuOpen && (
        <div className="absolute top-14 left-0 w-full z-30 bg-white rounded-2xl shadow-lg flex flex-col items-center gap-2 py-4 sm:hidden animate-fade-in">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `w-11/12 text-center px-4 py-2 rounded-full font-semibold transition-all duration-200 text-base focus:outline-none focus:ring-2 focus:ring-yellow-300/60 hover:bg-yellow-100/70 hover:text-yellow-700 ${
                isActive ? "bg-yellow-400 text-white shadow" : "text-gray-700"
              }`
            }
            onClick={() => setMenuOpen(false)}>
            Піци
          </NavLink>
          <NavLink
            to="/drinks"
            className={({ isActive }) =>
              `w-11/12 text-center px-4 py-2 rounded-full font-semibold transition-all duration-200 text-base focus:outline-none focus:ring-2 focus:ring-blue-300/60 hover:bg-blue-100/70 hover:text-blue-700 ${
                isActive ? "bg-blue-400 text-white shadow" : "text-gray-700"
              }`
            }
            onClick={() => setMenuOpen(false)}>
            Напої
          </NavLink>
        </div>
      )}

      <NavLink
        to="/cart"
        className={`p-2 rounded-full transition duration-200 ${
          isCartActive ? "bg-gray-700 shadow" : "hover:bg-gray-100/70"
        } ml-auto`}
        aria-label="Кошик">
        <div className="relative">
          <img
            src="https://cdn-icons-png.flaticon.com/128/3916/3916627.png"
            alt="Кошик"
            className={`w-7 h-7 sm:w-8 sm:h-8 transition duration-200 ${
              isCartActive ? "filter brightness-0 invert" : "opacity-80"
            }`}/>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-white text-xs sm:text-sm font-bold rounded-full px-1.5 sm:px-2 py-0.5 shadow border border-white animate-bounce-short">
              {cartCount}
            </span>
          )}
        </div>
      </NavLink>
    </nav>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Router>
        <div className="p-4">
          <Navigation />
          <Routes>
            <Route path="/" element={<PizzaPage />} />
            <Route path="/drinks" element={<DrinksPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}