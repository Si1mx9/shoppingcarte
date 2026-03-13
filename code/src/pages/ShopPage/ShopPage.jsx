import { useState, useEffect } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import './ShopPage.css';

function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('all');

  useEffect(() => {
    let cancelled = false;
    fetch('https://fakestoreapi.com/products')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then((data) => {
        if (!cancelled) {
          setProducts(data);
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
  }, []);

  const categories = ['all', ...new Set(products.map((p) => p.category))];

  const filtered =
    category === 'all' ? products : products.filter((p) => p.category === category);

  return (
    <div className="shop">
      <div className="shop__header">
        <h1 className="shop__title">Our Products</h1>
        <p className="shop__sub">Find something you love from our curated collection.</p>

        {!loading && !error && (
          <div className="shop__filters" role="group" aria-label="Filter by category">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`shop__filter-btn${category === cat ? ' active' : ''}`}
                onClick={() => setCategory(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        )}
      </div>

      {loading && (
        <div className="shop__grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="shop__skeleton" />
          ))}
        </div>
      )}

      {error && (
        <div className="shop__error">
          <span>⚠️</span>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      )}

      {!loading && !error && (
        <div className="shop__grid">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ShopPage;
