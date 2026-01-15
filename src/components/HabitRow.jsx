import React, { useState } from 'react';
import '../styles/HabitRow.css';

const HabitRow = ({ 
  habit, 
  days, 
  year, 
  month, 
  onToggleDay, 
  onUpdate, 
  onDelete,
  monthTotal,
  currentDay
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(habit.name);

  const handleSave = () => {
    if (onUpdate(habit.id, editName)) {
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    if (confirm('¿Eliminar este hábito?')) {
      onDelete(habit.id);
    }
  };

  return (
    <tr>
      <td className="habit-name">
        {isEditing ? (
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            onBlur={handleSave}
            autoFocus
            className="edit-input"
          />
        ) : (
          <span onDoubleClick={() => setIsEditing(true)}>
            {habit.name}
          </span>
        )}
      </td>
      {days.map(day => {
        const key = `${year}-${month}-${day}`;
        const isCompleted = habit.days[key];
        return (
          <td 
  key={day}
  className={`day-cell ${isCompleted ? 'completed' : ''} ${day === currentDay ? 'today-cell' : ''}`}
  onClick={() => onToggleDay(habit.id, year, month, day)}
>
            {isCompleted ? '✓' : ''}
          </td>
        );
      })}
      <td className="total-cell">{monthTotal}</td>
      <td className="actions-cell">
        <div>
          <button className="edit-btn" onClick={() => setIsEditing(true)}>✏️</button>
          <button className="delete-btn" onClick={handleDelete}>🗑️</button>
        </div>
      </td>
    </tr>
  );
};

export default HabitRow;