import React from 'react';
import './BurgerDeliveryLocations.css';

const BurgerDeliveryLocations = () => {
  // Delivery areas data
  const deliveryAreas = [
    { id: 1, area: "Downtown District", time: "25-35 mins", popular: true },
    { id: 2, area: "Riverside Quarter", time: "30-45 mins", popular: false },
    { id: 3, area: "Northside Neighborhood", time: "35-50 mins", popular: true },
    { id: 4, area: "Eastside Suburbs", time: "40-55 mins", popular: false }
  ];

  // Restaurant locations data
  const locations = [
    { 
      id: 1, 
      name: "Burger Central Downtown", 
      address: "123 Main St, Food District", 
      phone: "(555) 123-4567",
      hours: "10AM - 11PM Daily",
      coords: { lat: 40.7128, lng: -74.0060 } // New York coordinates
    },
    { 
      id: 2, 
      name: "Burger Shack Riverside", 
      address: "456 River Rd, Waterside", 
      phone: "(555) 987-6543",
      hours: "11AM - 10PM Daily",
      coords: { lat: 40.7200, lng: -74.0000 } // Nearby coordinates
    }
  ];

  // Simple map solution without API key
  const renderMap = () => {
    return (
      <iframe 
        title="Restaurant Locations Map"
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ border: 0, minHeight: '300px' }}
        src={`https://maps.google.com/maps?q=${locations[0].coords.lat},${locations[0].coords.lng}&z=13&output=embed`}
        allowFullScreen
      ></iframe>
    );
  };

  return (
    <section className="deluxe-delivery-section">
      {/* Animated background elements */}
      <div className="deluxe-animated-bg">
        <div className="deluxe-burger-bg"></div>
        <div className="deluxe-burger-bg"></div>
        <div className="deluxe-burger-bg"></div>
      </div>
      
      <div className="deluxe-container">
        {/* Main Title with animation */}
        <div className="deluxe-title-wrapper">
          <h2 className="deluxe-main-title">
            <span className="deluxe-title-icon">🚀</span>
            <span className="deluxe-title-text">
              <span className="deluxe-title-main">Burger Delivery</span>
              <span className="deluxe-title-sub">Fast & Tasty</span>
            </span>
          </h2>
        </div>
        
        {/* Delivery Info Grid */}
        <div className="deluxe-grid">
          {/* Delivery Times Card */}
          <div className="deluxe-card deluxe-times-card">
            <div className="deluxe-card-header">
              <span className="deluxe-card-icon">⏱️</span>
              <h3 className="deluxe-card-title">Delivery Times</h3>
              <div className="deluxe-card-ribbon">HOT ZONES</div>
            </div>
            <div className="deluxe-card-content">
              <p className="deluxe-card-text">
                Our juicy burgers are racing to your doorstep! Average delivery times:
              </p>
              <ul className="deluxe-areas-list">
                {deliveryAreas.map(area => (
                  <li key={area.id} className={`deluxe-area-item ${area.popular ? 'popular' : ''}`}>
                    <span className="deluxe-area-name">
                      {area.area}
                      {area.popular && <span className="deluxe-popular-badge">Popular</span>}
                    </span>
                    <span className="deluxe-area-time">
                      <span className="deluxe-time-icon">⏳</span>
                      {area.time}
                    </span>
                  </li>
                ))}
              </ul>
              <button className="deluxe-order-btn">
                Order Now
                <span className="deluxe-btn-icon">🍔</span>
              </button>
            </div>
          </div>
          
          {/* Interactive Map Card */}
          <div className="deluxe-card deluxe-map-card">
            <div className="deluxe-card-header">
              <span className="deluxe-card-icon">📍</span>
              <h3 className="deluxe-card-title">Delivery Coverage</h3>
            </div>
            <div className="deluxe-map-container">
              {renderMap()}
              <div className="deluxe-map-overlay">
                {locations.map(loc => (
                  <div 
                    key={loc.id} 
                    className="deluxe-map-marker"
                    style={{
                      top: `${50 + (loc.coords.lat - locations[0].coords.lat) * 500}px`,
                      left: `${50 + (loc.coords.lng - locations[0].coords.lng) * 500}px`
                    }}
                  >
                    <div className="deluxe-marker-pulse"></div>
                    <div className="deluxe-marker-pin">🍔</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Restaurant Locations */}
        <div className="deluxe-locations-section">
          <div className="deluxe-section-header">
            <h3 className="deluxe-locations-title">
              <span className="deluxe-title-icon">🏪</span>
              Our Burger Joints
            </h3>
            <p className="deluxe-locations-subtitle">Visit us for the full experience!</p>
          </div>
          
          <div className="deluxe-locations-grid">
            {locations.map(location => (
              <div key={location.id} className="deluxe-location-card">
                <div className="deluxe-location-badge">BESTSELLER</div>
                <h4 className="deluxe-location-name">{location.name}</h4>
                
                <div className="deluxe-location-info">
                  <span className="deluxe-info-icon">📍</span>
                  <p className="deluxe-location-address">{location.address}</p>
                </div>
                
                <div className="deluxe-location-info">
                  <span className="deluxe-info-icon">📞</span>
                  <p className="deluxe-location-phone">{location.phone}</p>
                </div>
                
                <div className="deluxe-location-info">
                  <span className="deluxe-info-icon">🕒</span>
                  <p className="deluxe-location-hours">{location.hours}</p>
                </div>
                
                <div className="deluxe-location-actions">
                  <button className="deluxe-direction-btn">
                    Get Directions
                    <span className="deluxe-btn-icon">🗺️</span>
                  </button>
                  <button className="deluxe-call-btn">
                    Call Now
                    <span className="deluxe-btn-icon">📱</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BurgerDeliveryLocations;