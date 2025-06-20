import React from 'react';
import './App.css';
import Hero from './components/Hero';
import Menu from './components/Menu';
import BurgerOffers from './components/BurgerOffers';
import BurgerTestimonialsSlider from './components/BurgerTestimonialsSlider';
import BurgerDeliveryLocations from './components/BurgerDeliveryLocations';
import OrderProcess from './components/OrderProcess';
import Footer from './components/Footer';

function App() {
  return (
    <>
      <Hero />
      <Menu />
      <BurgerOffers />
       <BurgerTestimonialsSlider />
        <BurgerDeliveryLocations />
        <OrderProcess />
         <Footer />
     
    </>
  );
}

export default App;