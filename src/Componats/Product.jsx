
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Dropdown, Spinner } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Star, Check, Filter, ArrowRight, ShieldCheck, Truck, RefreshCw, CreditCard, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from './Context/CartContext';
import brandingImg from '../Img/Branding-IMG/WhatsApp Image 2026-01-12 at 5.15.28 PM.jpeg';
import productBanner from '../Img/AboutUs-IMG/Product-Banner.jpeg';
import './Product.css';



const Product = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ brand: 'All', priceRange: 'All' });
  const [sortBy, setSortBy] = useState('newest');
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const timestamp = new Date().getTime();
        const SHEET_URL = `https://docs.google.com/spreadsheets/d/e/2PACX-1vTJ-A4bqSpTZp0uox5KFH7cF03M8-fYNfSP_Wr5vNe75QhXiflNQDzr4W1l6073ceS3SSmjQu9Ieaij/pub?output=csv&cacheBust=${timestamp}`;
        console.log("Fetching data from:", SHEET_URL);

        const response = await fetch(SHEET_URL);
        const text = await response.text();
        console.log("Fetched data length:", text.length);

        // Simple CSV splitter that handles basic quotes
        const splitCSV = (str) => {
          const result = [];

          // Regex to match CSV fields: 
          // 1. Quoted string: "..." (handling escaped quotes "")
          // 2. Non-quoted string: anything until comma
          const regex = /(?:^|,)(?:"([^"]*(?:""[^"]*)*)"|([^",]*))/g;

          let matches;
          while ((matches = regex.exec(str)) !== null) {
            // Index 1 is quoted value, Index 2 is unquoted value
            let value = matches[1] ? matches[1].replace(/""/g, '"') : matches[2];
            result.push(value ? value.trim() : '');
          }
          return result;
        };

        const lines = text.split(/\r?\n/).map(line => line.trim()).filter(line => line);
        if (lines.length < 2) return;

        // Parse headers (assume first line is header)
        // Note: splitCSV returns an array including the empty match at end sometimes, so we filter/map carefully
        // But using a simpler split might be safer if we assume simple data. 
        // Let's use the explicit loop parser which is more robust than regex for edge cases, 
        // or a proven regex. The loop parser I wrote in test_csv_parse.js is good.

        const parseLine = (str) => {
          const result = [];
          let current = '';
          let inQuote = false;
          for (let i = 0; i < str.length; i++) {
            const char = str[i];
            if (char === '"') {
              inQuote = !inQuote;
            } else if (char === ',' && !inQuote) {
              result.push(current.trim());
              current = '';
            } else {
              current += char;
            }
          }
          result.push(current.trim());
          return result.map(v => v.replace(/^"|"$/g, '').replace(/""/g, '"'));
        };

        const headers = parseLine(lines[0]).map(h => h.toLowerCase());

        const processedData = lines.slice(1).map(line => {
          const values = parseLine(line);
          const row = {};
          headers.forEach((h, i) => {
            if (i < values.length) {
              row[h] = values[i];
            }
          });

          const rawPrice = row.price;
          const rawDiscount = row.discount;
          const rawImage = row.image;

          // Cleaning formatting if needed (e.g. remove commas in numbers)
          const cleanNumber = (val) => Number(String(val).replace(/[^0-9.]/g, '')) || 0;

          const mrp = cleanNumber(rawPrice);
          const discount = cleanNumber(rawDiscount);

          let sellingPrice = mrp;
          let displayOldPrice = null;

          if (discount > 0) {
            sellingPrice = mrp - (mrp * discount / 100);
            displayOldPrice = '₹' + mrp.toLocaleString('en-IN');
          }

          const displayPrice = '₹' + Math.floor(sellingPrice).toLocaleString('en-IN');

          return {
            id: row.id || Math.random(), // fallback ID
            name: row.name,
            brand: row.brand,
            weight: row.weight,
            rating: row.rating,
            badge: row.badge,
            price: displayPrice,
            oldPrice: displayOldPrice,
            originalPrice: mrp,
            discountPercentage: discount,
            image: rawImage
              ? String(rawImage).split(',').map(img => `/product-images/${img.trim()}`)
              : []
          };
        });

        setProducts(processedData);
      } catch (error) {
        console.error("Error fetching Google Sheet data:", error);
      }
    };

    fetchData();
  }, []);

  // Filter Logic
  const filteredProducts = products.filter(product => {
    if (filters.brand !== 'All' && String(product.brand) !== filters.brand) return false;
    const price = parseInt(String(product.price).replace(/[^0-9]/g, ''));
    if (filters.priceRange === 'Under 1k' && price > 1000) return false;
    if (filters.priceRange === '1k - 2k' && (price < 1000 || price > 2000)) return false;
    if (filters.priceRange === 'Above 2k' && price < 2000) return false;
    return true;
  });

  // Sort Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = parseInt(String(a.price).replace(/[^0-9]/g, ''));
    const priceB = parseInt(String(b.price).replace(/[^0-9]/g, ''));

    if (sortBy === 'price-low-high') return priceA - priceB;
    if (sortBy === 'price-high-low') return priceB - priceA;
    if (sortBy === 'best-selling') return b.rating - a.rating;
    return 0; // Default
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
        <img src={productBanner} alt="Master the Game, Dominate the Field" className="img-fluid w-100 banner-img" />
        <div className="hero-overlay"></div>
        <div className="mobile-banner-text">
          <h1>Products</h1>
          <p>Premium Cricket Gear for Champions</p>
        </div>
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
            <select className="filter-select" style={{ width: '150px' }} onChange={(e) => handleFilterChange('brand', e.target.value)}>
              <option value="All">All Brands</option>
              <option value="77">77</option>
              <option value="72">72</option>
              <option value="Ciel">Ciel</option>
            </select>
            <select className="filter-select" style={{ width: '150px' }} onChange={(e) => handleFilterChange('priceRange', e.target.value)}>
              <option value="All">Price Range</option>
              <option value="Under 1k">Under ₹1,000</option>
              <option value="1k - 2k">₹1,000 - ₹2,000</option>
              <option value="Above 2k">Above ₹2,000</option>
            </select>
          </div>
        </motion.div>

        {/* Products Grid */}
        <Row className="g-4">
          <AnimatePresence>
            {sortedProducts.map((product, index) => (
              <React.Fragment key={product.id}>


                <Col xs={6} md={6} lg={4} xl={3}>
                  <ProductCard product={product} addToCart={addToCart} index={index} />
                </Col>
              </React.Fragment>
            ))}
          </AnimatePresence>
        </Row>

        <div className="mb-5">
          <BrandingSection />
        </div>

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
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const images = Array.isArray(product.image) ? product.image : (product.image ? [product.image] : []);
  const hasMultipleImages = images.length > 1;

  const nextImage = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImgIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImgIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleAddToCart = () => {
    setLoading(true);
    setTimeout(() => {
      addToCart(product);
      setLoading(false);
      setAdded(true);
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
          {hasMultipleImages && (
            <>
              <button className="slider-btn prev" onClick={prevImage}>
                <ChevronLeft size={16} />
              </button>
              <button className="slider-btn next" onClick={nextImage}>
                <ChevronRight size={16} />
              </button>
            </>
          )}

          {images[currentImgIndex] && images[currentImgIndex].toLowerCase().endsWith('.mp4') ? (
            <video
              src={images[currentImgIndex]}
              className="product-img"
              autoPlay
              muted
              loop
              playsInline
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <img src={images[currentImgIndex]} alt={product.name} className="product-img" />
          )}
        </div>

        <div className="product-info mt-2">
          <h3 className="product-title">{product.name}</h3>
          <div className="product-specs">{product.brand} | {product.weight}</div>

          <div className="product-meta-row">
            <div className="product-price-block">
              <span className="current-price">{product.price}</span>
              <span className="old-price">{product.oldPrice}</span>
              {product.discountPercentage > 0 && (
                <small className="text-success ms-2 fw-bold">
                  {product.discountPercentage}% OFF
                </small>
              )}
            </div>

            <div className="product-rating">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} fill={i < Math.floor(product.rating) ? "#ffc107" : "none"} stroke="#ffc107" />
              ))}
              <span className="rating-text">({product.rating})</span>
            </div>
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
    </motion.div >
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
          <h2 className="branding-title">Master Class Engineering</h2>
          <p className="branding-text">
            Hand-crafted from the top 1% of Grade A English Willow, our bats are the pinnacle of cricketing excellence.
            Validated by international pros, they offer a sublime ping and an extended sweet spot.
            Engineered for those who refuse to compromise on performance.
          </p>

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