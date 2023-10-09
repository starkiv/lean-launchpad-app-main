import React, { useState } from 'react';
import './FeedbackButton.css';
import FeedbackForm from'./FeedbackForm/FeedbackForm'

function FeedbackButton() {
    const [showFeedbackPopup, setShowFeedbackPopup] = useState(false);

    const handleCloseFeedback = () => {
        setShowFeedbackPopup(false);
    };

    return (
        <div>
            <button className="feedback-trigger-button" onClick={() => setShowFeedbackPopup(true)}>
                Feedback
            </button>

            {showFeedbackPopup && (
                <div className="feedback-overlay">
                    <div className="feedback-popup">
                        <FeedbackForm onSuccess={handleCloseFeedback} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default FeedbackButton;

