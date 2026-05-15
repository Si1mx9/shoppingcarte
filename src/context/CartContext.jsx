/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const CartContext = createContext(null);

function loadCart() {
  try {
    const data = localStorage.getItem('shopcarte_cart');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(loadCart);

  useEffect(() => {
    localStorage.setItem('shopcarte_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = useCallback((product, qty = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + qty, 99) }
            : item
        );
      }
      return [...prev, { ...product, quantity: Math.min(qty, 99) }];
    });
  }, []);

  const updateQty = useCallback((id, qty) => {
    if (qty <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.min(qty, 99) } : item
      )
    );
  }, []);

  const removeItem = useCallback((id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQty, removeItem, clearCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
