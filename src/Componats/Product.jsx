
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Dropdown, Spinner } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Star, Check, Filter, ArrowRight, ShieldCheck, Truck, RefreshCw, CreditCard } from 'lucide-react';
import { useCart } from './Context/CartContext';
import brandingImg from '../Img/Branding-IMG/Cricket_Bat_Page.webp';
import productBanner from '../Img/product-banner.png';
import './Product.css';

// Mock Data
const PRODUCTS_DATA = [
  { id: 1, name: "MRF Genius Grand Edition", price: "₹24,999", oldPrice: "₹30,000", image: "https://www.mrfsports.com/sites/default/files/styles/homepage_bat_listing/public/5.%20GENIUS%20GRAND.png?itok=nShyNO-Z", brand: "MRF", category: "English Willow", weight: "1180g", rating: 4.8, badge: "New" },

  { id: 2, name: "SG Player's Edition", price: "₹18,499", oldPrice: "₹22,000", image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQi147E0VkdWeVm80aGj2cBmgXxGkfXpEhuXMWq4mZrW61VVK9tOpPPuYJjt4K9jVFumXbxdgLTyID3mj3hZTylqopDgmMMvUM_dLt_xWU9aE_S0sa1KDavLQu_", brand: "SG", category: "English Willow", weight: "1190g", rating: 4.7, badge: "New" },

  { id: 3, name: "Kookaburra Aura Pro", price: "₹21,999", oldPrice: "₹25,000", image: "https://crickstore.com/cdn/shop/files/2B13411-AuraPro8.0CricketBat-2_ff7ab2c5-dda6-4de3-b7c0-8f194636deb6.jpg?v=1761809367&width=480", brand: "Kookaburra", category: "Kashmir Willow", weight: "1170g", rating: 4.9, badge: "Hot" },

  { id: 4, name: "SS Ton Reserve", price: "₹15,999", oldPrice: "₹19,500", image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcS7unjcWLaN7yL2kXrN1mSOmHRNI-zaB5VXpCroG_Dxm7M2k4K4baU4Ysq7mIgM6mwFbjzuHFH5hUhezbj9gPgkWaenp0WX-6J7CvIyqeAsHjzl9P5a1p-HGQ", brand: "SS", category: "English Willow", weight: "1200g", rating: 4.6, badge: "Sale" },

  { id: 5, name: "GM Diamond DXM", price: "₹28,999", oldPrice: "₹34,000", image: "https://images-static.nykaa.com/media/catalog/product/tr:h-800,w-800,cm-pad_resize/8/6/86d11e2GM-DIAMONDEXCALIBUR-EW-BAT-S5_1.jpg", brand: "GM", category: "English Willow", weight: "1160g", rating: 5.0, badge: "" },

  { id: 6, name: "DSC Blak 44", price: "₹9,999", oldPrice: "₹12,000", image: "https://cdnmedia.dsc-cricket.com/media/catalog/product/cache/42540e3df8c40aae349dc161e4942d7b/d/s/dsc-blak-44-india-range-kashmir-willow-cricket-bat-2.webp", brand: "DSC", category: "Kashmir Willow", weight: "1180g", rating: 4.3, badge: "" },

  { id: 7, name: "New Balance DC 1080", price: "₹3,499", oldPrice: "₹3,699", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKtPrJlvb0NRzZgX4bMmOkzFsil-iISCKaYg&s", brand: "NEW BALANCE", category: "English Willow", weight: "1090g", rating: 4.7, badge: "New" },

  { id: 8, name: "Hard Tennis Scoop Bat (Double Blade)- Burnt", price: "₹2,599", oldPrice: "₹2,999", image: "https://tramboosports.com/cdn/shop/files/bat_1_a6_1060x.jpg?v=1744983988", brand: "TRAMBOO", category: "Kashmir Willow", weight: "1210g", rating: 4.5, badge: "Sale" },

  { id: 9, name: "SG Kashmir Willow Cricket Bat (Tennis ball) T-1000", price: "₹1,772", oldPrice: "₹1,969", image: "https://shop.teamsg.in/cdn/shop/files/Untitled_design_67.png?v=1745395745&width=990", brand: "SG", category: " Kashmir Willow", weight: "1175g", rating: 4.6, badge: "New" },

  { id: 10, name: "DSC Pentazone Kashmir Willow Tennis Cricket Bat", price: "₹3,297", oldPrice: "₹3,599", image: "https://m.media-amazon.com/images/I/51dygohcgAL._SX679_.jpg", brand: "DSC", category: "Kashmir Willow", weight: "1000g", rating: 4.9, badge: "Premium" },

  { id: 11, name: "DSC Wood County Super Cricket Bat", price: "₹2,105 ", oldPrice: "₹2,799", image: "https://m.media-amazon.com/images/I/51F7AP24GlL._SX679_.jpg", brand: "DSC", category: "Kashmir Willow", weight: "1185g", rating: 4.2, badge: "" },

  { id: 12, name: "Ultralite Gully Tennis Bat", price: "₹2,799", oldPrice: "₹2,999", image: "https://tramboosports.com/cdn/shop/files/blue_bat_all_sides_1060x.jpg?v=1750093707", brand: "TRAMBOO", category: "Kashmir Willow", weight: "1200g", rating: 4.4, badge: "Sale" },
];

const Product = () => {
  const [products, setProducts] = useState(PRODUCTS_DATA);
  const [filters, setFilters] = useState({ brand: 'All', priceRange: 'All' });
  const [sortBy, setSortBy] = useState('newest');
  const { addToCart } = useCart();

  // Filter Logic
  const filteredProducts = PRODUCTS_DATA.filter(product => {
    if (filters.brand !== 'All' && product.brand !== filters.brand) return false;
    // Simple price logic for demo (parsing strings)
    const price = parseInt(product.price.replace(/[^0-9]/g, ''));
    if (filters.priceRange === 'Under 10k' && price > 10000) return false;
    if (filters.priceRange === '10k - 20k' && (price < 10000 || price > 20000)) return false;
    if (filters.priceRange === 'Above 20k' && price < 20000) return false;
    return true;
  });

  // Sort Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
    const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));

    if (sortBy === 'price-low-high') return priceA - priceB;
    if (sortBy === 'price-high-low') return priceB - priceA;
    if (sortBy === 'best-selling') return b.rating - a.rating; // Mock usage of rating for best selling
    return 0; // Default (newest - assuming original order is relatively new)
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="product-page-container">
      <motion.div
        className="product-hero-banner mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <img src={productBanner} alt="Master the Game, Dominate the Field" className="img-fluid w-100" />
      </motion.div>
      <Container>

        {/* Filter & Sort Section */}
        <motion.div
          className="filter-sort-container d-flex flex-wrap justify-content-between align-items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="d-flex gap-3 flex-wrap">
            <div className="d-flex align-items-center gap-2">
              <Filter size={18} />
              <span className="fw-bold">Filters:</span>
            </div>
            <select className="filter-select" style={{ width: '150px' }} onChange={(e) => handleFilterChange('brand', e.target.value)}>
              <option value="All">All Brands</option>
              <option value="MRF">MRF</option>
              <option value="SG">SG</option>
              <option value="SS">SS</option>
              <option value="DSC">DSC</option>
              <option value="NEW BALANCE">NEW BALANCE</option>
              <option value="TRAMBOO">TRAMBOO</option>
              <option value="GM">GM</option>
              <option value="RK">RK Edition</option>
              <option value="Kookaburra">Kookaburra</option>
            </select>
            <select className="filter-select" style={{ width: '150px' }} onChange={(e) => handleFilterChange('priceRange', e.target.value)}>
              <option value="All">Price Range</option>
              <option value="Under 10k">Under ₹10,000</option>
              <option value="10k - 20k">₹10,000 - ₹20,000</option>
              <option value="Above 20k">Above ₹20,000</option>
            </select>
          </div>

          <div className="d-flex align-items-center gap-2 mt-3 mt-md-0">
            <span className="text-muted small">Sort By:</span>
            <select className="sort-dropdown" onChange={(e) => setSortBy(e.target.value)}>
              <option value="newest">Newest</option>
              <option value="price-low-high">Price: Low to High</option>
              <option value="price-high-low">Price: High to Low</option>
              <option value="best-selling">Best Selling</option>
            </select>
          </div>
        </motion.div>

        {/* Products Grid */}
        <Row className="g-4">
          <AnimatePresence>
            {sortedProducts.map((product, index) => (
              <React.Fragment key={product.id}>
                {/* Insert Branding Section after 8th item (index 7) */}
                {index === 8 && (
                  <Col xs={12} className="p-0">
                    <BrandingSection />
                  </Col>
                )}

                <Col xs={12} md={6} lg={4} xl={3}>
                  <ProductCard product={product} addToCart={addToCart} index={index} />
                </Col>
              </React.Fragment>
            ))}
          </AnimatePresence>
        </Row>

        {/* Trust Section */}
        <TrustSection />

      </Container>
    </div>
  );
};

