import React, { useState } from 'react';

function FeedbackForm({ onSuccess }) {
    const [feedback, setFeedback] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [feedbackSent, setFeedbackSent] = useState(false);

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return re.test(String(email).toLowerCase());
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email.');
            return;
        }
        setEmailError('');

        setIsLoading(true);

        const headers = new Headers();
        headers.append('client_id', process.env.REACT_APP_CLIENT_ID);
        headers.append('client_secret', process.env.REACT_APP_CLIENT_SECRET);
        headers.append('Content-Type', 'application/json');

        const body = JSON.stringify({
            "Feedback": feedback
        });

        const init = {
            method: 'POST',
            headers,
            body
        };

        try {
            const response = await fetch('https://the-lean-launchpad.us-e2.cloudhub.io/api/feedback', init);
            if (response.ok) {
                setFeedbackSent(true);
                onSuccess();
            } else {
                console.error('Failed to send feedback');
            }
        } catch (e) {
            console.error('Error:', e.message);
        }

        setIsLoading(false);
    };

    if (feedbackSent) {
        return <p>Thank you for your feedback!</p>;
    }

    return (
    <form onSubmit={handleSubmit}>
      <label>
        Email: 
        <input
          className="email-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
          placeholder="example@email.com"
        />
        {emailError && <span className="error-message">{emailError}</span>}
      </label>
      <label>
        Feedback:
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          required
        ></textarea>
      </label>
      <button type="button" onClick={onSuccess}>Cancel</button>
      <button type="submit" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Submit Feedback'}
      </button>
    </form>
    );
}

export default FeedbackForm;
