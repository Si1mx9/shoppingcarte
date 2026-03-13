import { NavLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Navbar.css';

function Navbar() {
  const { cartCount } = useCart();

  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar__logo">
        <span className="navbar__logo-icon">🛍️</span>
        <span>ShopCarte</span>
      </NavLink>

      <ul className="navbar__links">
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) => `navbar__link${isActive ? ' active' : ''}`}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/shop"
            className={({ isActive }) => `navbar__link${isActive ? ' active' : ''}`}
          >
            Shop
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/cart"
            className={({ isActive }) => `navbar__link navbar__link--cart${isActive ? ' active' : ''}`}
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
