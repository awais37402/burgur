import React, { useState, useEffect } from 'react';
import './App.css';
import Hero from './components/Hero';
import Menu from './components/Menu';
import BurgerOffers from './components/BurgerOffers';
import BurgerTestimonialsSlider from './components/BurgerTestimonialsSlider';
import BurgerDeliveryLocations from './components/BurgerDeliveryLocations';
import OrderProcess from './components/OrderProcess';
import Footer from './components/Footer';
import Cart from './pages/Cart';
import About from './pages/About';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [showCartPage, setShowCartPage] = useState(false);
  const [showAboutPage, setShowAboutPage] = useState(false);

  // Load cart items from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('burgerCart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('burgerCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems(prevItems => {
      // Check if item already exists in cart
      const existingItem = prevItems.find(
        cartItem => cartItem.id === item.id
      );
      
      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevItems, item];
    });
  };

  const updateCartItemQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const toggleCartPage = () => {
    setShowCartPage(!showCartPage);
    setShowAboutPage(false);
  };

  const toggleAboutPage = () => {
    setShowAboutPage(!showAboutPage);
    setShowCartPage(false);
  };

  const cartItemsCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <>
      {showCartPage ? (
        <Cart 
          cartItems={cartItems}
          updateQuantity={updateCartItemQuantity}
          removeItem={removeFromCart}
          onBack={toggleCartPage}
        />
      ) : showAboutPage ? (
        <About onBack={toggleAboutPage} />
      ) : (
        <>
          <Hero 
            goToAbout={toggleAboutPage}
            addToCart={addToCart}
            showCart={toggleCartPage}
          />
          <Menu addToCart={addToCart} />
          <BurgerOffers addToCart={addToCart} />
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