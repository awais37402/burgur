import React, { useState, useEffect } from 'react';
import './SpecialBurger.css';

// Using a high-quality burger image from Pexels
const burgerImage = 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

const SpecialBurger = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Trigger animation when component mounts
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleAddToCart = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
    // Here you would typically add to cart logic
    console.log(`Added ${quantity} Special Burger(s) to cart`);
  };

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div className={`special-burger-container ${isAnimating ? 'animate' : ''}`}>
      <div className="burger-header">
        <h1 className="burger-title">Mega <span className="highlight">Deluxe</span> Burger</h1>
        <button 
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={() => setIsFavorite(!isFavorite)}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          ♥
        </button>
      </div>
      
      <div className="burger-content">
        <div className="burger-image-container">
          <img 
            src={burgerImage} 
            alt="Mega Deluxe Burger with cheese, bacon, lettuce, and special sauce" 
            className="burger-image"
          />
          <div className="badge">Chef's Special</div>
        </div>
        
        <div className="burger-details">
          <p className="burger-description">
            Our signature Mega Deluxe Burger features a juicy 1/2 lb. Angus beef patty, 
            smoked bacon, melted cheddar, crispy lettuce, fresh tomatoes, caramelized onions, 
            and our secret deluxe sauce on a toasted brioche bun.
          </p>
          
          <div className="nutrition-info">
            <h3>Nutrition Facts</h3>
            <ul>
              <li><span>Calories:</span> 850 kcal</li>
              <li><span>Protein:</span> 45g</li>
              <li><span>Carbs:</span> 50g</li>
              <li><span>Fat:</span> 55g</li>
            </ul>
          </div>
          
          <div className="price-container">
            <span className="price">$12.99</span>
            <span className="original-price">$15.99</span>
            <span className="discount">20% OFF</span>
          </div>
          
          <div className="action-buttons">
            <div className="quantity-selector">
              <button onClick={decreaseQuantity}>-</button>
              <span>{quantity}</span>
              <button onClick={increaseQuantity}>+</button>
            </div>
            <button 
              className="add-to-cart-btn"
              onClick={handleAddToCart}
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
      
      <div className="burger-tags">
        <span>Spicy</span>
        <span>Popular</span>
        <span>Limited</span>
      </div>
    </div>
  );
};

export default SpecialBurger;