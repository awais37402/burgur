import React, { useState } from 'react';
import './BurgerGallery.css';

const BurgerGallery = () => {
  const [activeCategory, setActiveCategory] = useState('burgers');
  const [zoomedItem, setZoomedItem] = useState(null);

  const foodItems = {
    burgers: [
      {
        id: 1,
        name: "Classic Cheeseburger",
        description: "Juicy beef patty with melted cheddar, fresh lettuce, and special sauce",
        price: "$8.99",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
      },
      {
        id: 2,
        name: "Bacon Deluxe",
        description: "Double beef patties, crispy bacon, smoked gouda, and caramelized onions",
        price: "$12.99",
        image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
      },
      {
        id: 3,
        name: "Truffle Mushroom",
        description: "Wagyu beef, wild mushrooms, truffle aioli, and aged provolone",
        price: "$15.99",
        image: "https://images.unsplash.com/photo-1607013251379-e6eecfffe234?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
      },
      {
        id: 4,
        name: "Spicy Southwest",
        description: "Chargrilled chicken, pepper jack, jalapeños, and chipotle mayo",
        price: "$10.99",
        image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
      }
    ],
    fries: [
      {
        id: 5,
        name: "Classic Fries",
        description: "Hand-cut russet potatoes, double fried for perfect crispiness",
        price: "$4.99",
        image: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
      },
      {
        id: 6,
        name: "Truffle Parmesan",
        description: "Crispy fries tossed in truffle oil, parmesan, and fresh herbs",
        price: "$7.99",
        image: "https://images.unsplash.com/photo-1634034379073-f689b460a3fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
      }
    ],
    drinks: [
      {
        id: 7,
        name: "Craft Soda",
        description: "Handcrafted soda in seasonal flavors - try our strawberry basil!",
        price: "$3.99",
        image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
      },
      {
        id: 8,
        name: "Milkshake",
        description: "Thick, creamy milkshakes in chocolate, vanilla, or seasonal specials",
        price: "$5.99",
        image: "https://images.unsplash.com/photo-1579954115561-d5ef1dea76b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
      }
    ]
  };

  const handleZoom = (item) => {
    setZoomedItem(item);
  };

  const closeZoom = () => {
    setZoomedItem(null);
  };

  return (
    <div className="gallery-container">
      <h1 className="gallery-title">🍔 BURGER HEAVEN 🍔</h1>
      <p className="gallery-subtitle">Handcrafted with premium ingredients & passion</p>
      
      <div className="category-tabs">
        <button 
          className={`tab ${activeCategory === 'burgers' ? 'active' : ''}`}
          onClick={() => setActiveCategory('burgers')}
        >
          Burgers
        </button>
        <button 
          className={`tab ${activeCategory === 'fries' ? 'active' : ''}`}
          onClick={() => setActiveCategory('fries')}
        >
          Fries & Sides
        </button>
        <button 
          className={`tab ${activeCategory === 'drinks' ? 'active' : ''}`}
          onClick={() => setActiveCategory('drinks')}
        >
          Drinks
        </button>
      </div>
      
      <div className="food-grid">
        {foodItems[activeCategory].map(item => (
          <div 
            key={item.id} 
            className="food-card"
            onClick={() => handleZoom(item)}
          >
            <div className="food-image" style={{ backgroundImage: `url(${item.image})` }}>
              <div className="food-overlay">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <span className="price">{item.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {zoomedItem && (
        <div className="zoom-modal" onClick={closeZoom}>
          <div className="zoom-content" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={closeZoom}>×</button>
            <div 
              className="zoom-image" 
              style={{ backgroundImage: `url(${zoomedItem.image})` }}
            ></div>
            <div className="zoom-details">
              <h2>{zoomedItem.name}</h2>
              <p>{zoomedItem.description}</p>
              <div className="price">{zoomedItem.price}</div>
              <button className="order-btn">ADD TO ORDER</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BurgerGallery;