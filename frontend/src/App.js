// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import QuoteCard from './components/QuoteCard';

export default function App() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch a random anime quote
  const fetchQuote = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/quotes'); 
      if (!res.ok) throw new Error('Failed to fetch quote');
      const data = await res.json();
      console.log("Fetched quote:", data); // Debugging line

      // Set the quote directly since backend already returns correct structure
      setQuote(data);
    } catch (err) {
      console.error("Error fetching quote:", err);
      setQuote({ 
        quote: 'Failed to fetch quote 😢', 
        character: '', 
        anime: '' 
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="app">
      <h1>🎌 Anime Quotes Dashboard</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        quote && <QuoteCard quote={quote.quote} character={quote.character} anime={quote.anime} />
      )}
      <button onClick={fetchQuote}>Get Another Quote</button>
    </div>
  );
}
