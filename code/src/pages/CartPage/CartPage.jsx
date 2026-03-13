import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import CartItem from '../../components/CartItem/CartItem';
import './CartPage.css';

function CartPage() {
  const { cartItems, updateQty, removeItem } = useCart();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="cart cart--empty">
        <div className="cart__empty-icon">🛒</div>
        <h2 className="cart__empty-title">Your cart is empty</h2>
        <p className="cart__empty-sub">
          Looks like you haven&#39;t added anything yet.
        </p>
        <Link to="/shop" className="cart__shop-link">
          Start Shopping →
        </Link>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="cart__header">
        <h1 className="cart__title">Your Cart</h1>
        <p className="cart__count">{totalItems} item{totalItems !== 1 ? 's' : ''}</p>
      </div>

      <div className="cart__layout">
        <div className="cart__items">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdate={updateQty}
              onRemove={removeItem}
            />
          ))}
        </div>

        <aside className="cart__summary">
          <h2 className="cart__summary-title">Order Summary</h2>

          <div className="cart__summary-row">
            <span>Subtotal ({totalItems} items)</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="cart__summary-row">
            <span>Shipping</span>
            <span className="cart__summary-free">
              {subtotal >= 50 ? 'Free 🎉' : '$4.99'}
            </span>
          </div>

          <div className="cart__summary-divider" />

          <div className="cart__summary-row cart__summary-row--total">
            <span>Total</span>
            <span>
              ${(subtotal >= 50 ? subtotal : subtotal + 4.99).toFixed(2)}
            </span>
          </div>

          {subtotal < 50 && (
            <p className="cart__shipping-note">
              Add ${(50 - subtotal).toFixed(2)} more for free shipping!
            </p>
          )}

          <button className="cart__checkout-btn">
            Proceed to Checkout
          </button>

          <Link to="/shop" className="cart__continue-link">
            ← Continue Shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}

export default CartPage;
