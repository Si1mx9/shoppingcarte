import { memo } from 'react';
import PropTypes from 'prop-types';
import { useToast } from '../../context/ToastContext';
import './CartItem.css';

const CartItem = memo(function CartItem({ item, onUpdate, onRemove }) {
  const { addToast } = useToast();

  const handleDecrement = () => {
    onUpdate(item.id, item.quantity - 1);
  };

  const handleIncrement = () => {
    onUpdate(item.id, item.quantity + 1);
  };

  const handleQtyChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) onUpdate(item.id, val);
  };

  const handleRemove = () => {
    onRemove(item.id);
    addToast(`${item.title.slice(0, 30)}… removed from cart`, 'error');
  };

  return (
    <article className="cart-item">
      <div className="cart-item__image-wrap">
        <img src={item.image} alt={item.title} className="cart-item__image" />
      </div>

      <div className="cart-item__info">
        <h3 className="cart-item__title">{item.title}</h3>
        <p className="cart-item__unit-price">${item.price.toFixed(2)} each</p>
      </div>

      <div className="cart-item__controls">
        <div className="cart-item__qty">
          <button
            className="cart-item__qty-btn"
            onClick={handleDecrement}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <input
            type="number"
            className="cart-item__qty-input"
            value={item.quantity}
            onChange={handleQtyChange}
            min={0}
            max={99}
            aria-label="Quantity"
          />
          <button
            className="cart-item__qty-btn"
            onClick={handleIncrement}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <p className="cart-item__subtotal">
          ${(item.price * item.quantity).toFixed(2)}
        </p>

        <button
          className="cart-item__remove"
          onClick={handleRemove}
          aria-label={`Remove ${item.title} from cart`}
        >
          ✕
        </button>
      </div>
    </article>
  );
});

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default CartItem;
