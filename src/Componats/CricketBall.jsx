
import React, { useState } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Star, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from './Context/CartContext';
import productBanner from '../Img/AboutUs-IMG/CricketBall-Banner.png';
import './Product.css';

// Import Images
import BallImg1 from '../Img/Cricket-Ball/Yallow-Nivia.jpg';
import BallImg2 from '../Img/Cricket-Ball/Red-Nivia.jpg';
import BallImg3 from '../Img/Cricket-Ball/Singal-Yallow-Nivia.jpg';
import BallImg4 from '../Img/Cricket-Ball/Singal-Red-Nivia.jpg';

const CricketBall = () => {
    const { addToCart } = useCart();
    const [filters, setFilters] = useState({ priceRange: 'All' });
    const [sortBy, setSortBy] = useState('newest');

    // Hardcoded Cricket Ball Data
    const products = [
        {
            id: "ball-1",
            name: "Nivia Light Weight Cricket Tennis Ball",
            brand: "Nivia",
            price: "₹750",
            rating: 4.5,
            image: [BallImg1],
        },
        {
            id: "ball-2",
            name: "Nivia Heavy Weight Tennis Cricket Ball",
            brand: "Nivia",
            price: "₹870",
            rating: 4.8,
            image: [BallImg2],
        },
        {
            id: "ball-3",
            name: "Nivia Light Weight Cricket Tennis Ball",
            brand: "Nivia",
            price: "₹65",
            rating: 4.8,
            image: [BallImg3],
        },
        {
            id: "ball-4",
            name: "Nivia Heavy Weight Tennis Cricket Ball",
            brand: "Nivia",
            price: "₹75",
            rating: 4.8,
            image: [BallImg4],
        }
    ];

    // Filter Logic
    const filteredProducts = products.filter(product => {
        const price = parseInt(String(product.price).replace(/[^0-9]/g, ''));
        if (filters.priceRange === 'Under 500' && price > 500) return false;
        if (filters.priceRange === '500 - 1000' && (price < 500 || price > 1000)) return false;
        if (filters.priceRange === 'Above 1000' && price < 1000) return false;
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
                <img
                    src={productBanner}
                    alt="Cricket Balls"
                    className="img-fluid w-100"
                    style={{ height: "350px", objectFit: "cover" }}
                />
                <div className="hero-overlay"></div>
                <div className="mobile-banner-text">
                    <h1>Cricket Balls</h1>
                    <p>Premium Leather Balls for Matches & Practice</p>
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
                            <option value="All">All Price</option>
                            <option value="Under 500">Under ₹500</option>
                            <option value="500 - 1000">₹500 - ₹1,000</option>
                            <option value="Above 1000">Above ₹1,000</option>
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

export default CricketBall;
