import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Layout/Header';
import Home from './Componats/Home';
import Product from './Componats/Product';
import AboutUs from './Componats/AboutUs';
import CotactUs from './Componats/CotactUs';
import AddCart from './Componats/AddCart';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<CotactUs />} />
          <Route path="/cart" element={<AddCart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
