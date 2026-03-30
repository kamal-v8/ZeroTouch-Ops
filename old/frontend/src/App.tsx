import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Search, Menu, X, Star } from 'lucide-react'

interface Product {
  id: number
  name: string
  price: number
  color: string
}

function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [cartCount, setCartCount] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Failed to fetch products', err))
  }, [])

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-content">
          <div className="brand">ZAPTY</div>
          <div className="nav-links">
            <a href="#">Shop</a>
            <a href="#">Collections</a>
            <a href="#">About</a>
          </div>
          <div className="nav-actions">
            <Search className="icon" />
            <div className="cart-trigger" onClick={() => setCartCount(c => c + 1)}>
              <ShoppingBag className="icon" />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </div>
            <Menu className="icon mobile-only" onClick={() => setIsMenuOpen(true)} />
          </div>
        </div>
      </nav>

      <main className="hero">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-content"
        >
          <h1>Elevate Your Lifestyle</h1>
          <p>Discover our curated collection of premium essentials designed for the modern world.</p>
          <button className="btn-primary">Shop Now</button>
        </motion.div>
      </main>

      <section className="product-grid">
        <div className="section-header">
          <h2>Featured Products</h2>
        </div>
        <div className="grid">
          {products.map((product) => (
            <motion.div 
              key={product.id}
              whileHover={{ y: -10 }}
              className="product-card"
            >
              <div className="product-image-placeholder" style={{ background: `linear-gradient(135deg, ${product.color}22, ${product.color}66)` }}>
                <div className="product-shape" style={{ backgroundColor: product.color }}></div>
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="price">${product.price}</p>
                <div className="rating">
                  <Star className="star-icon" size={14} fill="#fbbf24" stroke="#fbbf24" />
                  <span>4.9 (120 reviews)</span>
                </div>
                <button className="add-to-cart" onClick={() => setCartCount(c => c + 1)}>
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="mobile-menu"
          >
            <div className="menu-header">
              <div className="brand">ZAPTY</div>
              <X onClick={() => setIsMenuOpen(false)} />
            </div>
            <div className="menu-links">
              <a href="#">Shop</a>
              <a href="#">Collections</a>
              <a href="#">About</a>
              <a href="#">Contact</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">ZAPTY</div>
          <div className="footer-links">
            <div className="link-group">
              <h4>Support</h4>
              <a href="#">Shipping</a>
              <a href="#">Returns</a>
              <a href="#">Contact</a>
            </div>
            <div className="link-group">
              <h4>Company</h4>
              <a href="#">About</a>
              <a href="#">Sustainability</a>
              <a href="#">Press</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; 2026 Zapty. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default App
