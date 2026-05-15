import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import './ProductPage.css';

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { addToast } = useToast();

  useEffect(() => {
    let cancelled = false;
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Product not found');
        return res.json();
      })
      .then((data) => {
        if (!cancelled) {
          setProduct(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });
    return () => { cancelled = true; };
  }, [id]);

  const handleAdd = () => {
    if (!product) return;
    addToCart(product, qty);
    addToast(`${product.title.slice(0, 30)}… added to cart`, 'success');
  };

  const handleWishlist = () => {
    if (!product) return;
    toggleWishlist(product);
    addToast(
      isWishlisted(product.id)
        ? 'Removed from wishlist'
        : 'Added to wishlist',
      'success'
    );
  };

  if (loading) {
    return (
      <div className="product-page">
        <div className="product-page__skeleton" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-page">
        <div className="shop__error">
          <span aria-hidden="true">⚠️</span>
          <p>{error}</p>
          <Link to="/shop" className="home__hero-cta">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="product-page">
      <Link to="/shop" className="product-page__back">← Back to Shop</Link>

      <div className="product-page__content fade-up">
        <div className="product-page__image-wrap">
          <img src={product.image} alt={product.title} className="product-page__image" />
        </div>

        <div className="product-page__info">
          <span className="product-page__category">{product.category}</span>
          <h1 className="product-page__title">{product.title}</h1>
          <p className="product-page__price">${product.price.toFixed(2)}</p>
          <p className="product-page__desc">{product.description}</p>

          <div className="product-page__actions">
            <div className="product-page__qty">
              <button
                className="product-page__qty-btn"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <input
                type="number"
                className="product-page__qty-input"
                value={qty}
                onChange={(e) => {
                  const v = parseInt(e.target.value, 10);
                  if (!isNaN(v) && v >= 1) setQty(Math.min(v, 99));
                }}
                min={1}
                max={99}
                aria-label="Quantity"
              />
              <button
                className="product-page__qty-btn"
                onClick={() => setQty((q) => Math.min(q + 1, 99))}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button className="product-page__add-btn" onClick={handleAdd}>
              Add to Cart — ${(product.price * qty).toFixed(2)}
            </button>

            <button
              className={`product-page__wishlist-btn${isWishlisted(product.id) ? ' wishlisted' : ''}`}
              onClick={handleWishlist}
              aria-label={isWishlisted(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              {isWishlisted(product.id) ? '❤️ Wishlisted' : '🤍 Add to Wishlist'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
