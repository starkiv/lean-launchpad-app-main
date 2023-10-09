import React, { useState, useEffect } from 'react';
import './ScrollTopButton.css';

function ScrollTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset > 200) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <button 
            id="scrollTopBtn" 
            className={`scroll-top-btn ${isVisible ? 'visible' : ''}`}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
            ↑
        </button>
    );
}

export default ScrollTopButton;
