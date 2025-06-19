import React, { useState, useEffect } from 'react';
import './Menu.css';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('burgers');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '' });
  const [darkMode, setDarkMode] = useState(false);

  const menuItems = {
    burgers: [
      {
        id: 1,
        name: 'Classic Cheeseburger',
        description: 'Juicy beef patty with melted American cheese, crisp lettuce, ripe tomato, pickles, onions, and our signature sauce on a toasted brioche bun.',
        price: 8.99,
        spicy: false,
        vegetarian: false,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        rating: 4.5,
        new: false,
        special: false
      },
      {
        id: 2,
        name: 'Bacon Deluxe',
        description: 'Two 1/4 lb beef patties, crispy applewood smoked bacon, cheddar cheese, caramelized onions, lettuce, tomato, and smoky BBQ sauce.',
        price: 11.99,
        spicy: false,
        vegetarian: false,
        image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        rating: 4.8,
        new: true,
        special: true
      },
      {
        id: 3,
        name: 'Spicy Jalapeño',
        description: 'Angus beef patty with pepper jack cheese, fresh jalapeños, chipotle mayo, lettuce, tomato, and crispy onion strings on a spicy pretzel bun.',
        price: 9.99,
        spicy: true,
        vegetarian: false,
        image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        rating: 4.7,
        new: false,
        special: false
      },
      {
        id: 4,
        name: 'Mushroom Swiss',
        description: '1/3 lb beef patty topped with sautéed mushrooms, Swiss cheese, garlic aioli, and arugula on a toasted ciabatta roll.',
        price: 10.49,
        spicy: false,
        vegetarian: false,
        image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        rating: 4.6,
        new: false,
        special: true
      },
      {
        id: 5,
        name: 'Veggie Supreme',
        description: 'House-made black bean and quinoa patty with avocado, sprouts, tomato, red onion, and garlic aioli on a whole wheat bun.',
        price: 9.49,
        spicy: false,
        vegetarian: true,
        image: 'https://www.magnafoodservice.co.uk/wp-content/uploads/vegetarian-and-vegan/burgers/katerveg-spiced-vegetable-supreme-burger-95gm-48pcs.jpg',
        rating: 4.4,
        new: false,
        special: false
      },
      {
        id: 6,
        name: 'Truffle Burger',
        description: 'Wagyu beef patty with truffle aioli, wild mushrooms, arugula, shaved parmesan, and balsamic glaze on an artisan brioche bun.',
        price: 14.99,
        spicy: false,
        vegetarian: false,
        image: 'https://www.finefoodspecialist.co.uk/media/recipe/white-truffle-porcini-burger.jpg',
        rating: 4.9,
        new: true,
        special: true
      }
    ],
    sides: [
      {
        id: 7,
        name: 'Crispy Fries',
        description: 'Hand-cut russet potatoes double-fried to perfection and tossed with sea salt. Served with house-made ketchup.',
        price: 3.99,
        spicy: false,
        vegetarian: true,
        image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        rating: 4.2,
        new: false,
        special: false
      },
      {
        id: 8,
        name: 'Onion Rings',
        description: 'Thick-cut sweet onions beer-battered and fried until golden. Served with spicy ranch dressing.',
        price: 4.99,
        spicy: false,
        vegetarian: true,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_FKUjlqURBS6yqDjjDmbcN5MUBz2V-QAeiw&s',
        rating: 4.3,
        new: false,
        special: false
      },
      {
        id: 9,
        name: 'Spicy Buffalo Wings',
        description: 'Jumbo chicken wings tossed in your choice of mild, hot, or atomic buffalo sauce. Served with celery sticks and blue cheese dressing.',
        price: 7.99,
        spicy: true,
        vegetarian: false,
        image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        rating: 4.6,
        new: true,
        special: false
      }
    ],
    drinks: [
      {
        id: 10,
        name: 'Craft Soda',
        description: 'Handcrafted soda in flavors like vanilla cream, blood orange, and huckleberry. Made with real cane sugar.',
        price: 2.99,
        spicy: false,
        vegetarian: true,
        image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        rating: 4.1,
        new: false,
        special: false
      },
      {
        id: 11,
        name: 'Iced Tea',
        description: 'Freshly brewed black tea served over ice. Choose sweetened or unsweetened with lemon wedges on the side.',
        price: 2.49,
        spicy: false,
        vegetarian: true,
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        rating: 3.9,
        new: false,
        special: false
      },
      {
        id: 12,
        name: 'Milkshake',
        description: 'Creamy hand-spun milkshakes in vanilla, chocolate, strawberry, or seasonal special flavors. Topped with whipped cream.',
        price: 4.99,
        spicy: false,
        vegetarian: true,
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz_o7Fyh5jejJFuRnK7vSVA-Zbhzt6o87_Bg&s',
        rating: 4.7,
        new: true,
        special: true
      }
    ]
  };

  const addToCart = (item) => {
    setCart([...cart, item]);
    
    // Show notification
    setNotification({ show: true, message: `${item.name} added to cart!` });
    setTimeout(() => setNotification({ show: false, message: '' }), 3000);
    
    // Bounce animation
    const cartBtn = document.querySelector('.cart-toggle');
    if (cartBtn) {
      cartBtn.classList.add('bounce');
      setTimeout(() => cartBtn.classList.remove('bounce'), 1000);
    }
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    const removedItem = newCart.splice(index, 1)[0];
    setCart(newCart);
    
    // Show removal notification
    setNotification({ show: true, message: `${removedItem.name} removed from cart` });
    setTimeout(() => setNotification({ show: false, message: '' }), 3000);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };



  useEffect(() => {
    // Add animation classes when component mounts
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => title.classList.add('animate-slide-in'));
    
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((item, index) => {
      item.classList.add('animate-pop');
      item.style.animationDelay = `${index * 0.1 + 0.2}s`;
    });
  }, [activeCategory]);

  return (
    <div className={`menu-container ${darkMode ? 'dark-mode' : ''}`}>
      {/* Dark Mode Toggle */}
    
      {/* Particle Background */}
      <div className="particle-background"></div>
      <div className="bubbles">
        {[...Array(10)].map((_, i) => (
          <div key={i} className={`bubble bubble-${i + 1}`}></div>
        ))}
      </div>

      {/* Header */}
      <header className="menu-header">
        <h1 className="title-animate">Burger Haven</h1>
        <p className="subtitle-animate">Crafted with passion, served with perfection. Explore our artisanal burgers and sides.</p>
      </header>

      {/* Categories Navigation */}
      <nav className="menu-categories">
        {Object.keys(menuItems).map(category => (
          <button
            key={category}
            className={`category-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </nav>

      {/* Menu Items */}
      <section className="menu-items">
        <h2 className="section-title">
          {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
        </h2>
        <div className="items-grid">
          {menuItems[activeCategory].map(item => (
            <div key={item.id} className="menu-item">
              {item.special && <span className="special-badge">Chef's Special</span>}
              <img src={item.image} alt={item.name} className="item-image" />
              <div className="item-info">
                <h3>{item.name}</h3>
                <div className="tags">
                  {item.spicy && <span className="spicy-tag">Spicy</span>}
                  {item.vegetarian && <span className="veg-tag">Vegetarian</span>}
                  {item.new && <span className="new-tag">New</span>}
                </div>
                <div className="rating">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="star">
                      {i < Math.floor(item.rating) ? '★' : '☆'}
                    </span>
                  ))}
                  <span>({item.rating})</span>
                </div>
                <p>{item.description}</p>
                <div className="item-footer">
                  <span className="price">{item.price}</span>
                  <button 
                    className="add-to-cart" 
                    onClick={() => addToCart(item)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Shopping Cart */}
      <div className={`cart-container ${isCartOpen ? 'open' : ''}`}>
        <button className="cart-toggle" onClick={() => setIsCartOpen(!isCartOpen)}>
          🛒
          {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
        </button>
        <div className="cart-content">
          <div className="cart-header">
            <h3>Your Order</h3>
            <button className="close-cart" onClick={() => setIsCartOpen(false)}>
              ×
            </button>
          </div>
          {cart.length === 0 ? (
            <div className="empty-cart">Your cart is empty</div>
          ) : (
            <>
              <ul className="cart-items">
                {cart.map((item, index) => (
                  <li key={`${item.id}-${index}`} className="cart-item">
                    <div className="cart-item-info">
                      <img src={item.image} alt={item.name} className="cart-item-image" />
                      <span className="cart-item-name">{item.name}</span>
                    </div>
                    <span className="cart-item-price">{item.price}</span>
                    <button 
                      className="remove-item" 
                      onClick={() => removeFromCart(index)}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
              <div className="cart-total">
                <span>Total:</span>
                <span>${calculateTotal()}</span>
              </div>
              <button className="checkout-button">
                Checkout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Notification */}
      {notification.show && (
        <div className="notification show">
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default Menu;