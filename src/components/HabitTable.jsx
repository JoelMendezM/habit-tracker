import React from 'react';
import HabitRow from './HabitRow';
import AddHabitForm from './AddHabitForm';
import '../styles/HabitTable.css';

const HabitTable = ({ 
  habits, 
  days, 
  year, 
  month, 
  onToggleDay,
  onUpdateHabit,
  onDeleteHabit,
  onAddHabit,
  getMonthTotal
}) => {
    // Detectar día actual
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const isCurrentMonth = month === currentMonth && year === currentYear;
  return (
    <div>
      <div className="tracker-container">
        <table className="tracker">
          <thead>
            <tr>
              <th className="habit-column">HÁBITO</th>
              {days.map(day => (
  <th 
    key={day}
    className={isCurrentMonth && day === currentDay ? 'today-header' : ''}
  >
    {day}
  </th>
))}
              <th className="total-column">TOT</th>
              <th className="actions-column">ACC</th>
            </tr>
          </thead>
          <tbody>
            {habits.map(habit => (
              <HabitRow
                key={habit.id}
                habit={habit}
                days={days}
                year={year}
                month={month}
                onToggleDay={onToggleDay}
                onUpdate={onUpdateHabit}
                onDelete={onDeleteHabit}
                monthTotal={getMonthTotal(habit, year, month)}
                currentDay={isCurrentMonth ? currentDay : null}
              />
            ))}
          </tbody>
        </table>
      </div>
      <AddHabitForm onAddHabit={onAddHabit} />
    </div>
  );
};

export default HabitTable;