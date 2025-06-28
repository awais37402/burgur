import React, { useState, useEffect } from 'react';
import './About.css';

const About = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('story');
  const [scrollPosition, setScrollPosition] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);

  // Placeholder image URLs
  const images = {
    team1: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    team2: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    team3: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    burgerIcon: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    restaurant: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    ingredients: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 1000);
    return () => clearTimeout(timer);
  }, [activeTab]);

  useEffect(() => {
    // Simulate hero image loading
    const timer = setTimeout(() => setHeroLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const tabs = [
    { id: 'story', label: 'Our Story' },
    { id: 'philosophy', label: 'Our Philosophy' },
    { id: 'team', label: 'Meet The Team' }
  ];

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
        <button onClick={onBack} className={`back-button ${heroLoaded ? 'loaded' : ''}`}>
          ← Back to Home
        </button>
      )}

      {/* Hero Section */}
      <section className={`about-hero ${heroLoaded ? 'loaded' : ''}`} 
               style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${images.restaurant})` }}>
        <div className="hero-content">
          <h1 className={scrollPosition > 50 ? 'scrolled' : ''}>OUR STORY</h1>
          <p>From humble beginnings to burger excellence</p>
        </div>
      </section>

      {/* Navigation Tabs */}
      <nav className="about-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Tab Content */}
      <div className={`tab-content ${animate ? 'fade-in' : ''}`}>
        {activeTab === 'story' && (
          <div className="story-section">
            <div className="story-text">
              <h2 className="slide-in">How It All Began</h2>
              <p className="fade-in-delay-1">Founded in 2005 in a small food truck, our passion for crafting the perfect burger quickly gained a loyal following.</p>
              <p className="fade-in-delay-2">Our secret? Never compromising on quality, even when it meant working 18-hour days to perfect our recipes.</p>
            </div>
            <div className="story-image">
              <img 
                src={images.burgerIcon} 
                alt="Original burger recipe" 
                className="scale-in"
              />
            </div>
          </div>
        )}

        {activeTab === 'philosophy' && (
          <div className="philosophy-section">
            <div className="philosophy-image">
              <img 
                src={images.ingredients} 
                alt="Fresh ingredients" 
                className="slide-in-left"
              />
            </div>
            <div className="philosophy-text">
              <h2 className="slide-in">Our Burger Philosophy</h2>
              <p className="fade-in-delay-1">We believe a great burger starts with respect for ingredients.</p>
              <ul className="staggered-list">
                <li className="staggered-item-1">Source 100% grass-fed beef from local farms</li>
                <li className="staggered-item-2">Bake buns fresh daily in-house</li>
                <li className="staggered-item-3">Hand-cut fries to order</li>
                <li className="staggered-item-4">Create signature sauces from scratch</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'team' && (
          <div className="team-section">
            <h2 className="slide-in">Meet The Burger Masters</h2>
            <div className="team-grid">
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
        )}
      </div>

      {/* Stats Section */}
      <section className="stats-section">
        {stats.map((stat, index) => (
          <div 
            key={stat.label} 
            className={`stat-item stat-${index + 1}`}
          >
            <div className="stat-number">{stat.number}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default About;