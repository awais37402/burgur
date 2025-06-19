import React, { useState } from 'react';
import './Menu.css';

const Menu = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [cartItems, setCartItems] = useState({});

  const burgers = [
    {
      id: 1,
      name: "Classic Cheeseburger",
      description: "Juicy beef patty with melted cheddar, fresh lettuce, tomato, and our special sauce",
      price: 8.99,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
    },
    {
      id: 2,
      name: "Bacon Deluxe",
      description: "Double beef patties, crispy bacon, smoked gouda, and caramelized onions",
      price: 11.99,
      image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b"
    },
    {
      id: 3,
      name: "Spicy Southwest",
      description: "Angus beef with pepper jack cheese, jalapeños, and chipotle mayo",
      price: 9.99,
      image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828"
    },
    {
      id: 4,
      name: "Mushroom Swiss",
      description: "Beef patty topped with sautéed mushrooms and Swiss cheese",
      price: 10.49,
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349"
    },
    {
      id: 5,
      name: "BBQ Ranch",
      description: "Grilled chicken with BBQ sauce, ranch dressing, and crispy onions",
      price: 9.49,
      image: "https://images.unsplash.com/photo-1603064752734-4c48eff53d05"
    },
    {
      id: 6,
      name: "Veggie Supreme",
      description: "Plant-based patty with avocado, sprouts, and vegan mayo",
      price: 8.99,
      image: "https://images.unsplash.com/photo-1553279768-865429fa0078"
    }
  ];

  const addToCart = (id) => {
    setCartItems(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
    
    // Animation effect
    const button = document.getElementById(`add-btn-${id}`);
    if (button) {
      button.classList.add('clicked');
      setTimeout(() => {
        button.classList.remove('clicked');
      }, 300);
    }
  };

  return (
    <section className="menu-section" id="menu">
      <div className="menu-header">
        <h2>Our <span className="highlight">Bestselling</span> Burgers</h2>
        <p>Handcrafted with premium ingredients for maximum flavor</p>
      </div>

      <div className="menu-grid">
        {burgers.map((burger) => (
          <div 
            key={burger.id}
            className={`menu-item ${hoveredItem === burger.id ? 'hovered' : ''}`}
            onMouseEnter={() => setHoveredItem(burger.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className="item-image-container">
              <img 
                src={burger.image} 
                alt={burger.name}
                className="item-image"
                loading="lazy"
              />
            </div>
            <div className="item-details">
              <h3>{burger.name}</h3>
              <p>{burger.description}</p>
              <div className="item-footer">
                <span className="price">${burger.price.toFixed(2)}</span>
                <button
                  id={`add-btn-${burger.id}`}
                  className="add-to-cart"
                  onClick={() => addToCart(burger.id)}
                >
                  Add to Cart {(cartItems[burger.id] || 0) > 0 && (
                    <span className="cart-count">{cartItems[burger.id]}</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Menu;