import React, { useState } from 'react';
import '../styles/MobileHabitView.css';

const MobileHabitView = ({ 
  habits, 
  days, 
  year, 
  month, 
  monthName,
  onToggleDay,
  onUpdateHabit,
  onDeleteHabit,
  onAddHabit,
  getMonthTotal
}) => {
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  const [newHabitName, setNewHabitName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');

    // Detectar día actual
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const isToday = (day) => day === currentDay && month === currentMonth && year === currentYear;

  const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const dayOfWeek = new Date(year, month, selectedDay).getDay();

  const goToPrevDay = () => {
    if (selectedDay > 1) setSelectedDay(selectedDay - 1);
  };

  const goToNextDay = () => {
    if (selectedDay < days.length) setSelectedDay(selectedDay + 1);
  };

  const handleAddHabit = () => {
    if (onAddHabit(newHabitName)) {
      setNewHabitName('');
    }
  };

  const startEdit = (habit) => {
    setEditingId(habit.id);
    setEditName(habit.name);
  };

  const saveEdit = (habitId) => {
    if (onUpdateHabit(habitId, editName)) {
      setEditingId(null);
    }
  };

  const handleDelete = (habitId) => {
    if (confirm('¿Eliminar este hábito?')) {
      onDeleteHabit(habitId);
    }
  };

  const getTotalCompleted = () => {
    return habits.reduce((acc, habit) => acc + getMonthTotal(habit, year, month), 0);
  };

  const getTotalPossible = () => {
    return habits.length * days.length;
  };

  return (
    <div className="mobile-view">
      {/* Selector de día */}
      <div className="day-selector">
        <button onClick={goToPrevDay} disabled={selectedDay === 1}>◀</button>
        <div className="day-display">
          <span className="day-number">{selectedDay}</span>
          <span className="day-name">{daysOfWeek[dayOfWeek]}</span>
        </div>
        <button onClick={goToNextDay} disabled={selectedDay === days.length}>▶</button>
      </div>

      {/* Mini calendario - días del mes */}
      <div className="mini-calendar">
        {days.map(day => {
          const hasAnyCompleted = habits.some(h => h.days[`${year}-${month}-${day}`]);
          return (
            <button
  key={day}
  className={`mini-day ${selectedDay === day ? 'selected' : ''} ${hasAnyCompleted ? 'has-completed' : ''} ${isToday(day) ? 'today' : ''}`}
  onClick={() => setSelectedDay(day)}
>
              {day}
            </button>
          );
        })}
      </div>

      {/* Lista de hábitos */}
      <div className="habits-list">
        {habits.map(habit => {
          const key = `${year}-${month}-${selectedDay}`;
          const isCompleted = habit.days[key];
          const monthTotal = getMonthTotal(habit, year, month);

          return (
            <div 
              key={habit.id} 
              className={`habit-card ${isCompleted ? 'completed' : ''}`}
            >
              {editingId === habit.id ? (
                <div className="habit-edit">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && saveEdit(habit.id)}
                    onBlur={() => saveEdit(habit.id)}
                    autoFocus
                  />
                </div>
              ) : (
                <>
                  <div 
                    className="habit-check"
                    onClick={() => onToggleDay(habit.id, year, month, selectedDay)}
                  >
                    <span className="checkbox">{isCompleted ? '✓' : ''}</span>
                    <span className="habit-name">{habit.name}</span>
                  </div>
                  <div className="habit-meta">
                    <span className="habit-streak">{monthTotal}/{days.length}</span>
                    <button className="edit-btn" onClick={() => startEdit(habit)}>✏️</button>
                    <button className="delete-btn" onClick={() => handleDelete(habit.id)}>🗑️</button>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Progreso del mes */}
      <div className="month-progress">
        <div className="progress-label">
          Progreso {monthName}: {getTotalCompleted()}/{getTotalPossible()}
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${(getTotalCompleted() / getTotalPossible()) * 100}%` }}
          />
        </div>
      </div>

      {/* Agregar hábito */}
      <div className="add-habit-mobile">
        <input
          type="text"
          value={newHabitName}
          onChange={(e) => setNewHabitName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddHabit()}
          placeholder="➕ Nuevo hábito..."
        />
        <button onClick={handleAddHabit} disabled={!newHabitName.trim()}>
          Agregar
        </button>
      </div>
    </div>
  );
};

export default MobileHabitView;