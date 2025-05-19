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
import { CartProvider, useCart } from "../src/context/CartContext/index.jsx";

function Navigation() {
  const location = useLocation();
  const isCartActive = location.pathname === "/cart";
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="flex justify-between items-center mb-10 bg-white/80 backdrop-blur rounded-full shadow-md px-6 py-2 border border-gray-200">
      <div className="flex-1 flex justify-center gap-4">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `px-5 py-2 rounded-full font-semibold transition-all duration-200 text-base focus:outline-none focus:ring-2 focus:ring-yellow-300/60 hover:bg-yellow-100/70 hover:text-yellow-700 ${
              isActive ? "bg-yellow-400 text-white shadow" : "text-gray-700"
            }`
          }>
          Піци
        </NavLink>
        <NavLink
          to="/drinks"
          className={({ isActive }) =>
            `px-5 py-2 rounded-full font-semibold transition-all duration-200 text-base focus:outline-none focus:ring-2 focus:ring-blue-300/60 hover:bg-blue-100/70 hover:text-blue-700 ${
              isActive ? "bg-blue-400 text-white shadow" : "text-gray-700"
            }`
          }>
          Напої
        </NavLink>
      </div>

      <NavLink
        to="/cart"
        className={`p-2 rounded-full transition duration-200 ${
          isCartActive ? "bg-gray-700 shadow" : "hover:bg-gray-100/70"
        }`}
        aria-label="Кошик">
        <div className="relative">
          <img
            src="https://cdn-icons-png.flaticon.com/128/3916/3916627.png"
            alt="Кошик"
            className={`w-7 h-7 transition duration-200 ${
              isCartActive ? "filter brightness-0 invert" : "opacity-80"
            }`}/>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow border border-white animate-bounce-short">
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
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}