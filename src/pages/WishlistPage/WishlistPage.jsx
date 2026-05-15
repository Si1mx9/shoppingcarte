import { Link } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import './WishlistPage.css';

function WishlistPage() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    addToast(`${product.title.slice(0, 30)}… added to cart`, 'success');
  };

  if (wishlist.length === 0) {
    return (
      <div className="wishlist wishlist--empty">
        <div className="wishlist__empty-icon">🤍</div>
        <h2 className="wishlist__empty-title">Your wishlist is empty</h2>
        <p className="wishlist__empty-sub">
          Save items you love to your wishlist.
        </p>
        <Link to="/shop" className="wishlist__shop-link">
          Browse Products →
        </Link>
      </div>
    );
  }

  return (
    <div className="wishlist">
      <div className="wishlist__header">
        <h1 className="wishlist__title">Your Wishlist</h1>
        <p className="wishlist__count">{wishlist.length} item{wishlist.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="wishlist__grid">
        {wishlist.map((product) => (
          <div key={product.id} className="wishlist__card">
            <button
              className="wishlist__remove"
              onClick={() => {
                toggleWishlist(product);
                addToast('Removed from wishlist', 'success');
              }}
              aria-label={`Remove ${product.title} from wishlist`}
            >
              ✕
            </button>

            <Link to={`/product/${product.id}`} className="wishlist__image-wrap">
              <img
                src={product.image}
                alt={product.title}
                className="wishlist__image"
                loading="lazy"
              />
            </Link>

            <div className="wishlist__body">
              <span className="wishlist__category">{product.category}</span>
              <Link to={`/product/${product.id}`}>
                <h3 className="wishlist__title-text">{product.title}</h3>
              </Link>
              <p className="wishlist__price">${product.price.toFixed(2)}</p>
            </div>

            <button
              className="wishlist__add-btn"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WishlistPage;
