import React, { useState, useEffect } from 'react';
import './BurgerTestimonialsSlider.css';

const BurgerTestimonialsSlider = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      comment: "The double cheeseburger is life-changing! Perfectly cooked every time.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 2,
      name: "Mike Rodriguez",
      rating: 4,
      comment: "Best bacon burger I've ever had. The smoky flavor is incredible!",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 3,
      name: "Emily Chen",
      rating: 5,
      comment: "The truffle mushroom burger is worth every penny. Service was excellent!",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    },
    {
      id: 4,
      name: "David Wilson",
      rating: 5,
      comment: "Juicy, flavorful patties with the perfect bun-to-meat ratio. Amazing!",
      avatar: "https://randomuser.me/api/portraits/men/75.jpg"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState('right');

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection('right');
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const goToPrev = () => {
    setDirection('left');
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setDirection('right');
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span 
        key={i} 
        className={`burger-slider-star ${i < rating ? 'burger-slider-star-active' : ''}`}
      >
        ★
      </span>
    ));
  };

  return (
    <section className="burger-slider-section">
      <h2 className="burger-slider-title">Burger Lovers Say</h2>
      
      <div className="burger-slider-container">
        <button 
          className="burger-slider-arrow burger-slider-arrow-left" 
          onClick={goToPrev}
          aria-label="Previous testimonial"
        >
          &lt;
        </button>
        
        <div className="burger-slider-track">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className={`
                burger-slider-card 
                ${index === currentIndex ? 'burger-slider-card-active' : ''}
                ${index === currentIndex ? `burger-slider-slide-${direction}` : ''}
              `}
            >
              <div className="burger-slider-avatar-wrapper">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="burger-slider-avatar" 
                />
              </div>
              <div className="burger-slider-content">
                <div className="burger-slider-rating">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="burger-slider-text">"{testimonial.comment}"</p>
                <p className="burger-slider-name">— {testimonial.name}</p>
              </div>
            </div>
          ))}
        </div>
        
        <button 
          className="burger-slider-arrow burger-slider-arrow-right" 
          onClick={goToNext}
          aria-label="Next testimonial"
        >
          &gt;
        </button>
      </div>
      
      <div className="burger-slider-dots">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`burger-slider-dot ${index === currentIndex ? 'burger-slider-dot-active' : ''}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default BurgerTestimonialsSlider;