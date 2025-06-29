import React, { useState, useEffect } from 'react';
import './About.css';

const About = ({ onBack }) => {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState({
    hero: false,
    story: false,
    philosophy: false,
    team: false,
    stats: false
  });

  // Placeholder image URLs
  const images = {
    team1: 'https://cubemayfair.com/_images/2022/10/600/owner-chef-with-sushi-expertise.jpg',
    team2: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    team3: 'https://www.howcast.com/.image/t_share/MTU5NzA0NjU0NzYzNzI5OTQw/zb-how-to-hire-a-restaurant-chef-promo-image.jpg',
    burgerIcon: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    restaurant: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    ingredients: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  };

  useEffect(() => {
    // Simulate hero image loading
    const timer = setTimeout(() => {
      setHeroLoaded(true);
      setIsVisible(prev => ({...prev, hero: true}));
    }, 300);

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target.getAttribute('data-section');
            setIsVisible(prev => ({...prev, [section]: true}));
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe each section
    document.querySelectorAll('[data-section]').forEach(section => {
      observer.observe(section);
    });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const stats = [
    { number: '100+', label: 'Burgers Created' },
    { number: '15+', label: 'Years Experience' },
    { number: '50+', label: 'Local Suppliers' },
    { number: '24/7', label: 'Fresh Ingredients' }
  ];

  const teamMembers = [
    { name: 'Chef Michael', role: 'Head Chef', image: images.team1, bio: 'With 20 years of culinary experience, Chef Michael brings creativity to every burger.' },
    { name: 'Sarah Johnson', role: 'Operations Manager', image: images.team2, bio: 'Sarah ensures every customer gets the perfect burger experience.' },
    { name: 'Carlos Mendez', role: 'Master Griller', image: images.team3, bio: 'Carlos has the magic touch for perfectly grilled patties every time.' }
  ];

  return (
    <div className="about-page">
      {/* Back Button */}
      {onBack && (
        <button 
          onClick={onBack} 
          className={`back-button ${heroLoaded ? 'loaded' : ''}`}
        >
          ← Back to Home
        </button>
      )}

      {/* Hero Section */}
      <section 
        className={`about-hero ${isVisible.hero ? 'visible' : ''}`} 
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${images.restaurant})` }}
        data-section="hero"
      >
        <div className="hero-content">
          <h1>OUR STORY</h1>
          <p>From humble beginnings to burger excellence</p>
        </div>
      </section>

      {/* Story Section */}
      <section 
        className="story-section" 
        data-section="story"
      >
        <div className="container">
          <div className={`story-content ${isVisible.story ? 'visible' : ''}`}>
            <div className="story-text">
              <h2>How It All Began</h2>
              <p>Founded in 2005 in a small food truck, our passion for crafting the perfect burger quickly gained a loyal following.</p>
              <p>Our secret? Never compromising on quality, even when it meant working 18-hour days to perfect our recipes.</p>
            </div>
            <div className="story-image">
              <img 
                src={images.burgerIcon} 
                alt="Original burger recipe" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section 
        className="philosophy-section" 
        data-section="philosophy"
      >
        <div className="container">
          <div className={`philosophy-content ${isVisible.philosophy ? 'visible' : ''}`}>
            <div className="philosophy-image">
              <img 
                src={images.ingredients} 
                alt="Fresh ingredients" 
              />
            </div>
            <div className="philosophy-text">
              <h2>Our Burger Philosophy</h2>
              <p>We believe a great burger starts with respect for ingredients.</p>
              <ul>
                <li>Source 100% grass-fed beef from local farms</li>
                <li>Bake buns fresh daily in-house</li>
                <li>Hand-cut fries to order</li>
                <li>Create signature sauces from scratch</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section 
        className="team-section" 
        data-section="team"
      >
        <div className="container">
          <h2 className={`${isVisible.team ? 'visible' : ''}`}>Meet The Burger Masters</h2>
          <div className={`team-grid ${isVisible.team ? 'visible' : ''}`}>
            {teamMembers.map((member, index) => (
              <div 
                key={member.name} 
                className={`team-card card-${index + 1}`}
              >
                <div 
                  className="team-image" 
                  style={{ backgroundImage: `url(${member.image})` }}
                ></div>
                <h3>{member.name}</h3>
                <p className="role">{member.role}</p>
                <p className="bio">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section 
        className="stats-section" 
        data-section="stats"
      >
        <div className="container">
          <div className={`stats-container ${isVisible.stats ? 'visible' : ''}`}>
            {stats.map((stat, index) => (
              <div 
                key={stat.label} 
                className={`stat-item stat-${index + 1}`}
              >
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;