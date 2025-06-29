import React, { useState } from 'react';
import './Hero.css';

function Hero({ goToAbout, addToCart }) {
  const [mainBurger, setMainBurger] = useState(
    "https://png.pngtree.com/png-vector/20240829/ourmid/pngtree-delicious-and-testy-cheese-burger-png-image_13659847.png"
  );

  const burgerImages = [
    {
      url: "https://png.pngtree.com/png-vector/20240829/ourmid/pngtree-delicious-and-testy-cheese-burger-png-image_13659847.png",
      name: "Classic Cheeseburger",
      price: 8.99
    },
    {
      url: "https://png.pngtree.com/png-vector/20231227/ourmid/pngtree-flying-burgers-png-image_11384226.png",
      name: "Double Patty Burger",
      price: 10.99
    },
    {
      url: "https://file.aiquickdraw.com/imgcompressed/img/compressed_0ebb6b0e1c39369debcfd0b2522b526c.webp",
      name: "Bacon Burger",
      price: 11.99
    },
    {
      url: "https://burger25.com/wp-content/uploads/2022/08/Bacon-Egg-N-Cheese-Burger.png",
      name: "Bacon Egg Burger",
      price: 12.99
    },
    {
      url: "https://static.vecteezy.com/system/resources/previews/035/270/756/non_2x/ai-generated-tasty-burger-on-transparent-background-ai-generated-free-png.png",
      name: "Gourmet Burger",
      price: 13.99
    }
  ];

  const burgerHashtags = "CheesyBurger   JuicyLayers   MeltedGoodness   BurgerLovers   GrillGoals   CheeseOverload   SatisfyYourCravings";

  const handleThumbnailClick = (imgSrc) => {
    setMainBurger(imgSrc);
  };

  const handleOrderNow = () => {
    const selectedBurger = burgerImages.find(burger => burger.url === mainBurger);
    if (selectedBurger) {
      addToCart({
        id: Date.now(),
        name: selectedBurger.name,
        price: selectedBurger.price,
        image: selectedBurger.url,
        size: "Regular",
        color: "Classic",
        quantity: 1
      });
    }
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@300;400;500;600;700&display=swap');
          
          body {
            font-family: 'Poppins', sans-serif;
          }
          
          h1, h2, h3, h4, h5, h6 {
            font-family: 'Playfair Display', serif;
          }
          
          .nav-links li {
            font-family: 'Poppins', sans-serif;
          }
          
          .order-btn, .hashtag-marquee {
            font-family: 'Poppins', sans-serif;
          }
        `}
      </style>
      
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
              <li onClick={goToAbout}>About</li>
              <li className="nav-logo-container">
               <img
  src="https://fonts.gstatic.com/s/i/materialiconsoutlined/fastfood/v11/24px.svg"
  alt="Fast Food Icon"
  className="nav-logo"
  width="24"
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
            loading="lazy"
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
            loading="lazy"
          />
        </div>
        <div className="floating floating-2">
          <img
            src="https://www.pngarts.com/files/3/Onion-PNG-Photo.png"
            alt="Onion"
            loading="lazy"
          />
        </div>
        <div className="floating floating-3">
          <img
            src="https://purepng.com/public/uploads/large/purepng.com-lettuce-leafvegetables-salad-salad-leaf-leaf-lettuce-941524727009ncuov.png"
            alt="Lettuce"
            loading="lazy"
          />
        </div>

        {/* Order Button */}
        <button className="order-btn" onClick={handleOrderNow}>ORDER NOW</button>

        {/* Burger Thumbnails */}
        <div className="burger-thumbnails">
          {burgerImages.map((burger, index) => (
            <img
              key={index}
              src={burger.url}
              alt={`Burger ${index + 1}`}
              onClick={() => handleThumbnailClick(burger.url)}
              className={mainBurger === burger.url ? 'active-thumbnail' : ''}
              loading="lazy"
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default Hero;