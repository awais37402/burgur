import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Items.css';

const burgerItems = [
  {
    id: 1,
    name: "Truffle Gold Burger",
    price: 18.99,
    description: "Wagyu beef patty with black truffle, Gruyère, mushrooms",
    image: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg",
    featured: true,
    rating: 4.9,
    tags: ["Gourmet"]
  },
  {
    id: 2,
    name: "Smoky Bourbon BBQ",
    price: 16.50,
    description: "Bacon, cheddar, onions with bourbon BBQ sauce",
    image: "https://images.pexels.com/photos/2983102/pexels-photo-2983102.jpeg",
    featured: false,
    rating: 4.7,
    tags: ["Popular"]
  },
  {
    id: 3,
    name: "Mediterranean Lamb",
    price: 19.99,
    description: "Lamb patty with feta, sun-dried tomatoes, tzatziki",
    image: "https://images.pexels.com/photos/3219547/pexels-photo-3219547.jpeg",
    featured: true,
    rating: 4.8,
    tags: ["Chef's Special"]
  },
  {
    id: 4,
    name: "Double Stack Deluxe",
    price: 15.99,
    description: "Two beef patties with cheese, special sauce, veggies",
    image: "https://images.pexels.com/photos/5908040/pexels-photo-5908040.jpeg",
    featured: false,
    rating: 4.6,
    tags: ["Classic"]
  },
  {
    id: 5,
    name: "Mushroom Swiss",
    price: 17.50,
    description: "Beef patty with mushrooms, Swiss cheese, aioli",
    image: "https://images.pexels.com/photos/6605217/pexels-photo-6605217.jpeg",
    featured: false,
    rating: 4.7,
    tags: ["Creamy"]
  },
  {
    id: 6,
    name: "Spicy Jalapeño",
    price: 16.99,
    description: "Spicy beef with pepper jack, jalapeños, chipotle mayo",
    image: "https://images.pexels.com/photos/15611462/pexels-photo-15611462/free-photo-of-burger-with-fries-and-sauce.jpeg",
    featured: true,
    rating: 4.8,
    tags: ["Hot"]
  }
];

const Items = () => {
  const [quantities, setQuantities] = useState({});

  const handleQuantityChange = (id, value) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + value)
    }));
  };

  const handleAddToCart = (burger) => {
    const quantity = quantities[burger.id] || 1;
    console.log(`Added ${quantity} ${burger.name} to cart`);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { y: -5 }
  };

  return (
    <div className="items-container">
      <div className="items-header">
        <h1>Premium Burgers</h1>
        <p>Handcrafted with the finest ingredients</p>
      </div>

      <div className="items-grid">
        {burgerItems.map((item) => (
          <motion.div
            key={item.id}
            className={`item-card ${item.featured ? 'featured' : ''}`}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            {item.featured && (
              <div className="featured-badge">Chef's Pick</div>
            )}
            
            <div className="item-image-container">
              <img src={item.image} alt={item.name} />
            </div>
            
            <div className="item-info">
              <div className="item-header">
                <h3>{item.name}</h3>
                <div className="price-tag">${item.price.toFixed(2)}</div>
              </div>
              
              <p className="item-description">{item.description}</p>
              
              <div className="item-tags">
                {item.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>

              <div className="quantity-selector">
                <button onClick={() => handleQuantityChange(item.id, -1)}>
                  −
                </button>
                <span>{quantities[item.id] || 1}</span>
                <button onClick={() => handleQuantityChange(item.id, 1)}>
                  +
                </button>
              </div>
              
              <button
                className="add-to-cart-btn"
                onClick={() => handleAddToCart(item)}
              >
                Add to Cart
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Items;