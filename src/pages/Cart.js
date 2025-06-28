import React, { useState } from 'react';
import './Cart.css';

const Cart = ({ cartItems, updateQuantity, removeItem, onBack }) => {
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeStep, setActiveStep] = useState('cart'); // 'cart', 'delivery', 'payment'
  const [deliveryInfo, setDeliveryInfo] = useState({
    name: '',
    address: '',
    phone: '',
    instructions: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('credit');

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
    alert('Order placed successfully!');
    // Here you would typically send the order to your backend
  };

  // Continue Shopping handler
  const handleContinueShopping = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  // Handle delivery info change
  const handleDeliveryChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo(prev => ({ ...prev, [name]: value }));
  };

  // Proceed to next step
  const proceedToNextStep = () => {
    if (activeStep === 'cart') setActiveStep('delivery');
    else if (activeStep === 'delivery') setActiveStep('payment');
  };

  // Go back to previous step
  const goBackToPreviousStep = () => {
    if (activeStep === 'payment') setActiveStep('delivery');
    else if (activeStep === 'delivery') setActiveStep('cart');
  };

  // Animate quantity changes
  const animateQuantityChange = (id, newQuantity) => {
    setIsAnimating(true);
    updateQuantity(id, newQuantity);
    setTimeout(() => setIsAnimating(false), 300);
  };

  // Animate item removal
  const animateRemoveItem = (id) => {
    setIsAnimating(true);
    setTimeout(() => {
      removeItem(id);
      setIsAnimating(false);
    }, 200);
  };

  if (cartItems.length === 0) {
    return (
      <div className="bugur-cart-empty-state">
        <button 
          onClick={handleContinueShopping}
          className="bugur-cart-back-btn"
        >
          ← Continue Shopping
        </button>
        <div className="bugur-cart-empty-icon">🛒</div>
        <h2>Your Bugur Cart is Empty</h2>
        <p>Discover our delicious burgers and add some to your cart</p>
        <button 
          className="bugur-cart-primary-btn"
          onClick={handleContinueShopping}
        >
          Explore Menu
        </button>
      </div>
    );
  }

  return (
    <div className={`bugur-cart-container ${isAnimating ? 'bugur-cart-animate' : ''}`}>
      {/* Back Button */}
      <button 
        onClick={activeStep === 'cart' ? handleContinueShopping : goBackToPreviousStep}
        className="bugur-cart-back-btn"
      >
        ← {activeStep === 'cart' ? 'Continue Shopping' : 'Back'}
      </button>

      <div className="bugur-cart-header">
        <h1 className="bugur-cart-title">
          {activeStep === 'cart' && 'Your Premium Cart'}
          {activeStep === 'delivery' && 'Delivery Information'}
          {activeStep === 'payment' && 'Payment Method'}
        </h1>
        <div className="bugur-cart-steps">
          <div className={`bugur-cart-step ${activeStep === 'cart' ? 'active' : ''}`}>
            Cart
          </div>
          <div className={`bugur-cart-step ${activeStep === 'delivery' ? 'active' : ''}`}>
            Delivery
          </div>
          <div className={`bugur-cart-step ${activeStep === 'payment' ? 'active' : ''}`}>
            Payment
          </div>
        </div>
      </div>

      {activeStep === 'cart' && (
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
                        onClick={() => animateRemoveItem(item.id)}
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
                      onClick={() => animateQuantityChange(item.id, item.quantity - 1)}
                    >
                      −
                    </button>
                    <span className="bugur-cart-quantity-value">{item.quantity}</span>
                    <button
                      className="bugur-cart-quantity-btn"
                      onClick={() => animateQuantityChange(item.id, item.quantity + 1)}
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
                onClick={proceedToNextStep}
              >
                Proceed to Delivery
              </button>
            </div>
          </div>
        </div>
      )}

      {activeStep === 'delivery' && (
        <div className="bugur-delivery-section">
          <div className="bugur-delivery-form">
            <h2>Delivery Information</h2>
            
            <div className="bugur-form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={deliveryInfo.name}
                onChange={handleDeliveryChange}
                placeholder="John Doe"
                required
              />
            </div>

            <div className="bugur-form-group">
              <label>Delivery Address</label>
              <input
                type="text"
                name="address"
                value={deliveryInfo.address}
                onChange={handleDeliveryChange}
                placeholder="123 Main St, City, State"
                required
              />
            </div>

            <div className="bugur-form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={deliveryInfo.phone}
                onChange={handleDeliveryChange}
                placeholder="(123) 456-7890"
                required
              />
            </div>

            <div className="bugur-form-group">
              <label>Special Instructions (Optional)</label>
              <textarea
                name="instructions"
                value={deliveryInfo.instructions}
                onChange={handleDeliveryChange}
                placeholder="Gate code, floor number, etc."
              />
            </div>

            <div className="bugur-delivery-actions">
              <button
                className="bugur-cart-back-btn"
                onClick={goBackToPreviousStep}
              >
                ← Back to Cart
              </button>
              <button
                className="bugur-cart-checkout-btn"
                onClick={proceedToNextStep}
                disabled={!deliveryInfo.name || !deliveryInfo.address || !deliveryInfo.phone}
              >
                Continue to Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {activeStep === 'payment' && (
        <div className="bugur-payment-section">
          <div className="bugur-payment-methods">
            <h2>Select Payment Method</h2>
            
            <div className="bugur-payment-options">
              <label className={`bugur-payment-option ${paymentMethod === 'credit' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="payment"
                  value="credit"
                  checked={paymentMethod === 'credit'}
                  onChange={() => setPaymentMethod('credit')}
                />
                <div className="bugur-payment-content">
                  <span className="bugur-payment-icon">💳</span>
                  <span>Credit/Debit Card</span>
                </div>
              </label>

              <label className={`bugur-payment-option ${paymentMethod === 'paypal' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="payment"
                  value="paypal"
                  checked={paymentMethod === 'paypal'}
                  onChange={() => setPaymentMethod('paypal')}
                />
                <div className="bugur-payment-content">
                  <span className="bugur-payment-icon">🔵</span>
                  <span>PayPal</span>
                </div>
              </label>

              <label className={`bugur-payment-option ${paymentMethod === 'cash' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="payment"
                  value="cash"
                  checked={paymentMethod === 'cash'}
                  onChange={() => setPaymentMethod('cash')}
                />
                <div className="bugur-payment-content">
                  <span className="bugur-payment-icon">💵</span>
                  <span>Cash on Delivery</span>
                </div>
              </label>
            </div>

            {paymentMethod === 'credit' && (
              <div className="bugur-credit-card-form">
                <div className="bugur-form-group">
                  <label>Card Number</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    pattern="[0-9\s]{13,19}"
                    required
                  />
                </div>

                <div className="bugur-form-row">
                  <div className="bugur-form-group">
                    <label>Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      pattern="\d{2}/\d{2}"
                      required
                    />
                  </div>

                  <div className="bugur-form-group">
                    <label>CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      pattern="\d{3}"
                      required
                    />
                  </div>
                </div>

                <div className="bugur-form-group">
                  <label>Cardholder Name</label>
                  <input
                    type="text"
                    placeholder="Name on card"
                    required
                  />
                </div>
              </div>
            )}

            <div className="bugur-order-summary">
              <h3>Order Summary</h3>
              <div className="bugur-summary-row">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="bugur-summary-row">
                  <span>Discount:</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="bugur-summary-row">
                <span>Tax:</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="bugur-summary-row total">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="bugur-payment-actions">
              <button
                className="bugur-cart-back-btn"
                onClick={goBackToPreviousStep}
              >
                ← Back to Delivery
              </button>
              <button
                className="bugur-cart-checkout-btn"
                onClick={handleCheckout}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;