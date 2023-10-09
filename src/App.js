import React from 'react';
import ScrollTopButton from './ScrollTopButton/ScrollTopButton';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import FeedbackButton from './FeedbackModal/FeedbackButton';
import CreatePodcast from './CreatePodcast/CreatePodcast';
import Description from './Description/Description';
import './App.css';

function App() {
    return (
      <div>
         <Header />
         <Description />
         <FeedbackButton />
         <ScrollTopButton />
        <div className="app-container">
          <CreatePodcast />
        </div>
        <Footer />
      </div>
    );
  
}

export default App;