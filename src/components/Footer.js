import React from 'react';
import './Footer.css';

const Footer = () => {
  // Create link element for Font Awesome
  React.useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Contact Us</h3>
          <ul className="contact-info">
            <li>
              <i className="fas fa-map-marker-alt"></i>
              <span>123 Main Street, City, Country</span>
            </li>
            <li>
              <i className="fas fa-phone"></i>
              <span>+1 (123) 456-7890</span>
            </li>
            <li>
              <i className="fas fa-envelope"></i>
              <span>info@example.com</span>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Business Hours</h3>
          <ul className="business-hours">
            <li><span>Monday - Friday:</span> 9:00 AM - 6:00 PM</li>
            <li><span>Saturday:</span> 10:00 AM - 4:00 PM</li>
            <li><span>Sunday:</span> Closed</li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Your Company Name. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;