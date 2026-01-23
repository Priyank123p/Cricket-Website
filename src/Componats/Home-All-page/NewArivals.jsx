import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart, Truck, Star } from 'lucide-react';
import './NewArivals.css';
import { useCart } from '../Context/CartContext';

import Img1 from '../../Img/Product-IMG/New Pro Players Edition-IMG.png';
import Img2 from '../../Img/Product-IMG/New Premium Players-IMG.png';
import Img3 from '../../Img/Product-IMG/72 Black Edition-IMG.jpeg';
import Img4 from '../../Img/Product-IMG/Ciel Fighter AK 47 hard tennis cricket bat-IMG.jpeg';
import Img5 from '../../Img/Cricket-Ball/Singal-Yallow-Nivia.png';
import Img6 from '../../Img/Cricket-Ball/Singal-Red-Nivia.png';
import Img7 from '../../Img/Collection-IMG/ring-chevron-bat-grip_2.jpg';
import Img8 from '../../Img/Collection-IMG/Gloves.png';

const products = [
  {
    id: 1,
    name: "New Pro Players Edition",
    category: "",
    price: "₹2,000",
    image: Img1,
  },
  {
    id: 2,
    name: "New Premium Players",
    category: "",
    price: "₹1,899",
    image: Img2,
  },
  {
    id: 3,
    name: "72 Black Edition Cricket Bat",
    category: "",
    price: "₹5,500",
    image: Img3,
  },
  {
    id: 4,
    name: "Ciel Fighter AK 47 hard tennis cricket bat",
    category: "",
    price: "₹3,000",
    image: Img4,
  },
  {
    id: 5,
    name: "Nivia Light Weight Cricket Tennis Ball",
    category: "",
    price: "₹499",
    image: Img5,
  },
  {
    id: 6,
    name: "Nivia Heavy Weight Tennis Cricket Ball",
    category: "",
    price: "₹599",
    image: Img6,
  },
  {
    id: 7,
    name: "Chevron Bat Grip",
    category: "",
    price: "₹299",
    image: Img7,
  },
  {
    id: 8,
    name: "Gloves",
    category: "",
    price: "₹299",
    image: Img8,
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
    <>

      <section className="new-arrivals-section">
        <div className="container">

          {/* Section Heading */}
          <div className="section-heading-wrapper">
            <h1 className="background-text">JM SPORTS</h1>
            <motion.div
              className="section-heading"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="section-title">Our Product</h2>
              <p className="section-subtitle">SHOP PREMIUM CRICKET BATS AT JM SPORTS</p>
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
                className="new-arrival-card"
                variants={cardVariants}
                whileHover={{ scale: 1.02 }}
              >
                <div className="image-wrapper">
                  <img src={product.image} alt={product.name} className="product-image" />

                  {/* <button className="wishlist-btn" aria-label="Add to Wishlist">
                    <Heart size={20} />
                  </button> */}
                </div>

                <div className="product-details">
                  <div className="product-category">{product.category || "Cricket Bat"}</div>
                  <h3 className="product-name">{product.name}</h3>
                  <div className="star-rating">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="#FFC107" color="#FFC107" />
                    ))}
                    <span className="rating-count">(12)</span>
                  </div>
                  {/* <div className="product-price">{product.price}</div> */}

                  {/* <button className="add-btn" onClick={() => handleAddToCart(product)}>
                    <ShoppingCart size={18} />
                    Add to Cart
                  </button> */}
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* Free Shipping Marquee */}
      <div className="marquee-container">
        <div className="marquee-content">
          {[...Array(10)].map((_, index) => (
            <div className="marquee-item" key={index}>
              <Truck size={24} />
              <span>Free Shipping</span>
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {[...Array(10)].map((_, index) => (
            <div className="marquee-item" key={`duplicate-${index}`}>
              <Truck size={24} />
              <span>Free Shipping</span>
            </div>
          ))}
        </div>
      </div>

    </>
  );
};

export default NewArivals;