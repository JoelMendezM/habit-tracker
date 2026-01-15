import React from 'react';
import '../styles/Header.css';

const Header = ({ year, month, onYearChange, monthName }) => {
  return (
    <div className="header">
      <h1>🎯 Habit Tracker</h1>
      <div className="year-selector">
        <button onClick={() => onYearChange(-1)}>
          ◀ Ant
        </button>
        <span className="current-year">{monthName} {year}</span>
        <button onClick={() => onYearChange(1)}>
          Sig ▶
        </button>
      </div>
    </div>
  );
};

export default Header;