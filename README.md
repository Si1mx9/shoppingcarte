# ShopCarte — Premium Online Store

A modern, single-page e-commerce storefront built with React. Browse products, filter by category, manage a shopping cart with quantity controls, and view an order summary with dynamic shipping logic.

## Tech Stack

- **React 19** with Context API for state management
- **Vite 8** for dev server and production builds
- **react-router-dom v7** for client-side routing
- **CSS** with custom properties (design tokens) for a dark theme
- **Fake Store API** as the product data source
- **ESLint** flat config with React Compiler

## Features

- **Product Catalog** — products fetched from Fake Store API with loading skeletons and error handling
- **Category Filtering** — filter products by category using pill buttons
- **Shopping Cart** — add/remove items, adjust quantities, line-item subtotals
- **Order Summary** — subtotal, shipping (free over $50), total
- **Responsive Design** — adapts from mobile to desktop

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
├── main.jsx                  # Entry point
├── App.jsx                   # Root component with router
├── context/
│   └── CartContext.jsx       # Cart state management
├── components/
│   ├── Navbar/               # Navigation bar with cart badge
│   ├── ProductCard/          # Product card component
│   └── CartItem/             # Cart line item component
└── pages/
    ├── HomePage/             # Landing page
    ├── ShopPage/             # Product catalog
    └── CartPage/             # Shopping cart
```

## Routes

| Path | Page |
|------|------|
| `/` | Home — marketing landing page |
| `/shop` | Shop — product catalog |
| `/cart` | Cart — shopping cart with order summary |
