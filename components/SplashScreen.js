import React, { useEffect } from 'react';
import './SplashScreen.css';

const SplashScreen = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3000); // 3 second duration
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="flippin-splash">
      <div className="flippin-container">
        {/* Animated Burger */}
        <div className="flippin-burger">
          <div className="flippin-bun-top">
            <div className="face">
              <div className="eye left-eye"></div>
              <div className="eye right-eye"></div>
              <div className="smile"></div>
            </div>
          </div>
          <div className="flippin-patty"></div>
          <div className="flippin-bun-bottom"></div>
        </div>

        {/* Text Animation */}
        <div className="flippin-text">
          <div className="flippin-line1">THE</div>
          <div className="flippin-line2">FLIPPIN'</div>
          <div className="flippin-line3">BURGER</div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
