import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { ToastProvider } from './context/ToastContext.jsx'
import { WishlistProvider } from './context/WishlistContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <ToastProvider>
        <WishlistProvider>
          <App />
        </WishlistProvider>
      </ToastProvider>
    </CartProvider>
  </StrictMode>,
)
