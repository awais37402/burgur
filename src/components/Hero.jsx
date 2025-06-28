import React, { useState } from 'react';
import './Hero.css';

function Hero({ goToAbout }) {  // Accept goToAbout as prop
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
    <>
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
              <li onClick={goToAbout}>About</li>  {/* Updated */}

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
    </>
  );
}

export default Hero;