// Sub-components

const ProductCard = ({ product, addToCart, index }) => {
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    setLoading(true);
    setTimeout(() => {
      addToCart(product);
      setLoading(false);
      setAdded(true);

      // Allow re-adding after 2 seconds or keep as added?
      setTimeout(() => setAdded(false), 2000);
    }, 500);
  };

  return (
    <motion.div
      className="product-card-wrapper h-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="product-card">
        {product.badge && (
          <span className={`product-badge ${product.badge === 'New' ? 'badge-new' : product.badge === 'Hot' ? 'badge-hot' : 'badge-sale'}`}>
            {product.badge}
          </span>
        )}

        <div className="product-img-wrapper">
          <img src={product.image} alt={product.name} className="product-img" />
        </div>

        <div className="product-info mt-2">
          <h3 className="product-title">{product.name}</h3>
          <div className="product-specs">{product.brand} | {product.weight}</div>

          <div className="product-rating">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill={i < Math.floor(product.rating) ? "#ffc107" : "none"} stroke="#ffc107" />
            ))}
            <span className="text-muted ms-1">({product.rating})</span>
          </div>

          <div className="product-price-row">
            <span className="current-price">{product.price}</span>
            <span className="old-price">{product.oldPrice}</span>
          </div>
        </div>

        <button
          className="btn-add-cart"
          onClick={handleAddToCart}
          disabled={loading || added}
        >
          {loading ? (
            <Spinner animation="border" size="sm" />
          ) : added ? (
            <>
              <Check size={18} /> Added
            </>
          ) : (
            <>
              <ShoppingCart size={18} /> Add to Cart
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};

const BrandingSection = () => {
  return (
    <motion.div
      className="branding-section"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <Row className="align-items-center">
        <Col md={7} className="branding-content">
          <h2 className="branding-title">Power Your Game</h2>
          <p className="branding-text">Premium English Willow Bats used by international professionals. Experience specific engineering designed for maximum boundaries.</p>
          <button className="branding-btn">
            Explore Collection <ArrowRight size={20} className="ms-2" />
          </button>
        </Col>
        <Col md={5}>
          <div className="branding-img-container">
            <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
              <img
                src={brandingImg}
                alt="Premium Cricket Bat"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: '20px',
                  border: '3px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.3)'
                }}
              />
            </div>
          </div>
        </Col>
      </Row>
    </motion.div>
  );
};

const TrustSection = () => {
  return (
    <div className="trust-section">
      <Row>
        <Col xs={6} md={3} className="mb-4 mb-md-0">
          <div className="trust-item">
            <ShieldCheck size={32} className="trust-icon" />
            <span className="trust-text">100% Genuine</span>
          </div>
        </Col>
        <Col xs={6} md={3} className="mb-4 mb-md-0">
          <div className="trust-item">
            <Truck size={32} className="trust-icon" />
            <span className="trust-text">Free Shipping</span>
          </div>
        </Col>
        <Col xs={6} md={3} className="mb-4 mb-md-0">
          <div className="trust-item">
            <RefreshCw size={32} className="trust-icon" />
            <span className="trust-text">Easy Returns</span>
          </div>
        </Col>
        <Col xs={6} md={3} className="mb-4 mb-md-0">
          <div className="trust-item">
            <CreditCard size={32} className="trust-icon" />
            <span className="trust-text">Secure Payment</span>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Product;