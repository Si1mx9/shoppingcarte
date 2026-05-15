/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const WishlistContext = createContext(null);

function loadWishlist() {
  try {
    const data = localStorage.getItem('shopcarte_wishlist');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(loadWishlist);

  useEffect(() => {
    localStorage.setItem('shopcarte_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = useCallback((product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) return prev.filter((item) => item.id !== product.id);
      return [...prev, product];
    });
  }, []);

  const isWishlisted = useCallback(
    (id) => wishlist.some((item) => item.id === id),
    [wishlist]
  );

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
}

WishlistProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
