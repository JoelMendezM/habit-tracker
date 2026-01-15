import React from 'react';
import { MONTHS } from '../utils/dateUtils';
import '../styles/MonthSelector.css';

const MonthSelector = ({ currentMonth, onMonthChange }) => {
  return (
    <div className="month-selector">
      {MONTHS.map((month, index) => (
        <button 
          key={month}
          className={currentMonth === index ? 'active' : ''}
          onClick={() => onMonthChange(index)}
        >
          {month}
        </button>
      ))}
    </div>
  );
};

export default MonthSelector;