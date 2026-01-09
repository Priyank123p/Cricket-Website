import React from 'react';
import { useCart } from './Context/CartContext';
import './AddCart.css';
import { Trash2, Plus, Minus } from 'lucide-react';

const AddCart = () => {
  const { cartItems, removeFromCart, getCartTotal, increaseQuantity, decreaseQuantity } = useCart();

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1 className="cart-title">Your Shopping Cart</h1>

        <div className="cart-content">
          {/* Cart Items List */}
          <div className="cart-items-container">
            {cartItems.length === 0 ? (
              <div className="cart-empty">
                <p>Your cart is currently empty.</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-details">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <p className="cart-item-price">{item.price}</p>
                    <p className="cart-item-price">{item.price}</p>
                    <div className="quantity-controls">
                      <button
                        className="qty-btn"
                        onClick={() => decreaseQuantity(item.id)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => increaseQuantity(item.id)}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove item"
                  >
                    <Trash2 size={16} style={{ marginRight: '5px' }} />
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Order Summary */}
          {cartItems.length > 0 && (
            <div className="cart-summary">
              <h2 className="summary-title">Order Summary</h2>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{getCartTotal().toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>₹{getCartTotal().toLocaleString()}</span>
              </div>
              <button className="checkout-btn">Proceed to Checkout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddCart;