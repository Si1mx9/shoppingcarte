import { Link } from 'react-router-dom';
import './HomePage.css';

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
];

function HomePage() {
  return (
    <div className="home">
      {/* Hero */}
      <section className="home__hero">
        <div className="home__hero-bg" aria-hidden="true" />
        <div className="home__hero-content fade-up">
          <span className="home__hero-tag">✦ New Collection 2026</span>
          <h1 className="home__hero-title">
            Shop smarter,<br />
            <span className="home__hero-gradient">live better.</span>
          </h1>
          <p className="home__hero-sub">
            Discover thousands of premium products curated just for you.
            Fast shipping, easy returns, unbeatable prices.
          </p>
          <Link to="/shop" className="home__hero-cta">
            Explore Shop →
          </Link>
        </div>

        <div className="home__hero-visual fade-up" aria-hidden="true">
          <div className="home__orb home__orb--1" />
          <div className="home__orb home__orb--2" />
          <div className="home__float-card home__float-card--a">
            <span>🧴</span>
            <span>Beauty</span>
          </div>
          <div className="home__float-card home__float-card--b">
            <span>👕</span>
            <span>Fashion</span>
          </div>
          <div className="home__float-card home__float-card--c">
            <span>💍</span>
            <span>Jewelry</span>
          </div>
          <div className="home__float-card home__float-card--d">
            <span>📱</span>
            <span>Electronics</span>
          </div>
        </div>
      </section>

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
