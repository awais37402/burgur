import React, { useState, useEffect } from 'react';
import './MenuItemDetail.css';

const MenuItemDetail = ({ item, addToCart, onBack }) => {
  const [customization, setCustomization] = useState({
    size: 'medium',
    ingredients: {},
    spiceLevel: 'medium',
    quantity: 1
  });

  const [price, setPrice] = useState(item.price);
  const [activeImage, setActiveImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showZoom, setShowZoom] = useState(false);

  const galleryImages = [
    item.image,
    'https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  ];

  const [reviews, setReviews] = useState([
    { id: 1, user: 'Foodie123', rating: 5, comment: 'Absolutely delicious!', date: '2023-05-15' },
    { id: 2, user: 'BurgerFan', rating: 4, comment: 'Great but a bit spicy', date: '2023-04-22' }
  ]);

  const [reviewInput, setReviewInput] = useState({
    rating: 5,
    comment: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const initialIngredients = {};
    if (item.ingredients) {
      item.ingredients.forEach(ing => {
        initialIngredients[ing] = true;
      });
    }
    setCustomization(prev => ({
      ...prev,
      ingredients: initialIngredients
    }));
  }, [item]);

  useEffect(() => {
    let newPrice = item.price;

    if (customization.size === 'small') newPrice -= 2;
    if (customization.size === 'large') newPrice += 3;

    const removedCount = Object.values(customization.ingredients).filter(v => !v).length;
    newPrice -= removedCount * 0.5;

    setPrice(Math.max(newPrice, item.price * 0.7));
  }, [customization, item.price]);

  const handleIngredientToggle = (ingredient) => {
    setCustomization(prev => ({
      ...prev,
      ingredients: {
        ...prev.ingredients,
        [ingredient]: !prev.ingredients[ingredient]
      }
    }));
  };

  const handleAddToCart = () => {
    const itemToAdd = {
      ...item,
      customization,
      price,
      quantity: customization.quantity
    };

    addToCart(itemToAdd);

    const btn = document.querySelector('.add-to-cart-btn');
    if (btn) {
      btn.classList.add('animate');
      setTimeout(() => btn.classList.remove('animate'), 1000);
    }
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const newReview = {
      id: reviews.length + 1,
      user: 'You',
      rating: reviewInput.rating,
      comment: reviewInput.comment,
      date: new Date().toISOString().split('T')[0]
    };
    setReviews([...reviews, newReview]);
    setReviewInput({ rating: 5, comment: '' });
  };

  const calculateDeliveryTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 30 + (now.getMinutes() % 15));
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const averageRating = reviews.length > 0 
    ? reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length 
    : 0;

  return (
    <div className="menu-details">
      <button className="back-btn" onClick={onBack}>
        ← Back to Menu
      </button>

      <div className="item-header">
        <h1>{item.name}</h1>
        <div className="item-meta">
          <div className="rating">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < Math.floor(averageRating) ? 'filled' : ''}>★</span>
            ))}
            <span>({reviews.length})</span>
          </div>
          <button
            className={`fav-btn ${isFavorite ? 'active' : ''}`}
            onClick={() => setIsFavorite(!isFavorite)}
          >
            {isFavorite ? '❤️ Saved' : '♡ Save'}
          </button>
        </div>
      </div>

      <div className="content-grid">
        <div className="gallery">
          <div className="main-img" onClick={() => setShowZoom(true)}>
            <img src={galleryImages[activeImage]} alt={item.name} />
            <div className="badges">
              {item.new && <span className="new">NEW</span>}
              {item.spicy && <span className="spicy">SPICY</span>}
              {item.vegetarian && <span className="veg">VEG</span>}
            </div>
          </div>

          <div className="thumbnails">
            {galleryImages.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${item.name} ${i + 1}`}
                className={i === activeImage ? 'active' : ''}
                onClick={() => setActiveImage(i)}
              />
            ))}
          </div>

          {showZoom && (
            <div className="zoom-modal" onClick={() => setShowZoom(false)}>
              <img src={galleryImages[activeImage]} alt={item.name} />
              <button className="close-btn" onClick={(e) => {
                e.stopPropagation();
                setShowZoom(false);
              }}>×</button>
            </div>
          )}
        </div>

        <div className="customization">
          <h2>Customize Your Order</h2>

          <div className="option-group">
            <h3>Size</h3>
            <div className="size-options">
              {['small', 'medium', 'large'].map(size => (
                <label key={size} className={customization.size === size ? 'selected' : ''}>
                  <input
                    type="radio"
                    name="size"
                    value={size}
                    checked={customization.size === size}
                    onChange={() => setCustomization(prev => ({ ...prev, size }))}
                  />
                  {size.charAt(0).toUpperCase() + size.slice(1)}
                  {size === 'small' && ' (-$2)'}
                  {size === 'large' && ' (+$3)'}
                </label>
              ))}
            </div>
          </div>

          {item.ingredients && (
            <div className="option-group">
              <h3>Ingredients</h3>
              <div className="ingredients-list">
                {item.ingredients.map(ing => (
                  <label key={ing}>
                    <input
                      type="checkbox"
                      checked={customization.ingredients[ing]}
                      onChange={() => handleIngredientToggle(ing)}
                    />
                    <span className={`checkmark ${!customization.ingredients[ing] ? 'removed' : ''}`}></span>
                    {ing}
                    {!customization.ingredients[ing] && <span className="removed-tag">(removed)</span>}
                  </label>
                ))}
              </div>
            </div>
          )}

          {item.spicy && (
            <div className="option-group">
              <h3>Spice Level</h3>
              <div className="spice-options">
                {['mild', 'medium', 'hot'].map(level => (
                  <label key={level} className={customization.spiceLevel === level ? 'selected' : ''}>
                    <input
                      type="radio"
                      name="spiceLevel"
                      value={level}
                      checked={customization.spiceLevel === level}
                      onChange={() => setCustomization(prev => ({ ...prev, spiceLevel: level }))}
                    />
                    {level.charAt(0).toUpperCase() + level.slice(1)}
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="option-group">
            <h3>Quantity</h3>
            <div className="quantity-control">
              <button onClick={() => setCustomization(prev => ({ ...prev, quantity: Math.max(1, prev.quantity - 1) }))}>−</button>
              <span>{customization.quantity}</span>
              <button onClick={() => setCustomization(prev => ({ ...prev, quantity: prev.quantity + 1 }))}>+</button>
            </div>
          </div>

          <div className="price-panel">
            <div className="price-display">
              <span>Total:</span>
              <span className="price">${(price * customization.quantity).toFixed(2)}</span>
            </div>
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <div className="delivery-time">
              Estimated ready by: {calculateDeliveryTime()}
            </div>
          </div>
        </div>
      </div>

      <div className="details-tabs">
        <input type="radio" id="tab-desc" name="tabs" defaultChecked />
        <label htmlFor="tab-desc">Description</label>

        <input type="radio" id="tab-nutrition" name="tabs" />
        <label htmlFor="tab-nutrition">Nutrition</label>

        <input type="radio" id="tab-reviews" name="tabs" />
        <label htmlFor="tab-reviews">Reviews</label>

        <div className="tab-content" id="content-desc">
          <h3>About This Item</h3>
          <p>{item.details || 'No description available.'}</p>
        </div>

        <div className="tab-content" id="content-nutrition">
          <h3>Nutritional Information</h3>
          <div className="nutrition-grid">
            <div><span className="value">{item.calories || 'N/A'}</span><span className="label">Calories</span></div>
            <div><span className="value">32g</span><span className="label">Protein</span></div>
            <div><span className="value">45g</span><span className="label">Carbs</span></div>
            <div><span className="value">28g</span><span className="label">Fat</span></div>
          </div>
          <h4>Allergens</h4>
          <ul>
            <li>Contains: Gluten, Dairy</li>
            <li>May contain traces of nuts</li>
          </ul>
        </div>

        <div className="tab-content" id="content-reviews">
          {reviews.map(review => (
            <div key={review.id} className="review">
              <div className="review-header">
                <span>{review.user}</span>
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < review.rating ? 'filled' : ''}>★</span>
                  ))}
                </div>
                <span className="date">{review.date}</span>
              </div>
              <p>{review.comment}</p>
            </div>
          ))}

          <form onSubmit={handleReviewSubmit}>
            <h4>Add Your Review</h4>
            <div className="rating-input">
              {[1, 2, 3, 4, 5].map(star => (
                <span
                  key={star}
                  className={star <= reviewInput.rating ? 'active' : ''}
                  onClick={() => setReviewInput(prev => ({ ...prev, rating: star }))}
                >★</span>
              ))}
            </div>
            <textarea
              placeholder="Share your thoughts..."
              value={reviewInput.comment}
              onChange={(e) => setReviewInput(prev => ({ ...prev, comment: e.target.value }))}
              required
            />
            <button type="submit">Submit Review</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MenuItemDetail;