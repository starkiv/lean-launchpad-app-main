import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <div className="footer-container">
            <p>&copy; {new Date().getFullYear()} The Lean Launchpad</p>
            <div className="social-icons">
                {/* <a href="https://www.facebook.com/theleanlaunchpadofficial/" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://twitter.com/TLLpodcasts" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-twitter"></i>
                </a>
                <a href="https://www.instagram.com/theleanlaunchpadexperience/" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram"></i>
                </a>
                <a href="https://www.linkedin.com/company/theleanlaunchpad" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin-in"></i>
                </a> */}
            </div>
        </div>
    );
}

export default Footer;