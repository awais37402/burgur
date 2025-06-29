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
import MenuItemDetail from './components/MenuItemDetail'; // Correct file name
import SplashScreen from './components/SplashScreen';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [showCartPage, setShowCartPage] = useState(false);
  const [showAboutPage, setShowAboutPage] = useState(false);
  const [showMenuItemDetail, setShowMenuItemDetail] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [showSplash, setShowSplash] = useState(true);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('burgerCart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage when cartItems change
  useEffect(() => {
    localStorage.setItem('burgerCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      }
      return [...prevItems, { ...item, quantity: item.quantity }];
    });
  };

  const updateCartItemQuantity = (itemId, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const handleMenuItemClick = (item) => {
    setSelectedMenuItem(item);
    setShowMenuItemDetail(true);
    setShowCartPage(false);
    setShowAboutPage(false);
  };

  const handleBackFromDetail = () => {
    setShowMenuItemDetail(false);
    setSelectedMenuItem(null);
  };

  const toggleCartPage = () => {
    setShowCartPage(!showCartPage);
    setShowAboutPage(false);
    setShowMenuItemDetail(false);
  };

  const toggleAboutPage = () => {
    setShowAboutPage(!showAboutPage);
    setShowCartPage(false);
    setShowMenuItemDetail(false);
  };

  const cartItemsCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  return (
    <>
      {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : showCartPage ? (
        <Cart
          cartItems={cartItems}
          updateQuantity={updateCartItemQuantity}
          removeItem={removeFromCart}
          onBack={toggleCartPage}
        />
      ) : showAboutPage ? (
        <About onBack={toggleAboutPage} />
      ) : showMenuItemDetail ? (
        <MenuItemDetail
          item={selectedMenuItem}
          addToCart={addToCart}
          onBack={handleBackFromDetail}
        />
      ) : (
        <>
          <Hero
            goToAbout={toggleAboutPage}
            addToCart={addToCart}
            showCart={toggleCartPage}
          />
          <Menu
            addToCart={addToCart}
            onItemClick={handleMenuItemClick}
          />
          <BurgerOffers addToCart={addToCart} />
          <BurgerTestimonialsSlider />
          <BurgerDeliveryLocations />
          <OrderProcess />
          <Footer />

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
