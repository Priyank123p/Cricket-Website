import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart } from 'lucide-react';
import './NewArivals.css';
import { useCart } from '../Context/CartContext'; // Import useCart

import Img1 from '../../Img/Product-IMG/New Pro Players Edition-IMG.png';
import Img2 from '../../Img/Product-IMG/New Premium Players-IMG.png';
import Img3 from '../../Img/Product-IMG/77 CBS Edition 7 Star-IMG.png';
import Img4 from '../../Img/Product-IMG/Ciel Fighter AK 47 hard tennis cricket bat-IMG.jpeg';

const products = [
  {
    id: 1,
    name: "New Pro Players Edition",
    category: "",
    price: "₹2,799",
    image: Img1,
  },
  {
    id: 2,
    name: "New Premium Players",
    category: "",
    price: "₹8,499",
    image: Img2,
  },
  {
    id: 3,
    name: "77 CBS Edition 7 Star",
    category: "",
    price: "₹5,299",
    image: Img3,
  },
  {
    id: 4,
    name: "Ciel Fighter AK 47 hard tennis cricket bat",
    category: "",
    price: "₹3,000",
    image: Img4,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
      duration: 0.5,
    },
  },
};

const NewArivals = () => {
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <section className="new-arrivals-section">
      <div className="container">

        {/* Section Heading */}
        <div className="section-heading-wrapper">
          <h1 className="background-text">RK SPORTS</h1>
          <motion.div
            className="section-heading"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title">New Arrivals</h2>
            <p className="section-subtitle">SHOP ALL SPORTS ITEM AT RK SPORTS</p>
          </motion.div>
        </div>

        {/* Product Grid */}
        <motion.div
          className="products-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {products.map((product) => (
            <motion.div
              key={product.id}
              className="product-card"
              variants={cardVariants}
              whileHover={{ scale: 1.02 }} // Subtle scale up on hover
            >
              <div className="image-wrapper">
                <span className="badge-new">New</span>

                <img src={product.image} alt={product.name} className="product-image" />

                <div className="add-to-cart-overlay">
                  <button className="add-btn" onClick={() => handleAddToCart(product)}>
                    <ShoppingCart size={18} />
                    Add to Cart
                  </button>
                </div>
              </div>

              <div className="product-details">
                <div>
                  <div className="product-category">{product.category}</div>
                  <h3 className="product-name">{product.name}</h3>
                </div>
                <div className="product-price">{product.price}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default NewArivals;