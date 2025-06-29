import React from 'react';
import './OrderProcess.css';

const OrderProcess = () => {
  return (
    <div className="order-process-container">
      <div className="process-header">
        <h2 className="process-title">Craft Your Masterpiece Burger</h2>
        <p className="process-subtitle">Three simple steps to burger perfection</p>
        <div className="divider">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>
      
      <div className="process-steps">
        {/* Step 1 - Select */}
        <div className="step" data-step="1">
          <div className="step-content">
            <div className="step-icon">
              <div className="burger-animation">
                <div className="bun-top"></div>
                <div className="lettuce"></div>
                <div className="cheese"></div>
                <div className="patty"></div>
                <div className="bacon"></div>
                <div className="bun-bottom"></div>
                <div className="sesame"></div>
                <div className="sesame"></div>
                <div className="sesame"></div>
              </div>
            </div>
            <div className="step-text">
              <h3 className="step-title">Select Your Base</h3>
              <p className="step-desc">Choose from our artisan-crafted burger styles</p>
              <div className="step-number">01</div>
            </div>
          </div>
        </div>
        
        {/* Step 2 - Customize */}
        <div className="step" data-step="2">
          <div className="step-content">
            <div className="step-icon">
              <div className="customize-animation">
                <div className="ingredient tomato"></div>
                <div className="ingredient onion"></div>
                <div className="ingredient pickle"></div>
                <div className="ingredient mushroom"></div>
                <div className="sauce"></div>
              </div>
            </div>
            <div className="step-text">
              <h3 className="step-title">Personalize It</h3>
              <p className="step-desc">Add premium toppings and signature sauces</p>
              <div className="step-number">02</div>
            </div>
          </div>
        </div>
        
        {/* Step 3 - Order */}
        <div className="step" data-step="3">
          <div className="step-content">
            <div className="step-icon">
              <div className="delivery-animation">
                <div className="bag"></div>
                <div className="hand"></div>
                <div className="steam"></div>
                <div className="steam"></div>
              </div>
            </div>
            <div className="step-text">
              <h3 className="step-title">Enjoy The Magic</h3>
              <p className="step-desc">Fast checkout and lightning delivery</p>
              <div className="step-number">03</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* App Promotion */}
      <div className="app-promo">
        <div className="app-content">
          <div className="app-text">
            <h3>Get Our App For Exclusive Deals!</h3>
            <p>Download now and get 15% off your first order</p>
          </div>
          <div className="app-buttons">
            <button className="app-btn ios-btn">
              <span className="btn-icon"></span>
              <span className="btn-text">
                <span>Download on the</span>
                <span>App Store</span>
              </span>
            </button>
            <button className="app-btn android-btn">
              <span className="btn-icon"><svg viewBox="0 0 24 24"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" /></svg></span>
              <span className="btn-text">
                <span>Get it on</span>
                <span>Google Play</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderProcess;