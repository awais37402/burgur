import React, { useState, useEffect } from 'react';
import './Cart.css';

const Cart = ({ onBack }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Load cart items from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('bugurPremiumCart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    setIsLoading(false);
  }, []);

  // Save cart items
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('bugurPremiumCart', JSON.stringify(cartItems));
    }
  }, [cartItems, isLoading]);

  // Update quantity with animation
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    setIsAnimating(true);
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );

    setTimeout(() => setIsAnimating(false), 300);
  };

  // Remove item with animation
  const removeItem = (id) => {
    setIsAnimating(true);
    setTimeout(() => {
      setCartItems(prevItems => prevItems.filter(item => item.id !== id));
      setIsAnimating(false);
    }, 200);
  };

  // Apply coupon
  const applyCoupon = () => {
    if (couponCode === 'BUGUR20') {
      setDiscount(0.2); // 20% discount
      alert('Coupon applied! 20% discount added.');
    } else {
      alert('Invalid coupon code');
    }
  };

  // Calculate prices
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const discountAmount = subtotal * discount;
  const total = subtotal + tax - discountAmount;

  // Checkout handler
  const handleCheckout = () => {
    alert('Proceeding to secure checkout!');
  };

  // Explore Menu navigation
  const handleExploreMenu = () => {
    window.location.href = '/menu';
  };

  // Continue Shopping handler (using back button)
  const handleContinueShopping = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  if (isLoading) {
    return (
      <div className="bugur-cart-loading-screen">
        <div className="bugur-cart-loading-spinner"></div>
        <p>Loading your premium cart...</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="bugur-cart-empty-state">
        {onBack && (
          <button 
            onClick={handleContinueShopping}
            className="bugur-cart-back-btn"
          >
            ← Continue Shopping
          </button>
        )}
        <div className="bugur-cart-empty-icon">🛒</div>
        <h2>Your Bugur Cart is Empty</h2>
        <p>Discover our delicious burgers and add some to your cart</p>
        <button 
          className="bugur-cart-primary-btn"
          onClick={handleExploreMenu}
        >
          Explore Menu
        </button>
      </div>
    );
  }

  return (
    <div className={`bugur-cart-container ${isAnimating ? 'bugur-cart-animate' : ''}`}>
      {/* Back Button */}
      {onBack && (
        <button 
          onClick={handleContinueShopping}
          className="bugur-cart-back-btn"
        >
          ← Continue Shopping
        </button>
      )}

      <div className="bugur-cart-header">
        <h1 className="bugur-cart-title">Your Premium Cart</h1>
        <div className="bugur-cart-steps">
          <div className="bugur-cart-step active">Cart</div>
          <div className="bugur-cart-step">Delivery</div>
          <div className="bugur-cart-step">Payment</div>
        </div>
      </div>

      <div className="bugur-cart-content">
        <div className="bugur-cart-items-section">
          <div className="bugur-cart-items-header">
            <span className="bugur-cart-col-product">Product</span>
            <span className="bugur-cart-col-price">Price</span>
            <span className="bugur-cart-col-quantity">Quantity</span>
            <span className="bugur-cart-col-total">Total</span>
          </div>

          <div className="bugur-cart-items-list">
            {cartItems.map(item => (
              <div key={`bugur-item-${item.id}`} className="bugur-cart-item">
                <div className="bugur-cart-item-product">
                  <div className="bugur-cart-item-image-container">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="bugur-cart-item-image"
                    />
                    <button
                      className="bugur-cart-item-remove"
                      onClick={() => removeItem(item.id)}
                    >
                      ×
                    </button>
                  </div>
                  <div className="bugur-cart-item-details">
                    <h3 className="bugur-cart-item-name">{item.name}</h3>
                    <div className="bugur-cart-item-attributes">
                      <span className="bugur-cart-item-attribute">
                        <span className="bugur-cart-attribute-label">Size:</span> {item.size}
                      </span>
                      <span className="bugur-cart-item-attribute">
                        <span className="bugur-cart-attribute-label">Color:</span> {item.color}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bugur-cart-item-price">${item.price.toFixed(2)}</div>

                <div className="bugur-cart-item-quantity">
                  <button
                    className="bugur-cart-quantity-btn"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    −
                  </button>
                  <span className="bugur-cart-quantity-value">{item.quantity}</span>
                  <button
                    className="bugur-cart-quantity-btn"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <div className="bugur-cart-item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="bugur-cart-coupon-section">
            <input
              type="text"
              placeholder="Enter coupon code"
              className="bugur-cart-coupon-input"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button
              className="bugur-cart-coupon-btn"
              onClick={applyCoupon}
            >
              Apply Coupon
            </button>
          </div>
        </div>

        <div className="bugur-cart-summary-section">
          <div className="bugur-cart-summary-card">
            <h2 className="bugur-cart-summary-title">Order Summary</h2>

            <div className="bugur-cart-summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            {discount > 0 && (
              <div className="bugur-cart-summary-row discount">
                <span>Discount ({discount * 100}%)</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="bugur-cart-summary-row">
              <span>Estimated Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            <div className="bugur-cart-summary-divider"></div>

            <div className="bugur-cart-summary-row total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button
              className="bugur-cart-checkout-btn"
              onClick={handleCheckout}
            >
              Proceed to Secure Checkout
            </button>

            <div className="bugur-cart-payment-methods">
              <p className="bugur-cart-payment-title">We Accept:</p>
              <div className="bugur-cart-payment-icons">
                <span className="bugur-cart-payment-icon visa"></span>
                <span className="bugur-cart-payment-icon mastercard"></span>
                <span className="bugur-cart-payment-icon amex"></span>
                <span className="bugur-cart-payment-icon paypal"></span>
              </div>
            </div>

            <div className="bugur-cart-security-badge">
              <span className="bugur-cart-security-icon">🔒</span>
              <span>100% Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;