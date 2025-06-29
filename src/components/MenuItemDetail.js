import React, { useState, useEffect } from 'react';
import './MenuItemDetail.css';

const MenuItemDetail = ({ item, addToCart, onBack, recommendedItems }) => {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('description');
  const [favorite, setFavorite] = useState(false);
  const [showNutritionModal, setShowNutritionModal] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [zoomImage, setZoomImage] = useState(false);
  const [showBurgerCustomization, setShowBurgerCustomization] = useState(false);

  // Default customization options for burgers
  const defaultBurgerOptions = {
    size: 'medium',
    ingredients: {
      cheese: true,
      lettuce: true,
      tomato: true,
      onion: true,
      pickles: true,
    },
    sauces: ['ketchup', 'mustard'],
    spiceLevel: 'medium',
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    if (item.options) {
      const defaultOptions = {};
      item.options.forEach((option) => {
        defaultOptions[option.name] = option.choices[0].name;
      });
      setSelectedOptions(defaultOptions);
    } else if (item.category === 'Burgers') {
      setSelectedOptions(defaultBurgerOptions);
    }

    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setFavorite(favorites.includes(item.id));

    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [item]);

  const handleOptionChange = (optionName, choiceName) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [optionName]: choiceName,
    }));
  };

  const handleIngredientToggle = (ingredient) => {
    setSelectedOptions((prev) => ({
      ...prev,
      ingredients: {
        ...prev.ingredients,
        [ingredient]: !prev.ingredients[ingredient],
      },
    }));
  };

  const handleSauceToggle = (sauce) => {
    setSelectedOptions((prev) => {
      const currentSauces = prev.sauces || [];
      const newSauces = currentSauces.includes(sauce)
        ? currentSauces.filter((s) => s !== sauce)
        : [...currentSauces, sauce];
      return {
        ...prev,
        sauces: newSauces,
      };
    });
  };

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const handleAddToCart = () => {
    const itemWithOptions = {
      ...item,
      quantity,
      selectedOptions,
    };
    addToCart(itemWithOptions);

    const btn = document.querySelector('.add-to-cart-btn');
    if (btn) {
      btn.textContent = 'Added!';
      setTimeout(() => {
        btn.textContent = 'Add to Cart';
      }, 2000);
    }
  };

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    let updatedFavorites;

    if (favorite) {
      updatedFavorites = favorites.filter((id) => id !== item.id);
    } else {
      updatedFavorites = [...favorites, item.id];
    }

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorite(!favorite);

    const feedback = document.querySelector('.favorite-feedback');
    if (feedback) {
      feedback.style.display = 'block';
      setTimeout(() => {
        feedback.style.display = 'none';
      }, 2000);
    }
  };

  const calculateTotalPrice = () => {
    let basePrice = item.price;

    if (item.category === 'Burgers' && selectedOptions.size) {
      switch (selectedOptions.size) {
        case 'small':
          basePrice -= 2;
          break;
        case 'large':
          basePrice += 2;
          break;
        default:
          break;
      }
    }

    if (item.options) {
      item.options.forEach((option) => {
        const selectedChoice = option.choices.find(
          (choice) => choice.name === selectedOptions[option.name]
        );
        if (selectedChoice && selectedChoice.additionalPrice) {
          basePrice += selectedChoice.additionalPrice;
        }
      });
    }

    return basePrice * quantity;
  };

  const handleRecommendedItemClick = (recommendedItem) => {
    setSelectedOptions({});
    setQuantity(1);
    setIsLoading(true);
    setActiveTab('description');
    console.log('Recommended item clicked:', recommendedItem.id);
  };

  const shareItem = (platform) => {
    let url = '';
    const shareText = `Check out ${item.name} from our menu!`;

    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(window.location.href)}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${window.location.href}`)}`;
        break;
      default:
        break;
    }

    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
    setShowShareOptions(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowShareOptions(false);
    alert('Link copied to clipboard!');
  };

  if (isLoading) {
    return (
      <div className="detail-loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <button className="back-button" onClick={onBack}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Menu
      </button>

      <div className="detail-container">
        <div className={`detail-image-container ${zoomImage ? 'zoomed' : ''}`}>
          <img
            src={item.image}
            alt={item.name}
            className="detail-image"
            loading="lazy"
            onClick={() => setZoomImage(!zoomImage)}
          />
          <div className="detail-badges">
            {item.isNew && <span className="new-badge">NEW</span>}
            {item.spicyLevel > 0 && (
              <span className={`spicy-badge level-${item.spicyLevel}`}>
                {Array(item.spicyLevel).fill('🌶️').join('')} SPICY
              </span>
            )}
            {item.dietary?.includes('vegetarian') && <span className="veg-badge">VEGETARIAN</span>}
            {item.dietary?.includes('vegan') && <span className="vegan-badge">VEGAN</span>}
            {item.dietary?.includes('gluten-free') && <span className="gf-badge">GLUTEN FREE</span>}
          </div>

          <div className="image-actions">
            <button
              className={`favorite-btn ${favorite ? 'active' : ''}`}
              onClick={toggleFavorite}
              aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill={favorite ? 'currentColor' : 'none'} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <button
              className="share-btn"
              onClick={() => setShowShareOptions(!showShareOptions)}
              aria-label="Share this item"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div>

          {showShareOptions && (
            <div className="share-options">
              <button onClick={() => shareItem('facebook')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2" stroke="none">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
                Facebook
              </button>
              <button onClick={() => shareItem('twitter')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#1DA1F2" stroke="none">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
                Twitter
              </button>
              <button onClick={() => shareItem('whatsapp')}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366" stroke="none">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335 .157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </button>
              <button onClick={copyToClipboard}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                Copy Link
              </button>
            </div>
          )}

          <div className="favorite-feedback" style={{ display: 'none' }}>
            {favorite ? 'Added to favorites!' : 'Removed from favorites'}
          </div>

          {item.specialNote && (
            <div className="special-note">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {item.specialNote}
            </div>
          )}
        </div>

        <div className="detail-content">
          <div className="detail-header">
            <h1 className="detail-title">{item.name}</h1>
            <div className="detail-meta">
              {item.category && <span className="category">{item.category}</span>}
              {item.preparationTime && (
                <span className="prep-time">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {item.preparationTime} min
                </span>
              )}
              {item.calories && (
                <button
                  className="calories-btn"
                  onClick={() => setShowNutritionModal(true)}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  {item.calories} cal
                </button>
              )}
            </div>
          </div>

          <div className="detail-rating-reviews">
            <div className="detail-rating">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.floor(item.rating) ? 'star-filled' : 'star-empty'}>
                  ★
                </span>
              ))}
              <span className="rating-value">{item.rating.toFixed(1)}</span>
            </div>
            {item.reviewCount > 0 && (
              <button className="reviews-link" onClick={() => setActiveTab('reviews')}>
                {item.reviewCount} {item.reviewCount === 1 ? 'review' : 'reviews'}
              </button>
            )}
          </div>

          <div className="detail-tabs">
            <button
              className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button
              className={`tab-btn ${activeTab === 'nutrition' ? 'active' : ''}`}
              onClick={() => setActiveTab('nutrition')}
            >
              Nutrition
            </button>
            <button
              className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'description' && (
              <>
                <p className="detail-description">{item.description}</p>

                {item.highlights && item.highlights.length > 0 && (
                  <div className="detail-section">
                    <h2>Highlights</h2>
                    <ul className="highlights-list">
                      {item.highlights.map((highlight, index) => (
                        <li key={index}>
                          <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {item.ingredients && item.ingredients.length > 0 && (
                  <div className="detail-section">
                    <h2>Ingredients</h2>
                    <ul className="ingredients-list">
                      {item.ingredients.map((ingredient, index) => (
                        <li key={index}>
                          {ingredient.allergen && (
                            <span className="allergen-indicator" title={ingredient.allergen}></span>
                          )}
                          {ingredient.name}
                          {ingredient.organic && <span className="organic-tag">ORGANIC</span>}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {item.allergens && item.allergens.length > 0 && (
                  <div className="detail-section">
                    <h2>Allergens</h2>
                    <div className="allergens-list">
                      {item.allergens.map((allergen, index) => (
                        <span key={index} className="allergen-tag" title={allergen.description}>
                          {allergen.name}
                        </span>
                      ))}
                    </div>
                    <p className="allergen-disclaimer">
                      Please inform your server of any allergies. While we take precautions, we cannot guarantee a completely allergen-free environment.
                    </p>
                  </div>
                )}
              </>
            )}

            {activeTab === 'nutrition' && (
              <div className="nutrition-section">
                <div className="nutrition-facts">
                  <div className="nutrition-header">
                    <h3>Nutrition Facts</h3>
                    <span>Serving Size: {item.servingSize || '1 serving'}</span>
                  </div>

                  <div className="nutrition-row main">
                    <span>Calories</span>
                    <span>{item.calories || '--'}</span>
                  </div>

                  <div className="nutrition-divider"></div>

                  <div className="nutrition-row">
                    <span>Total Fat</span>
                    <span>{item.nutrition?.fat || '--'}g</span>
                    {item.nutrition?.fat && <span>{Math.round(item.nutrition.fat / 65 * 100)}%</span>}
                  </div>
                  <div className="nutrition-subrow">
                    <span>Saturated Fat</span>
                    <span>{item.nutrition?.saturatedFat || '--'}g</span>
                    {item.nutrition?.saturatedFat && <span>{Math.round(item.nutrition.saturatedFat / 20 * 100)}%</span>}
                  </div>
                  <div className="nutrition-subrow">
                    <span>Trans Fat</span>
                    <span>{item.nutrition?.transFat || '--'}g</span>
                  </div>

                  <div className="nutrition-row">
                    <span>Cholesterol</span>
                    <span>{item.nutrition?.cholesterol || '--'}mg</span>
                    {item.nutrition?.cholesterol && <span>{Math.round(item.nutrition.cholesterol / 300 * 100)}%</span>}
                  </div>

                  <div className="nutrition-row">
                    <span>Sodium</span>
                    <span>{item.nutrition?.sodium || '--'}mg</span>
                    {item.nutrition?.sodium && <span>{Math.round(item.nutrition.sodium / 2400 * 100)}%</span>}
                  </div>

                  <div className="nutrition-row">
                    <span>Total Carbohydrates</span>
                    <span>{item.nutrition?.carbs || '--'}g</span>
                    {item.nutrition?.carbs && <span>{Math.round(item.nutrition.carbs / 300 * 100)}%</span>}
                  </div>
                  <div className="nutrition-subrow">
                    <span>Dietary Fiber</span>
                    <span>{item.nutrition?.fiber || '--'}g</span>
                    {item.nutrition?.fiber && <span>{Math.round(item.nutrition.fiber / 25 * 100)}%</span>}
                  </div>
                  <div className="nutrition-subrow">
                    <span>Sugars</span>
                    <span>{item.nutrition?.sugars || '--'}g</span>
                    {item.nutrition?.sugars && <span>Includes {item.nutrition?.addedSugars || '--'}g Added Sugars</span>}
                  </div>

                  <div className="nutrition-row main">
                    <span>Protein</span>
                    <span>{item.nutrition?.protein || '--'}g</span>
                  </div>

                  {item.nutrition?.vitamins && (
                    <>
                      <div className="nutrition-divider"></div>
                      <div className="vitamins-minerals">
                        {Object.entries(item.nutrition.vitamins).map(([name, value]) => (
                          <div key={name} className="nutrition-micro">
                            <span>{name}</span>
                            <span>{value}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  <div className="nutrition-disclaimer">
                    <p>* Percent Daily Values are based on a 2,000 calorie diet. Your daily values may be higher or lower depending on your calorie needs.</p>
                    {item.nutrition?.disclaimer && <p>{item.nutrition.disclaimer}</p>}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="reviews-section">
                {item.reviews && item.reviews.length > 0 ? (
                  <>
                    <div className="reviews-summary">
                      <div className="average-rating">
                        <span className="big-rating">{item.rating.toFixed(1)}</span>
                        <div className="stars">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < Math.floor(item.rating) ? 'star-filled' : 'star-empty'}>
                              ★
                            </span>
                          ))}
                        </div>
                        <span>{item.reviewCount} reviews</span>
                      </div>
                      <div className="rating-distribution">
                        {[5, 4, 3, 2, 1].map((star) => {
                          const count = item.reviews.filter((r) => Math.floor(r.rating) === star).length;
                          const percentage = (count / item.reviews.length) * 100;
                          return (
                            <div key={star} className="rating-bar">
                              <span>{star} star</span>
                              <div className="bar-container">
                                <div
                                  className="bar-fill"
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                              <span>{count}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="reviews-list">
                      {item.reviews.map((review, index) => (
                        <div key={index} className="review-item">
                          <div className="review-header">
                            <div className="reviewer">
                              <div className="reviewer-avatar">
                                {review.userName.charAt(0).toUpperCase()}
                              </div>
                              <div className="reviewer-info">
                                <span className="reviewer-name">{review.userName}</span>
                                <span className="review-date">
                                  {new Date(review.date).toLocaleDateString()}
                                </span>
                                {review.verified && (
                                  <span className="verified-buyer">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="#1a73e8" stroke="none">
                                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                    </svg>
                                    Verified Buyer
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="review-rating">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className={i < review.rating ? 'star-filled' : 'star-empty'}>
                                  ★
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="review-content">
                            <h4>{review.title}</h4>
                            <p>{review.comment}</p>
                            {review.photos && review.photos.length > 0 && (
                              <div className="review-photos">
                                {review.photos.map((photo, i) => (
                                  <img key={i} src={photo} alt={`Review photo ${i + 1}`} />
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="no-reviews">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    <p>No reviews yet</p>
                    <button className="leave-review-btn">Be the first to review</button>
                  </div>
                )}
              </div>
            )}
          </div>

          {item.category === 'Burgers' && (
            <button 
              className="customize-btn"
              onClick={() => setShowBurgerCustomization(true)}
            >
              Customize Your Burger
            </button>
          )}

          {showBurgerCustomization && (
            <div className="burger-customization-modal">
              <div className="modal-content">
                <button 
                  className="modal-close" 
                  onClick={() => setShowBurgerCustomization(false)}
                  aria-label="Close customization"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                <h3>Customize Your Burger</h3>

                <div className="option-group">
                  <h4>Size <span className="required-asterisk">*</span></h4>
                  <div className="option-choices">
                    {['small', 'medium', 'large'].map((size) => (
                      <button
                        key={size}
                        className={`choice-btn ${selectedOptions.size === size ? 'selected' : ''}`}
                        onClick={() => handleOptionChange('size', size)}
                      >
                        {size.charAt(0).toUpperCase() + size.slice(1)}
                        <span className="additional-price">
                          {size === 'small' ? '-$2.00' : size === 'large' ? '+$2.00' : 'Standard'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="option-group">
                  <h4>Ingredients</h4>
                  <div className="ingredients-grid">
                    {['cheese', 'lettuce', 'tomato', 'onion', 'pickles'].map((ingredient) => (
                      <div
                        key={ingredient}
                        className={`ingredient-option ${selectedOptions.ingredients?.[ingredient] ? 'selected' : ''}`}
                        onClick={() => handleIngredientToggle(ingredient)}
                      >
                        <span className="ingredient-name">
                          {ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}
                        </span>
                        <span className="ingredient-toggle">
                          {selectedOptions.ingredients?.[ingredient] ? '✓' : '✕'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="option-group">
                  <h4>Sauces</h4>
                  <div className="sauces-grid">
                    {['ketchup', 'mustard', 'mayo', 'bbq'].map((sauce) => (
                      <div
                        key={sauce}
                        className={`sauce-option ${selectedOptions.sauces?.includes(sauce) ? 'selected' : ''}`}
                        onClick={() => handleSauceToggle(sauce)}
                      >
                        <span className="sauce-name">
                          {sauce.charAt(0).toUpperCase() + sauce.slice(1)}
                        </span>
                        <span className="sauce-toggle">
                          {selectedOptions.sauces?.includes(sauce) ? '✓' : '✕'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="option-group">
                  <h4>Spice Level <span className="required-asterisk">*</span></h4>
                  <div className="spice-levels">
                    {['mild', 'medium', 'hot'].map((level) => (
                      <button
                        key={level}
                        className={`spice-btn ${selectedOptions.spiceLevel === level ? 'selected' : ''}`}
                        onClick={() => handleOptionChange('spiceLevel', level)}
                      >
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  className="save-customization-btn"
                  onClick={() => setShowBurgerCustomization(false)}
                >
                  Save Customization
                </button>
              </div>
            </div>
          )}

          {item.options && item.options.length > 0 && item.category !== 'Burgers' && (
            <div className="item-options">
              <h3>Customize Your Order</h3>
              {item.options.map((option, index) => (
                <div key={index} className="option-group">
                  <h4>
                    {option.name} {option.required && <span className="required-asterisk">*</span>}
                  </h4>
                  <div className="option-choices">
                    {option.choices.map((choice, idx) => (
                      <button
                        key={idx}
                        className={`choice-btn ${selectedOptions[option.name] === choice.name ? 'selected' : ''}`}
                        onClick={() => handleOptionChange(option.name, choice.name)}
                      >
                        {choice.name}
                        {choice.additionalPrice > 0 && (
                          <span className="additional-price">+${choice.additionalPrice.toFixed(2)}</span>
                        )}
                        {choice.description && (
                          <span className="choice-description">{choice.description}</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="detail-footer">
            <div className="quantity-selector">
              <button
                className="quantity-btn minus"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                −
              </button>
              <span className="quantity-value">{quantity}</span>
              <button
                className="quantity-btn plus"
                onClick={() => handleQuantityChange(1)}
              >
                +
              </button>
            </div>

            <div className="price-container">
              <span className="detail-price">${calculateTotalPrice().toFixed(2)}</span>
              {quantity > 1 && (
                <span className="unit-price">
                  ${(calculateTotalPrice() / quantity).toFixed(2)} each
                </span>
              )}
            </div>

            <button
              className="add-to-cart-btn"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {recommendedItems && recommendedItems.length > 0 && (
        <div className="recommended-items">
          <h2>You Might Also Like</h2>
          <div className="recommended-grid">
            {recommendedItems.map((recommended) => (
              <div
                key={recommended.id}
                className="recommended-item"
                onClick={() => handleRecommendedItemClick(recommended)}
              >
                <img src={recommended.image} alt={recommended.name} />
                <div className="recommended-info">
                  <h3>{recommended.name}</h3>
                  <div className="recommended-price">${recommended.price.toFixed(2)}</div>
                  <div className="recommended-rating">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(recommended.rating) ? 'star-filled' : 'star-empty'}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showNutritionModal && (
        <div className="nutrition-modal">
          <div className="modal-content">
            <button className="modal-close" onClick={() => setShowNutritionModal(false)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3>Nutrition Information</h3>
            <div className="nutrition-modal-facts">
              <div className="nutrition-row">
                <span>Calories</span>
                <span>{item.calories || '--'}</span>
              </div>
              <div className="nutrition-row">
                <span>Protein</span>
                <span>{item.nutrition?.protein || '--'}g</span>
              </div>
              <div className="nutrition-row">
                <span>Carbs</span>
                <span>{item.nutrition?.carbs || '--'}g</span>
              </div>
              <div className="nutrition-row">
                <span>Fat</span>
                <span>{item.nutrition?.fat || '--'}g</span>
              </div>
            </div>
            <p className="nutrition-disclaimer">
              Nutrition information is approximate and may vary based on preparation methods and specific ingredients used.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuItemDetail;