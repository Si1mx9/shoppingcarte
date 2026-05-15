import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <span className="footer__logo">🛍️ ShopCarte</span>
          <p className="footer__tagline">
            Premium online store — curated just for you.
          </p>
        </div>

        <div className="footer__links">
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/wishlist">Wishlist</Link>
        </div>

        <div className="footer__links">
          <h4>Support</h4>
          <span>FAQ</span>
          <span>Shipping Info</span>
          <span>Returns</span>
          <span>Contact</span>
        </div>
      </div>

      <div className="footer__bottom">
        <p>&copy; {year} ShopCarte. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
