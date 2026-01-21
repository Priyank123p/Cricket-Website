
import React, { useState } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Star, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from './Context/CartContext';
import productBanner from '../Img/AboutUs-IMG/Product-Banner.jpeg'; // Reusing banner
import './Product.css'; // Reusing styles

// Import Images
import AccessorieImg from '../Img/Collection-IMG/ring-chevron-bat-grip_2.jpg';

const Accessories = () => {
    const { addToCart } = useCart();
    const [filters, setFilters] = useState({ priceRange: 'All' });
    const [sortBy, setSortBy] = useState('newest');

    // Hardcoded Accessories Data
    const products = [
        {
            id: "acc-1",
            name: "Chevron Bat Grip",
            brand: "",
            price: "₹299",
            rating: 4.7,
            image: [AccessorieImg],
            description: "High quality chevron grip for cricket bats."
        },
        {
            id: "acc-2",
            name: "Batting Gloves",
            brand: "",
            price: "₹299",
            rating: 4.6,
            image: [AccessorieImg],
            description: "Pro quality batting gloves."
        },
        {
            id: "acc-3",
            name: "Cricket Helmet",
            brand: "",
            price: "₹299",
            rating: 4.9,
            image: [AccessorieImg],
            description: "High impact resistance helmet."
        }
    ];

    // Filter Logic
    const filteredProducts = products.filter(product => {
        const price = parseInt(String(product.price).replace(/[^0-9]/g, ''));
        if (filters.priceRange === 'Under 500' && price > 500) return false;
        if (filters.priceRange === '500 - 1500' && (price < 500 || price > 1500)) return false;
        if (filters.priceRange === 'Above 1500' && price < 1500) return false;
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
                <img src={productBanner} alt="Accessories" className="img-fluid w-100 banner-img" />
                <div className="hero-overlay"></div>
                <div className="mobile-banner-text">
                    <h1>Accessories</h1>
                    <p>Essential Gear for Every Cricketer</p>
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
                        <select className="filter-select" style={{ width: '150px' }} onChange={(e) => handleFilterChange('priceRange', e.target.value)}>
                            <option value="All">Price Range</option>
                            <option value="Under 500">Under ₹500</option>
                            <option value="500 - 1500">₹500 - ₹1,500</option>
                            <option value="Above 1500">Above ₹1,500</option>
                        </select>
                    </div>
                </motion.div>

                <Row className="g-4">
                    <AnimatePresence>
                        {sortedProducts.map((product, index) => (
                            <Col key={product.id} xs={6} md={6} lg={4} xl={3}>
                                <ProductCard product={product} addToCart={addToCart} index={index} />
                            </Col>
                        ))}
                    </AnimatePresence>
                </Row>
            </Container>
        </div>
    );
};

// Reusing ProductCard sub-component structure
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
                    <img src={images[currentImgIndex]} alt={product.name} className="product-img" />
                </div>

                <div className="product-info mt-2">
                    <h3 className="product-title">{product.name}</h3>
                    <div className="product-specs">{product.brand}</div>

                    <div className="product-meta-row">
                        <div className="product-price-block">
                            <span className="current-price">{product.price}</span>
                            <span className="old-price">{product.oldPrice}</span>
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
        </motion.div>
    );
};

export default Accessories;
