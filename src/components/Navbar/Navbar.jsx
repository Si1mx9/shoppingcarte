import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Navbar.css';

function Navbar() {
  const { cartCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `navbar__link${isActive ? ' active' : ''}`;

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <NavLink to="/" className="navbar__logo" onClick={closeMenu}>
        <span className="navbar__logo-icon">🛍️</span>
        <span>ShopCarte</span>
      </NavLink>

      <button
        className={`navbar__hamburger${menuOpen ? ' open' : ''}`}
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
      >
        <span />
        <span />
        <span />
      </button>

      <ul className={`navbar__links${menuOpen ? ' navbar__links--open' : ''}`}>
        <li>
          <NavLink to="/" end className={linkClass} onClick={closeMenu}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/shop" className={linkClass} onClick={closeMenu}>
            Shop
          </NavLink>
        </li>
        <li>
          <NavLink to="/wishlist" className={linkClass} onClick={closeMenu}>
            Wishlist
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `navbar__link navbar__link--cart${isActive ? ' active' : ''}`
            }
            onClick={closeMenu}
          >
            Cart
            {cartCount > 0 && (
              <span className="navbar__badge">{cartCount}</span>
            )}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
