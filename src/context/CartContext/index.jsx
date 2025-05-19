import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addItem = (item) => {
    setCartItems((prevItems) => {
      const index = prevItems.findIndex(
        (ci) =>
          ci.id === item.id &&
          JSON.stringify(ci.options) === JSON.stringify(item.options)
      );
      if (index !== -1) {
        return prevItems.map((ci, i) =>
          i === index ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };


  const updateQuantity = (itemId, options, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (
          item.id === itemId &&
          JSON.stringify(item.options) === JSON.stringify(options)
        ) {
          return { ...item, quantity: quantity > 0 ? quantity : 1 };
        }
        return item;
      })
    );
  };

  const removeItem = (itemId, options) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(
            item.id === itemId &&
            JSON.stringify(item.options) === JSON.stringify(options)
          )
      )
    );
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ cartItems, addItem, updateQuantity, removeItem, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}