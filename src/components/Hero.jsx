import React, { useState } from 'react';
import './Hero.css';

function Hero() {
  const [mainBurger, setMainBurger] = useState(
    "https://png.pngtree.com/png-vector/20240829/ourmid/pngtree-delicious-and-testy-cheese-burger-png-image_13659847.png"
  );

  const burgerImages = [
    "https://png.pngtree.com/png-vector/20240829/ourmid/pngtree-delicious-and-testy-cheese-burger-png-image_13659847.png",
    "https://png.pngtree.com/png-vector/20231227/ourmid/pngtree-flying-burgers-png-image_11384226.png",
    "https://file.aiquickdraw.com/imgcompressed/img/compressed_0ebb6b0e1c39369debcfd0b2522b526c.webp",
    "https://burger25.com/wp-content/uploads/2022/08/Bacon-Egg-N-Cheese-Burger.png",
    "https://static.vecteezy.com/system/resources/previews/035/270/756/non_2x/ai-generated-tasty-burger-on-transparent-background-ai-generated-free-png.png"
  ];

  const burgerHashtags = "CheesyBurger   JuicyLayers   MeltedGoodness   BurgerLovers   GrillGoals   CheeseOverload   SatisfyYourCravings";

  const handleThumbnailClick = (imgSrc) => {
    setMainBurger(imgSrc);
  };

  return (
    <div className="hero-container">
      {/* Hero Section */}
      <section className="hero">
        {/* Background Layers */}
        <div className="bg-gradient"></div>
        <div className="bg-pattern"></div>
        <div className="bg-texture"></div>

        {/* Navigation Bar */}
        <header className="navbar">
          <nav>
            <ul className="nav-links">
              <li>Home</li>
              <li>About</li>
              <li>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
                  alt="Burger Logo"
                  className="nav-logo"
                />
              </li>
              <li>Menu</li>
              <li>Contact</li>
            </ul>
          </nav>
        </header>

        {/* Scrolling Hashtags Background */}
        <div className="scrolling-hashtags">
          <div className="hashtag-track">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="hashtag-marquee">
                {burgerHashtags}
              </span>
            ))}
          </div>
        </div>

        {/* Main Burger Image */}
        <div className="burger-container">
          <img
            src={mainBurger}
            alt="Cheesy Burger"
            className="main-burger"
          />
          <div className="offer-badge">
            30%<br />OFF NOW
          </div>
        </div>

        {/* Floating Ingredients */}
        <div className="floating floating-1">
          <img 
            src="https://png.pngtree.com/png-clipart/20230113/ourmid/pngtree-red-fresh-tomato-with-green-leaf-png-image_6561484.png" 
            alt="Tomato" 
          />
        </div>
        <div className="floating floating-2">
          <img 
            src="https://www.pngarts.com/files/3/Onion-PNG-Photo.png" 
            alt="Onion" 
          />
        </div>
        <div className="floating floating-3">
          <img 
            src="https://purepng.com/public/uploads/large/purepng.com-lettuce-leafvegetables-salad-salad-leaf-leaf-lettuce-941524727009ncuov.png" 
            alt="Lettuce" 
          />
        </div>

        {/* Order Button */}
        <button className="order-btn">ORDER NOW</button>

        {/* Burger Thumbnails */}
        <div className="burger-thumbnails">
          {burgerImages.map((imgSrc, index) => (
            <img
              key={index}
              src={imgSrc}
              alt={`Burger ${index + 1}`}
              onClick={() => handleThumbnailClick(imgSrc)}
              className={mainBurger === imgSrc ? 'active-thumbnail' : ''}
            />
          ))}
        </div>
      </section>

      {/* Special Burger Section */}
      <SpecialBurger />
    </div>
  );
}

// Special Burger Component
const SpecialBurger = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
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
            src="https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
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

export default Hero;