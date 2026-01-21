import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Layout/Header';
import Home from './Componats/Home';
import Product from './Componats/Product';
import AboutUs from './Componats/AboutUs';
import CotactUs from './Componats/CotactUs';
import AddCart from './Componats/AddCart';
import CricketBall from './Componats/CricketBall';
import Accessories from './Componats/Accessories';

import Loader from './Componats/Loader';
import { CartProvider } from './Componats/Context/CartContext';
import ScrollToTop from './Componats/ScrollToTop';
import Footer from './Layout/Footer';
import WhatsAppButton from './Componats/WhatsAppButton';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {loading ? (
        <Loader />
      ) : (
        <CartProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product" element={<Product />} />
              <Route path="/cricket-balls" element={<CricketBall />} />
              <Route path="/accessories" element={<Accessories />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<CotactUs />} />
              <Route path="/cart" element={<AddCart />} />
            </Routes>
            <WhatsAppButton />
            <Footer />
          </BrowserRouter>
        </CartProvider>
      )}
    </div>
  );
}

export default App;