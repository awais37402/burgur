import React, { useState, useEffect } from 'react';
import './BurgerOffers.css';

const BurgerOffers = () => {
  const [offers, setOffers] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(1800);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const burgerOffers = [
      {
        id: 1,
        name: "Mega Burger Feast",
        details: "Double wagyu beef patty with aged cheddar, artisanal bacon, truffle fries & craft soda",
        dealPrice: 24.99,
        regularPrice: 32.99,
        imageUrl: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        badge: "CHEF'S CHOICE",
        expiry: "45"
      },
      {
        id: 2,
        name: "Spicy Chicken Royale",
        details: "Buttermilk fried chicken with ghost pepper aioli, crispy shallots, brioche bun & craft beer",
        dealPrice: 22.49,
        regularPrice: 28.99,
        imageUrl: "https://images.unsplash.com/photo-1551615593-ef5fe247e8f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        badge: "SIGNATURE",
        expiry: "30"
      },
      {
        id: 3,
        name: "Black Truffle Collection",
        details: "4 gourmet truffle burgers, truffle parmesan fries, 4 organic drinks & dessert flight",
        dealPrice: 89.99,
        regularPrice: 119.99,
        imageUrl: "https://images.unsplash.com/photo-1549611016-3a70d82b5040?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        badge: "PREMIUM",
        expiry: "15"
      }
    ];
    setOffers(burgerOffers);
  }, []);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeRemaining(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timerInterval);
  }, []);

  useEffect(() => {
    if (!isHovered) {
      const rotationInterval = setInterval(() => {
        setActiveIndex(prev => (prev + 1) % offers.length);
      }, 5000);
      return () => clearInterval(rotationInterval);
    }
  }, [offers.length, isHovered]);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAddToOrder = (offerId) => {
    // Animation effect
    const button = document.querySelector(`.gourmet-order-btn[data-id="${offerId}"]`);
    if (button) {
      button.classList.add('gourmet-btn-animate');
      setTimeout(() => button.classList.remove('gourmet-btn-animate'), 1000);
    }
    console.log(`Added gourmet offer #${offerId}`);
  };

  return (
    <div className="gourmet-deals-container">
      <div className="gourmet-header-wrapper">
        <h2 className="gourmet-deals-heading">
          <span className="gourmet-heading-icon">🍔</span>
          <span className="gourmet-heading-text">GOURMET BURGER EXPERIENCE</span>
          <span className="gourmet-heading-icon">🍟</span>
        </h2>
        <div className="gourmet-subheading">Crafted with premium ingredients</div>
      </div>
      
      <div className="gourmet-timer-ribbon">
        <div className="gourmet-timer-content">
          <svg className="gourmet-timer-icon" viewBox="0 0 24 24">
            <path d="M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22A9,9 0 0,0 21,13A9,9 0 0,0 12,4M12.5,8H11V14L15.75,16.85L16.5,15.62L12.5,13.25V8M7.88,3.39L6.6,1.86L2,5.71L3.29,7.24L7.88,3.39M22,5.72L17.4,1.86L16.11,3.39L20.71,7.25L22,5.72Z" />
          </svg>
          <span className="gourmet-timer-text">OFFER EXPIRES IN: <strong>{formatTimer(timeRemaining)}</strong></span>
        </div>
      </div>
      
      <div 
        className="gourmet-offers-carousel"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {offers.map((item, idx) => (
          <div 
            key={item.id}
            className={`gourmet-deal-card ${idx === activeIndex ? 'gourmet-deal-active' : ''}`}
            style={{ '--card-bg': `url(${item.imageUrl})` }}
          >
            <div className="gourmet-card-badge">{item.badge}</div>
            <div className="gourmet-card-overlay"></div>
            <div className="gourmet-card-content">
              <h3 className="gourmet-deal-title">{item.name}</h3>
              <p className="gourmet-deal-desc">{item.details}</p>
              
              <div className="gourmet-price-container">
                <div className="gourmet-price-wrapper">
                  <span className="gourmet-sale-price">${item.dealPrice}</span>
                  <span className="gourmet-original-price">${item.regularPrice}</span>
                </div>
                <div className="gourmet-discount-bubble">
                  {Math.round((1 - item.dealPrice / item.regularPrice) * 100)}% OFF
                </div>
              </div>
              
              <button 
                className="gourmet-order-btn"
                data-id={item.id}
                onClick={() => handleAddToOrder(item.id)}
              >
                <span className="gourmet-btn-text">ADD TO ORDER</span>
                <span className="gourmet-btn-icon">+</span>
              </button>
              
              <div className="gourmet-expiry-notice">
                <svg className="gourmet-clock-icon" viewBox="0 0 24 24">
                  <path d="M11,7V13L16.2,16.1L17,14.9L12.5,12.2V7H11M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2Z" />
                </svg>
                Available for {item.expiry} more minutes
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="gourmet-carousel-indicators">
        {offers.map((_, idx) => (
          <button
            key={idx}
            className={`gourmet-indicator ${idx === activeIndex ? 'gourmet-indicator-active' : ''}`}
            onClick={() => setActiveIndex(idx)}
            aria-label={`View offer ${idx + 1}`}
          >
            <span className="gourmet-indicator-progress"></span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BurgerOffers;