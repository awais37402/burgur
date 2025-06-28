import React, { useState, useEffect } from 'react';
import './Menu.css';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('burgers');
  const [cartItems, setCartItems] = useState([]);
  const [isCartAnimating, setIsCartAnimating] = useState(false);

  const menuItems = {
    burgers: [
      {
        id: 1,
        name: 'Classic Cheeseburger',
        description: 'Premium Angus beef, aged cheddar, lettuce, tomato, house sauce on brioche',
        price: 12.99,
        spicy: false,
        vegetarian: false,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        rating: 4.7,
        new: false,
        featured: true
      },
      {
        id: 2,
        name: 'Truffle Royale',
        description: 'Wagyu beef, black truffle aioli, wild mushrooms, parmesan crisp',
        price: 18.99,
        spicy: false,
        vegetarian: false,
        image: 'https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        rating: 4.9,
        new: true,
        featured: true
      },
      {
        id: 3,
        name: 'Spicy Inferno',
        description: 'Double patty, ghost pepper cheese, jalapeños, chipotle mayo, pepper bun',
        price: 15.99,
        spicy: true,
        vegetarian: false,
        image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        rating: 4.8,
        new: false,
        featured: false
      },
      {
        id: 4,
        name: 'Avocado Bliss',
        description: 'Grass-fed beef, smashed avocado, heirloom tomato, sprouts, garlic aioli',
        price: 14.99,
        spicy: false,
        vegetarian: false,
        image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        rating: 4.6,
        new: false,
        featured: false
      },
      {
        id: 5,
        name: 'Umami Bomb',
        description: 'Dry-aged beef, shiitake mushrooms, caramelized onions, miso glaze, Swiss',
        price: 16.99,
        spicy: false,
        vegetarian: false,
        image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        rating: 4.7,
        new: true,
        featured: false
      },
      {
        id: 6,
        name: 'Black Bean Supreme',
        description: 'House-made black bean patty, avocado, chipotle mayo, roasted peppers',
        price: 13.99,
        spicy: false,
        vegetarian: true,
        image: 'https://images.unsplash.com/photo-1582192763789-f20c0da1ab5a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        rating: 4.5,
        new: false,
        featured: false
      }
    ],
    sides: [
      {
        id: 7,
        name: 'Truffle Fries',
        description: 'Hand-cut with truffle oil, parmesan, parsley, truffle aioli',
        price: 7.99,
        spicy: false,
        vegetarian: true,
        image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        rating: 4.6,
        new: false,
        featured: false
      },
      {
        id: 8,
        name: 'Crispy Onion Rings',
        description: 'Beer-battered Vidalia onions, smoked paprika aioli',
        price: 6.99,
        spicy: false,
        vegetarian: true,
        image: 'https://images.unsplash.com/photo-1582515073490-39981397c445?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        rating: 4.4,
        new: false,
        featured: false
      }
    ],
    drinks: [
      {
        id: 9,
        name: 'Craft Lemonade',
        description: 'House-made with organic lemons, lavender or ginger option',
        price: 4.99,
        spicy: false,
        vegetarian: true,
        image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        rating: 4.3,
        new: false,
        featured: false
      }
    ]
  };

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
    setIsCartAnimating(true);
    setTimeout(() => setIsCartAnimating(false), 1000);
    
    const button = document.getElementById(`add-btn-${item.id}`);
    if (button) {
      button.classList.add('added');
      setTimeout(() => button.classList.remove('added'), 1000);
    }
  };

  useEffect(() => {
    const items = document.querySelectorAll('.menu-item');
    items.forEach((item, index) => {
      item.style.animationDelay = `${index * 0.1}s`;
      item.classList.add('animate-pop');
    });
  }, [activeCategory]);

  return (
    <div className="menu-container">
      <header className="menu-header">
        <div className="header-content">
          <h1 className="title">BURGER <span>HAVEN</span></h1>
          <p className="subtitle">Artisanal Burgers & Crafted Flavors</p>
          <div className="header-decoration"></div>
        </div>
      </header>

      <nav className="menu-categories">
        {Object.keys(menuItems).map(category => (
          <button
            key={category}
            className={`category-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            <span className="btn-text">{category.charAt(0).toUpperCase() + category.slice(1)}</span>
            <span className="btn-underline"></span>
          </button>
        ))}
      </nav>

      <section className="menu-items">
        <div className="section-header">
          <h2 className="section-title">
            {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
          </h2>
          <div className="section-line"></div>
        </div>
        <div className="items-grid">
          {menuItems[activeCategory].map(item => (
            <div key={item.id} className={`menu-item ${item.featured ? 'featured' : ''}`}>
              <div className="item-image-container">
                <img src={item.image} alt={item.name} className="item-image" />
                <div className="item-badges">
                  {item.new && <span className="new-badge">NEW</span>}
                  {item.spicy && <span className="spicy-badge">SPICY</span>}
                  {item.vegetarian && <span className="veg-badge">VEG</span>}
                </div>
              </div>
              <div className="item-info">
                <div className="item-header">
                  <h3>{item.name}</h3>
                  <div className="rating">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(item.rating) ? 'star-filled' : 'star-empty'}>
                        ★
                      </span>
                    ))}
                    <span className="rating-value">{item.rating.toFixed(1)}</span>
                  </div>
                </div>
                <p className="item-description">{item.description}</p>
                <div className="item-footer">
                  <span className="price">${item.price.toFixed(2)}</span>
                  <button 
                    id={`add-btn-${item.id}`}
                    className="add-to-cart"
                    onClick={() => addToCart(item)}
                  >
                    <span className="add-text">ADD TO CART</span>
                    <span className="added-text">ADDED!</span>
                    <span className="cart-icon">+</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className={`cart-indicator ${isCartAnimating ? 'animate' : ''} ${cartItems.length > 0 ? 'visible' : ''}`}>
        <span className="cart-count">{cartItems.length}</span>
        <div className="cart-icon"></div>
      </div>
    </div>
  );
};

export default Menu;