import React, { useState } from 'react';
import './App.css';
import Hero from './components/Hero';
import Menu from './components/Menu';
import BurgerOffers from './components/BurgerOffers';
import BurgerTestimonialsSlider from './components/BurgerTestimonialsSlider';
import BurgerDeliveryLocations from './components/BurgerDeliveryLocations';
import OrderProcess from './components/OrderProcess';
import Footer from './components/Footer';
import Cart from './pages/Cart';
import About from './pages/About';  // Import the About component

function App() {
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [showCartPage, setShowCartPage] = useState(false);
  const [showAboutPage, setShowAboutPage] = useState(false);  // New state for About page

  const updateCartCount = () => {
    setCartItemsCount(prev => prev + 1);
  };

  const toggleCartPage = () => {
    setShowCartPage(!showCartPage);
  };

  const toggleAboutPage = () => {
    setShowAboutPage(!showAboutPage);
  };

  return (
    <>
      {showCartPage ? (
        <Cart 
          cartItemsCount={cartItemsCount}
          onBack={toggleCartPage}
        />
      ) : showAboutPage ? (
        <About onBack={toggleAboutPage} />  // Render About with back button
      ) : (
        <>
          <Hero goToAbout={toggleAboutPage} />  {/* Pass navigation function */}
          <Menu updateCartCount={updateCartCount} />
          <BurgerOffers updateCartCount={updateCartCount} />
          <BurgerTestimonialsSlider />
          <BurgerDeliveryLocations />
          <OrderProcess />
          <Footer />
          
          {/* Floating Cart Icon */}
          <div className="floating-cart" onClick={toggleCartPage}>
            <span className="cart-icon">🛒</span>
            {cartItemsCount > 0 && (
              <span className="cart-count">{cartItemsCount}</span>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default App;