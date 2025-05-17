import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import PizzaPage from "./pages/PizzaPage/index.jsx";
import DrinksPage from "./pages/DrinksPage/index.jsx";
import { CartProvider } from "../src/context/CartContext/index.jsx";

export default function App() {
  return (
    <CartProvider>
      <Router>
        <div className="p-4">
          <nav className="flex justify-center items-center gap-4 mb-10 bg-white/80 backdrop-blur rounded-full shadow-md px-4 py-2 border border-gray-200">
            <NavLink to="/"
              end
              className={({ isActive }) =>
                `px-5 py-2 rounded-full font-semibold transition-all duration-200 text-base focus:outline-none focus:ring-2 focus:ring-yellow-300/60 hover:bg-yellow-100/70 hover:text-yellow-700 ${
                  isActive ? "bg-yellow-400 text-white shadow" : "text-gray-700"
                }`
              }>
              Піци
            </NavLink>
            <NavLink to="/drinks"
              className={({ isActive }) =>
                `px-5 py-2 rounded-full font-semibold transition-all duration-200 text-base focus:outline-none focus:ring-2 focus:ring-blue-300/60 hover:bg-blue-100/70 hover:text-blue-700 ${
                  isActive ? "bg-blue-400 text-white shadow" : "text-gray-700"
                }`
              }>
              Напої
            </NavLink>
          </nav>
          <Routes>
            <Route path="/" element={<PizzaPage />} />
            <Route path="/drinks" element={<DrinksPage />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}