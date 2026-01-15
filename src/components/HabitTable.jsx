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
  return (
    <div>
      <div className="tracker-container">
        <table className="tracker">
          <thead>
            <tr>
              <th className="habit-column">HÁBITO</th>
              {days.map(day => (
                <th key={day}>{day}</th>
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