import React, { useState, useEffect } from 'react';
import textData from '../TextData/textData'
import './CreatePodcast.css';
import './LoadingIcon.css';
import './AnswerOutput.css';

function CreatePodcast() {
    const [topic, setTopic] = useState('');
    const [additionalInfo, setAdditionalInfo] = useState('');
    const [response, setResponse] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [episodeName, setEpisodeName] = useState('');
    const [selectedHost, setSelectedHost] = useState('');
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [fadeOut, setFadeOut] = useState(false);
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setFadeOut(true);
            
            setTimeout(() => {
                setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % textData.stoicQuotes.length);
                setFadeOut(false);
            }, 1500);
        }, 4000);
    
        return () => clearInterval(interval);
    }, []);
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        // In a React Component or a JS file
        console.log(process.env.REACT_APP_CLIENT_ID);

        const headers = {
            'client_secret': process.env.REACT_APP_CLIENT_SECRET,
            'client_id': process.env.REACT_APP_CLIENT_ID,
            'Content-Type': 'application/json'
        };
  
        const apiUrl = `https://the-lean-launchpad.us-e2.cloudhub.io/api/podcast/script?title=${encodeURIComponent(topic)}&episode-name=${encodeURIComponent(episodeName)}&host=${encodeURIComponent(selectedHost)}&language=${encodeURIComponent(selectedLanguage)}`;
  
        try {
          const res = await fetch(apiUrl, { method: 'GET', headers });
          const fetchedData = await res.json();
      
          if (fetchedData.Results && fetchedData.Results.length > 0) {
            const flattenedResults = fetchedData.Results.flat();
            setData(flattenedResults);
          } else {
            setResponse("No titles found.");
          }
        } catch (e) {
          console.error("Error fetching data:", e.message);
          setError(e.message);
        }
      
        setIsLoading(false);
      }

    return (
        <div>
        <form onSubmit={handleSubmit} className="form-container">
        <div className="input-group">
            <label>Topic *</label>
            <input
                id="topic"
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
            />
        </div>
        <div className="row-container">
            <div className="input-group half-width">
                <label>Episode Name *</label>
                <input
                    id="episode-name"
                    type="text"
                    value={episodeName}
                    onChange={(e) => setEpisodeName(e.target.value)}
                    required
                />
            </div>
            <div className="input-group half-width">
                <label>Host</label>
                <select 
                    value={selectedHost} 
                    onChange={(e) => setSelectedHost(e.target.value)}
                    required
                >
                    <option value="">Select a host...</option>
                    {textData.hosts.map((host, index) => (
                        <option key={index} value={host}>{host}</option>
                    ))}
                </select>
            </div>
        </div>
        <div className="row-container">
            <div className="input-group half-width">
                <label>Additional Info</label>
                <textarea
                    value={additionalInfo}
                    id="additional-info"
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                />
            </div>
            <div className="input-group half-width">
                <label>Select Language</label>
                <select 
                    value={selectedLanguage} 
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                >
                    <option value="">Select a language...</option>
                    {textData.languages.map((lang, index) => (
                        <option key={index} value={lang}>{lang}</option>
                    ))}
                </select>
            </div>
        </div>
        <button type="submit">Create Podcast</button>
    </form>
        {isLoading && (
            <div className="quote-section">
                <div className="quote-title">Loading Wisdom...</div>
                <div className={`quote-display ${fadeOut ? 'fadeOut' : ''}`}>{textData.stoicQuotes[currentQuoteIndex]}</div>
            </div>
        )}
    
        {data && Array.isArray(data) && data.map((section, index) => {
            const contentWithoutHostName = section.Content.replace(/\[[^\]]+\]/g, '').trim();

            return (
                <div key={index} className="answer-section">
                    <div className="quote-title">{section.Section}</div>
                    <div className="answer-display">{contentWithoutHostName}</div>
                </div>
            );
        })}
    
    
        {error && <div className="answer-container">{error}</div>}
        </div>
    );
}

export default CreatePodcast;
