import { useEffect, useState } from "react";
import OrderForm from "../../components/OrderForm/index.jsx";
import { useCart } from "../../context/CartContext/index.jsx";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [orderCompleted, setOrderCompleted] = useState(false);

  useEffect(() => {
    if (!cartItems || (cartItems.length === 0 && !orderCompleted)) {
      navigate("/", { replace: true });
    }
  }, [cartItems, navigate, orderCompleted]);

  const handleOrderSubmit = () => {
    setOrderCompleted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <OrderForm cartItems={cartItems} onOrderSubmitted={handleOrderSubmit} />
    </div>
  );
}