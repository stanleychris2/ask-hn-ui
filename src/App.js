import React, { useState } from "react";
import "./AskHN.css";

function AskHN() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(process.env.REACT_APP_API_URL , {
        method: "POST",
        body: JSON.stringify({ question }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      setAnswer(data.content);
      setQuestion("");
    } catch (error) {
      console.error(error);
      setAnswer("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event) => {
    setQuestion(event.target.value);
  };

  return (
    <div className="ask-hn-container">
      <div className="header-container">
        <h3>AskHN: The Collective GPT embodied wisdom of Hacker News</h3>
      </div>
      <div className="content-container">
        
        <form onSubmit={handleSubmit}>
          <label htmlFor="question">Ask a question:</label>
          <textarea
            id="question"
            name="question"
            rows="3"
            value={question}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={isLoading} className="ask-button">
            {isLoading ? "Asking..." : "Ask"}
          </button>
        </form>
        <h4>Answer:</h4>
        <div className="answer-container">
          
          <p>{answer}</p>
        </div>
      </div>
      <div className="banner-container">
        <a href="https://www.patterns.app/blog/2023/03/28/response-webhooks" target="_blank" rel="noopener noreferrer" className="powered-by">
        A project to demonstrate webhooks and responses, powered by Patterns. 
        </a>
      </div>
    </div>
  );
}

export default AskHN;
