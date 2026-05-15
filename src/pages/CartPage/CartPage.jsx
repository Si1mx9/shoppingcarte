import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import CartItem from '../../components/CartItem/CartItem';
import './CartPage.css';

const SHIPPING_THRESHOLD = 50;
const SHIPPING_COST = 4.99;

function CartPage() {
  const { cartItems, updateQty, removeItem, clearCart } = useCart();
  const { addToast } = useToast();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    addToast('Checkout is a demo feature — thanks for shopping!', 'success');
  };

  const handleClearCart = () => {
    clearCart();
    addToast('Cart cleared', 'error');
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart cart--empty">
        <div className="cart__empty-icon" aria-hidden="true">🛒</div>
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
        <div>
          <h1 className="cart__title">Your Cart</h1>
          <p className="cart__count">{totalItems} item{totalItems !== 1 ? 's' : ''}</p>
        </div>
        <button className="cart__clear-btn" onClick={handleClearCart}>
          Clear Cart
        </button>
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
            <span className={shipping === 0 ? 'cart__summary-free' : ''}>
              {shipping === 0 ? 'Free 🎉' : `$${SHIPPING_COST.toFixed(2)}`}
            </span>
          </div>

          <div className="cart__summary-divider" />

          <div className="cart__summary-row cart__summary-row--total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          {subtotal < SHIPPING_THRESHOLD && (
            <p className="cart__shipping-note">
              Add ${(SHIPPING_THRESHOLD - subtotal).toFixed(2)} more for free shipping!
            </p>
          )}

          <button className="cart__checkout-btn" onClick={handleCheckout}>
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
