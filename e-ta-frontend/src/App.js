// App.js
import React, { useState } from 'react';
import Login from './Login'; // Import your Login component
import './App.css';
import CollapsibleQAItem from './CollapsibleQAItem';
import { ReactComponent as ScholarIcon } from './scholar.svg';


function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [qaHistory, setQaHistory] = useState([]);
  const [showQaHistory, setShowQaHistory] = useState(false);

  const handleLoginSubmit = async (email, password) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      setIsLoggedIn(true);
      setEmail(email);
      setPassword(password);
    } catch (e) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      setIsLoggedIn(false);
      setEmail('');
      setPassword('');
      setAnswer('');
      setQaHistory([]);
      setShowQaHistory(false);
    } catch (e) {
      setError('Logout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitQuestion = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/process-question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question, email, password }),
        credentials: 'include',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error('Error processing question');
      }

      const { answer, snapshot, url } = data;

      setAnswer(data);
      console.log(answer);
      
      // Update state to include the new Q&A pair
      setQaHistory(prevHistory => [
        ...prevHistory,
        { question, answer, snapshot, url }
      ]);
    } catch (e) {
      setError('Failed to fetch answer. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <Login onLogin={handleLoginSubmit} loading={loading} />
      ) : (
        <>
          <div className="header">
            <h1>E-TA</h1>
            <button onClick={handleLogout} disabled={loading}>
              Logout
            </button>
          </div>
          <div className="question-form">
            <form onSubmit={handleSubmitQuestion}>
              <label htmlFor="question-input"></label>
              <ScholarIcon className="scholar-icon" />
              <input
                id="question-input"
                type="text"
                value={question}
                placeholder="Please ask me questions..."
                onChange={(e) => setQuestion(e.target.value)}
              />
              <button type="submit" disabled={loading || !question}>
                {loading ? 'Loading...' : 'Submit'}
              </button>
            </form>
          </div>

          {error && <div className="error-message">{error}</div>}

          {answer && !loading && (
            <div className="answer-section">
              <h2>Current Answer:</h2>
              <p>{answer.answer}</p>
              {answer.snapshot && <img src={answer.snapshot} alt="Snapshot related to the answer" />}
              {answer.url && <a href={answer.url} target="_blank" rel="noopener noreferrer">Watch relevant part in video</a>}
            </div>
          )}

          {qaHistory.length > 0 && ( // Only display if history is not empty
            <button 
              className="btn btn-link qa-history-toggle" 
              onClick={() => setShowQaHistory(!showQaHistory)}
            >
              {showQaHistory ? 'Hide' : 'Show'} Previous Q&A
            </button>
          )}

          {showQaHistory && qaHistory.map((item, index) => (
            <CollapsibleQAItem
              key={index}
              question={item.question}
              answer={item.answer}
              snapshot={item.snapshot}
              url={item.url}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default App;
