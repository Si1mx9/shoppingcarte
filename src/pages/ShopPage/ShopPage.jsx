import { useState, useEffect, useMemo } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import './ShopPage.css';

function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default');

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

  const categories = useMemo(
    () => ['all', ...new Set(products.map((p) => p.category))],
    [products]
  );

  const filtered = useMemo(() => {
    let result = category === 'all' ? products : products.filter((p) => p.category === category);

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    switch (sort) {
      case 'price-asc':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result = [...result].sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return result;
  }, [products, category, search, sort]);

  return (
    <div className="shop">
      <div className="shop__header">
        <h1 className="shop__title">Our Products</h1>
        <p className="shop__sub">Find something you love from our curated collection.</p>

        {!loading && !error && (
          <>
            <div className="shop__controls">
              <div className="shop__search">
                <span className="shop__search-icon" aria-hidden="true">🔍</span>
                <input
                  type="text"
                  className="shop__search-input"
                  placeholder="Search products…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  aria-label="Search products"
                />
                {search && (
                  <button
                    className="shop__search-clear"
                    onClick={() => setSearch('')}
                    aria-label="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>

              <select
                className="shop__sort"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                aria-label="Sort products"
              >
                <option value="default">Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>

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
          </>
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
          <span aria-hidden="true">⚠️</span>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="shop__empty">
          <span aria-hidden="true">🔍</span>
          <p>No products match your search.</p>
          <button className="shop__filter-btn active" onClick={() => { setSearch(''); setCategory('all'); }}>
            Clear filters
          </button>
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
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
