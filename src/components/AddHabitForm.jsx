import React, { useState } from 'react';

const AddHabitForm = ({ onAddHabit }) => {
  const [newHabitName, setNewHabitName] = useState('');

  const handleAdd = () => {
    if (onAddHabit(newHabitName)) {
      setNewHabitName('');
    }
  };

  return (
    <div className="add-habit-wrapper">
      <div className="add-habit-container">
        <input
          type="text"
          value={newHabitName}
          onChange={(e) => setNewHabitName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="➕ Nuevo hábito..."
          className="new-habit-input"
        />
        <button 
          className="add-habit-btn"
          onClick={handleAdd}
          disabled={!newHabitName.trim()}
        >
          ➕ Agregar
        </button>
      </div>
    </div>
  );
};

export default AddHabitForm;