import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { pizzas } from "../../../public/data/pizzas.js";
import { drinks } from "../../../public/data/drinks.js";
import { useCart } from "../../context/CartContext/index.jsx";
import { useNavigate } from "react-router-dom";

export default function OrderForm({ cartItems = [], onOrderSubmitted }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    comment: "",
  });
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { clearCart } = useCart();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) {
      newErrors.name = "Ім’я обов’язкове";
    }

    else if (!/^[a-zA-Zа-яА-ЯёЁіІїЇєЄґҐʼ’]{3,}$/u.test(form.name.trim())) {
      newErrors.name =
        "Ім’я має містити лише літери та бути не менше 3 символів";
    }
    if (!/^\+380\d{9}$/.test(form.phone))
      newErrors.phone = "Формат телефону: +380XXXXXXXXX";
    if (!form.address.trim()) newErrors.address = "Адреса обов’язкова";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const total = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

    const order = {
      customer: { ...form },
      items: cartItems,
      total,
      date: new Date().toISOString(),
    };

    localStorage.setItem("lastOrder", JSON.stringify(order));
    setIsModalOpen(true);
    clearCart();
    if (typeof onOrderSubmitted === "function") {
      onOrderSubmitted();
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto p-2 sm:p-4 bg-white rounded-xl shadow space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-center">
          Оформлення замовлення
        </h2>

        <div className="space-y-3 sm:space-y-4">
          {cartItems.length === 0 ? (
            <p className="text-gray-500">Кошик порожній</p>
          ) : (
            <>
              <ul className="divide-y">
                {cartItems.map((item, index) => {
                  let image = item.image;
                  if (!image)
                  {
                    if (item.type === "pizza")
                    {
                      const pizza = pizzas.find((p) => p.id === item.id);
                      if (pizza && pizza.image) image = pizza.image;
                    }

                    else if (item.type === "drink") {
                      const drink = drinks.find((d) => d.id === item.id);
                      if (drink && drink.image) image = drink.image;
                    }
                  }
                  let price = item.price;
                  if (typeof price !== "number")
                  {
                    if (item.type === "pizza")
                    {
                      const pizza = pizzas.find((p) => p.id === item.id);
                      if (pizza)
                        price = pizza.basePrices?.[item.options?.size] || 0;
                    }

                    else if (item.type === "drink") {
                      const drink = drinks.find((d) => d.id === item.id);
                      if (drink) price = drink.price;
                    }
                  }
                  const quantity = item.quantity || 1;
                  const totalPrice = price * quantity;
                  return (
                    <li
                      key={index}
                      className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-2 gap-2 sm:gap-6">
                      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-0 w-full">
                        {image && (
                          <img
                            src={image}
                            alt={item.name}
                            className="w-12 h-12 sm:w-14 sm:h-14 object-contain rounded"/>
                        )}
                        <div className="flex-1">
                          <p className="font-medium text-sm sm:text-base">
                            {item.name}
                          </p>
                          <p className="text-xs sm:text-sm text-gray-500">
                            {item.options?.size &&
                              `Розмір: ${item.options.size.toLowerCase()}`}
                            {item.options?.crust &&
                              `, Тісто: ${item.options.crust.toLowerCase()}`}
                            {Array.isArray(item.options?.toppings) &&
                              item.options.toppings.length > 0 &&
                              `, Додаткові інгрідієнти: ${item.options.toppings
                                .join(", ")
                                .toLowerCase()}`}
                            {item.options?.volume &&
                              `Обʼєм: ${item.options.volume}`}
                          </p>
                          <p className="text-xs text-gray-400">
                            Кількість: {quantity}
                          </p>
                        </div>
                        <span className="font-semibold text-yellow-600 text-sm sm:text-base block sm:hidden ml-2">
                          {totalPrice} грн
                        </span>
                      </div>
                      <span className="font-semibold text-yellow-600 text-sm sm:text-base hidden sm:inline-flex items-center gap-1">
                        {totalPrice}
                        <span className="text-xs sm:text-base">грн</span>
                      </span>
                    </li>
                  );
                })}
              </ul>
              <p className="text-right font-bold text-sm sm:text-base">
                Всього:{" "}
                {cartItems.reduce((sum, item) => {
                  let price = item.price;
                  if (typeof price !== "number")
                  {
                    if (item.type === "pizza")
                    {
                      const pizza = pizzas.find((p) => p.id === item.id);
                      if (pizza)
                        price = pizza.basePrices?.[item.options?.size] || 0;
                    }

                    else if (item.type === "drink")
                    {
                      const drink = drinks.find((d) => d.id === item.id);
                      if (drink) price = drink.price;
                    }
                  }
                  const quantity = item.quantity || 1;
                  return sum + price * quantity;
                }, 0)}{" "}
                грн
              </p>
            </>
          )}
        </div>

        <div className="space-y-3 sm:space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium mb-2 sm:mb-2.5">
              Ім’я
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-2 sm:p-2.5 border rounded text-xs sm:text-base"/>
            {errors.name && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium mb-2 sm:mb-2.5">
              Номер телефону
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full p-2 sm:p-2.5 border rounded text-xs sm:text-base"
              placeholder="+380..."/>
            {errors.phone && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.phone}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium mb-2 sm:mb-2.5">
              Адреса доставки
            </label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full p-2 sm:p-2.5 border rounded text-xs sm:text-base"
              rows="3"/>
            {errors.address && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.address}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium mb-2 sm:mb-2.5">
              Додаткові коментарі до замовлення (необов’язкове поле)
            </label>
            <textarea
              name="comment"
              value={form.comment}
              onChange={handleChange}
              className="w-full p-2 sm:p-2.5 border rounded text-xs sm:text-base"
              rows="2"
              placeholder="Наприклад: не класти гострий соус, подзвонити перед доставкою тощо"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 sm:py-2.5 rounded-2xl cursor-pointer text-sm sm:text-base">
          Підтвердити замовлення
        </button>
      </form>

      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setIsModalOpen(false);
            navigate("/");
          }}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black/30" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-bold text-green-600">
                    Дякуємо за замовлення!
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Наш оператор зв’яжеться з вами найближчим часом.
                    </p>
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md bg-yellow-500 px-4 py-2 text-sm font-medium text-white hover:bg-yellow-600 cursor-pointer"
                      onClick={() => {
                        setIsModalOpen(false);
                        navigate("/");
                      }}>
                      Закрити
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}