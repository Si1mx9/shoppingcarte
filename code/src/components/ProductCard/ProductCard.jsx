import { useState } from 'react';
import PropTypes from 'prop-types';
import { useCart } from '../../context/CartContext';
import './ProductCard.css';

function ProductCard({ product }) {
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  const handleQtyChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= 1) setQty(val);
  };

  const decrement = () => setQty((q) => Math.max(1, q - 1));
  const increment = () => setQty((q) => q + 1);

  const handleAddToCart = () => {
    addToCart(product, qty);
    setQty(1);
  };

  return (
    <article className="product-card fade-up">
      <div className="product-card__image-wrap">
        <img
          src={product.image}
          alt={product.title}
          className="product-card__image"
        />
      </div>

      <div className="product-card__body">
        <span className="product-card__category">{product.category}</span>
        <h3 className="product-card__title">{product.title}</h3>
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
}

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
