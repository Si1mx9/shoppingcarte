import { useState, memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import './ProductCard.css';

const ProductCard = memo(function ProductCard({ product }) {
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const handleQtyChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= 1) setQty(Math.min(val, 99));
  };

  const decrement = () => setQty((q) => Math.max(1, q - 1));
  const increment = () => setQty((q) => Math.min(q + 1, 99));

  const handleAddToCart = () => {
    addToCart(product, qty);
    addToast(`${product.title.slice(0, 30)}… added to cart`, 'success');
    setQty(1);
  };

  return (
    <article className="product-card fade-up">
      <Link to={`/product/${product.id}`} className="product-card__image-wrap">
        <img
          src={product.image}
          alt={product.title}
          className="product-card__image"
          loading="lazy"
        />
      </Link>

      <div className="product-card__body">
        <span className="product-card__category">{product.category}</span>
        <Link to={`/product/${product.id}`}>
          <h3 className="product-card__title">{product.title}</h3>
        </Link>
        <p className="product-card__price">${product.price.toFixed(2)}</p>
      </div>

      <div className="product-card__footer">
        <div className="product-card__qty">
          <button
            className="product-card__qty-btn"
            onClick={decrement}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <input
            type="number"
            className="product-card__qty-input"
            value={qty}
            onChange={handleQtyChange}
            min={1}
            max={99}
            aria-label="Quantity"
          />
          <button
            className="product-card__qty-btn"
            onClick={increment}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <button className="product-card__add-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </article>
  );
});

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
