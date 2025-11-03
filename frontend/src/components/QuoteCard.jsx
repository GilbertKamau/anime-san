// frontend/src/components/QuoteCard.js
import React from 'react';

export default function QuoteCard({ quote, character, anime }) {
  return (
    <div className="quote-card">
      <p>"{quote}"</p>
      <h4>— {character}</h4>
      <p><em>{anime}</em></p>
    </div>
  );
}
