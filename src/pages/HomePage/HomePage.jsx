import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import './HomePage.css';

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function generateParticles(n) {
  return Array.from({ length: n }, () => ({
    left: `${rand(0, 100)}%`,
    top: `${rand(0, 100)}%`,
    w: `${rand(2, 6)}px`,
    h: `${rand(2, 6)}px`,
    delay: `${rand(0, 5)}s`,
    duration: `${rand(3, 7)}s`,
  }));
}

const particles = generateParticles(20);

const features = [
  {
    icon: '🚚',
    title: 'Free Shipping',
    desc: 'On all orders over $50. Always fast, always free.',
  },
  {
    icon: '✨',
    title: 'Premium Quality',
    desc: 'Carefully curated products that meet the highest standards.',
  },
  {
    icon: '🔄',
    title: 'Easy Returns',
    desc: '30-day hassle-free returns. No questions asked.',
  },
  {
    icon: '🔒',
    title: 'Secure Checkout',
    desc: 'Protected by industry-standard encryption.',
  },
];

const testimonials = [
  {
    name: 'Sarah M.',
    text: 'Found exactly what I was looking for. Fast shipping and great quality!',
    rating: 5,
  },
  {
    name: 'James K.',
    text: 'The best online shopping experience I\'ve had. The UI is gorgeous.',
    rating: 5,
  },
  {
    name: 'Elena R.',
    text: 'Easy returns and amazing customer support. Highly recommend!',
    rating: 5,
  },
];

const stats = [
  { value: '10K+', label: 'Products' },
  { value: '50K+', label: 'Happy Customers' },
  { value: '4.9★', label: 'Average Rating' },
  { value: '99%', label: 'Satisfaction' },
];

function HomePage() {
  const [featured, setFeatured] = useState([]);
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const [email, setEmail] = useState('');
  const [tagIndex, setTagIndex] = useState(0);

  const tags = ['New Collection 2026', 'Up to 40% Off', 'Free Shipping Today'];

  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=4')
      .then((res) => res.json())
      .then((data) => setFeatured(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTagIndex((prev) => (prev + 1) % tags.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [tags.length]);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (email) {
      addToast('Subscribed! Thanks for signing up.', 'success');
      setEmail('');
    }
  };

  return (
    <div className="home">
      {/* Hero */}
      <section className="home__hero">
        <div className="home__hero-bg" aria-hidden="true" />
        <div className="home__hero-particles" aria-hidden="true">
          {particles.map((p, i) => (
            <div
              key={i}
              className="home__particle"
              style={{
                left: p.left,
                top: p.top,
                width: p.w,
                height: p.h,
                animationDelay: p.delay,
                animationDuration: p.duration,
              }}
            />
          ))}
        </div>

        <div className="home__hero-content fade-up">
          <span className="home__hero-tag" key={tagIndex}>
            ✦ {tags[tagIndex]}
          </span>
          <h1 className="home__hero-title">
            Shop smarter,<br />
            <span className="home__hero-gradient">live better.</span>
          </h1>
          <p className="home__hero-sub">
            Discover thousands of premium products curated just for you.
            Fast shipping, easy returns, unbeatable prices.
          </p>

          <div className="home__hero-buttons">
            <Link to="/shop" className="home__hero-cta">
              Explore Shop →
            </Link>
            <Link to="/cart" className="home__hero-cta-secondary">
              View Cart 🛒
            </Link>
          </div>
        </div>

        <div className="home__hero-visual fade-up" aria-hidden="true">
          <div className="home__orb home__orb--1" />
          <div className="home__orb home__orb--2" />
          <div className="home__orb home__orb--3" />
          <div className="home__float-card home__float-card--a">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            <span>Beauty</span>
          </div>
          <div className="home__float-card home__float-card--b">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            <span>Fashion</span>
          </div>
          <div className="home__float-card home__float-card--c">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M12 22V12" />
              <path d="M12 12L2 7" />
              <path d="M22 7l-10 5" />
            </svg>
            <span>Jewelry</span>
          </div>
          <div className="home__float-card home__float-card--d">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
              <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
              <rect x="9" y="9" width="6" height="6" />
              <line x1="9" y1="1" x2="9" y2="4" />
              <line x1="15" y1="1" x2="15" y2="4" />
              <line x1="9" y1="20" x2="9" y2="23" />
              <line x1="15" y1="20" x2="15" y2="23" />
              <line x1="20" y1="9" x2="23" y2="9" />
              <line x1="20" y1="14" x2="23" y2="14" />
              <line x1="1" y1="9" x2="4" y2="9" />
              <line x1="1" y1="14" x2="4" y2="14" />
            </svg>
            <span>Electronics</span>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="home__stats">
        <div className="home__stats-inner">
          {stats.map((s) => (
            <div key={s.label} className="home__stat fade-up">
              <span className="home__stat-value">{s.value}</span>
              <span className="home__stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      {featured.length > 0 && (
        <section className="home__featured">
          <h2 className="home__section-title">Featured Products</h2>
          <p className="home__section-sub">Hand-picked just for you</p>
          <div className="home__featured-grid">
            {featured.map((product, i) => (
              <div
                key={product.id}
                className="home__featured-card fade-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <Link to={`/product/${product.id}`} className="home__featured-image-wrap">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="home__featured-image"
                    loading="lazy"
                  />
                </Link>
                <div className="home__featured-body">
                  <span className="home__featured-category">{product.category}</span>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="home__featured-title">{product.title}</h3>
                  </Link>
                  <p className="home__featured-price">${product.price.toFixed(2)}</p>
                  <button
                    className="home__featured-add"
                    onClick={() => {
                      addToCart(product, 1);
                      addToast(`${product.title.slice(0, 30)}… added to cart`, 'success');
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <Link to="/shop" className="home__featured-all">
            View All Products →
          </Link>
        </section>
      )}

      {/* Features */}
      <section className="home__features">
        <h2 className="home__section-title">Why ShopCarte?</h2>
        <div className="home__features-grid">
          {features.map((f) => (
            <div key={f.title} className="home__feature-card fade-up">
              <span className="home__feature-icon">{f.icon}</span>
              <h3 className="home__feature-title">{f.title}</h3>
              <p className="home__feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="home__testimonials">
        <h2 className="home__section-title">What Our Customers Say</h2>
        <div className="home__testimonials-grid">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="home__testimonial-card fade-up"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="home__testimonial-stars">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <span key={j}>★</span>
                ))}
              </div>
              <p className="home__testimonial-text">&ldquo;{t.text}&rdquo;</p>
              <span className="home__testimonial-name">— {t.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="home__newsletter fade-up">
        <h2 className="home__newsletter-title">Stay in the Loop</h2>
        <p className="home__newsletter-sub">
          Get exclusive deals and new arrivals straight to your inbox.
        </p>
        <form className="home__newsletter-form" onSubmit={handleNewsletter}>
          <input
            type="email"
            className="home__newsletter-input"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Email for newsletter"
          />
          <button type="submit" className="home__newsletter-btn">
            Subscribe
          </button>
        </form>
      </section>

      {/* CTA Banner */}
      <section className="home__banner fade-up">
        <h2>Ready to find something you&#39;ll love?</h2>
        <Link to="/shop" className="home__hero-cta home__hero-cta--sm">
          Browse Products
        </Link>
      </section>
    </div>
  );
}

export default HomePage;
