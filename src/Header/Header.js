import React from 'react';
import logoImage from '../Images/the_lean_launchpad_2.jpg';
import FeedbackButton from '../FeedbackModal/FeedbackButton';
import './Header.css';

function Header() {
    return (
        <div className="header">
            <img src={logoImage} alt="Your Logo's Alt Text" />
            <a href="https://www.theleanlaunchpad.co/episodes/" className="podcasts-link">Our Podcasts</a>
            <FeedbackButton />
        </div>
    );
}

export default Header;