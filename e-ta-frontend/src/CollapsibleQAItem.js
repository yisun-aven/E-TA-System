import React, { useState } from 'react';

const CollapsibleQAItem = ({ question, answer, snapshot, url }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleOpen = () => setIsOpen(!isOpen);
  
    return (
      <div className="collapsible-qa-item">
        <button className="btn btn-primary" onClick={toggleOpen}>
          {question}
        </button>
        {isOpen && (
          <div className="answer">
            <p>{answer}</p>
            {snapshot && (
              <img src={snapshot} alt="Snapshot related to the answer" />
            )}
            {url && (
              <a href={url} target="_blank" rel="noopener noreferrer">
                Watch relevant part in video
              </a>
            )}
          </div>
        )}
      </div>
    );
  };
  

export default CollapsibleQAItem;
