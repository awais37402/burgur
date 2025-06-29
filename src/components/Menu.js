import React, { useState, useEffect } from 'react';
import './Menu.css';

const Menu = ({ addToCart, onItemClick }) => {
  const [activeCategory, setActiveCategory] = useState('burgers');

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
        featured: true,
        details: 'Our signature Classic Cheeseburger features a juicy 1/3 lb Angus beef patty grilled to perfection, topped with aged cheddar cheese, crisp lettuce, ripe tomatoes, and our special house sauce, all served on a toasted brioche bun. Comes with a side of pickles and your choice of fries or salad.',
        ingredients: ['Angus beef patty', 'Aged cheddar', 'Lettuce', 'Tomato', 'House sauce', 'Brioche bun'],
        calories: 780
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
        featured: true,
        details: 'An exquisite blend of premium Wagyu beef with luxurious black truffle aioli, wild forest mushrooms, and crispy parmesan shards. Served on an artisan brioche bun with a side of truffle-infused fries.',
        ingredients: ['Wagyu beef patty', 'Black truffle aioli', 'Wild mushrooms', 'Parmesan crisp', 'Arugula', 'Brioche bun'],
        calories: 920
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
        featured: false,
        details: 'Not for the faint-hearted! Two juicy beef patties smothered in molten ghost pepper cheese, topped with fresh jalapeños and our signature chipotle mayo. Served on a spicy pepper bun that adds an extra kick.',
        ingredients: ['Double beef patties', 'Ghost pepper cheese', 'Jalapeños', 'Chipotle mayo', 'Pepper jack cheese', 'Spicy bun'],
        calories: 950
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
        featured: false,
        details: 'A fresh take on the classic burger featuring grass-fed beef topped with creamy smashed avocado, heirloom tomatoes, alfalfa sprouts, and our garlic aioli. Served on a whole wheat bun for a healthier option.',
        ingredients: ['Grass-fed beef', 'Smashed avocado', 'Heirloom tomato', 'Alfalfa sprouts', 'Garlic aioli', 'Whole wheat bun'],
        calories: 720
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
        featured: false,
        details: 'A flavor explosion featuring our special dry-aged beef patty topped with sautéed shiitake mushrooms, caramelized onions, and a rich miso glaze. Finished with Swiss cheese on a pretzel bun.',
        ingredients: ['Dry-aged beef', 'Shiitake mushrooms', 'Caramelized onions', 'Miso glaze', 'Swiss cheese', 'Pretzel bun'],
        calories: 850
      },
      {
        id: 6,
        name: 'Black Bean Supreme',
        description: 'House-made black bean patty, avocado, chipotle mayo, roasted peppers',
        price: 13.99,
        spicy: false,
        vegetarian: true,
        image: 'https://cdn.loveandlemons.com/wp-content/uploads/2020/07/black-bean-burger-1-500x375.jpg',
        rating: 4.5,
        new: false,
        featured: false,
        details: 'Our house specialty vegetarian option features a hearty black bean patty made from scratch, topped with fresh avocado slices, roasted red peppers, and a smoky chipotle mayo. Served on a multigrain bun.',
        ingredients: ['Black bean patty', 'Avocado', 'Roasted peppers', 'Chipotle mayo', 'Spinach', 'Multigrain bun'],
        calories: 620
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
        featured: false,
        details: 'Our famous hand-cut fries tossed in white truffle oil and topped with freshly grated parmesan and parsley. Served with our signature truffle aioli dipping sauce.',
        ingredients: ['Hand-cut potatoes', 'White truffle oil', 'Parmesan cheese', 'Parsley', 'Truffle aioli'],
        calories: 420
      },
      {
        id: 8,
        name: 'Crispy Onion Rings',
        description: 'Beer-battered Vidalia onions, smoked paprika aioli',
        price: 6.99,
        spicy: false,
        vegetarian: true,
        image: 'https://www.allrecipes.com/thmb/7UlHGwtX6EdCC7HsrsRfQAKL7-w=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-238377-fantastic-onion-ring-batter-ddmfs-4x3-Beauty-66becffd44fc4693b4ecb371ed446181.jpg',
        rating: 4.4,
        new: false,
        featured: false,
        details: 'Thick-cut Vidalia onions coated in our special beer batter and fried to golden perfection. Served with a smoky paprika aioli for dipping.',
        ingredients: ['Vidalia onions', 'Beer batter', 'Smoked paprika aioli'],
        calories: 380
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
        featured: false,
        details: 'Freshly squeezed organic lemons sweetened with just the right amount of cane sugar. Choose between our lavender-infused or ginger-spiced variations for a unique twist.',
        ingredients: ['Organic lemons', 'Cane sugar', 'Lavender or ginger', 'Filtered water'],
        calories: 150
      }
    ]
  };

  useEffect(() => {
    const items = document.querySelectorAll('.menu-item');
    items.forEach((item, index) => {
      item.style.animationDelay = `${index * 0.1}s`;
      item.classList.add('animate-pop');
    });
  }, [activeCategory]);

  const handleItemClick = (item) => {
    onItemClick(item);
  };

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
            <div 
              key={item.id} 
              className={`menu-item ${item.featured ? 'featured' : ''}`}
              onClick={() => handleItemClick(item)}
            >
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Menu;