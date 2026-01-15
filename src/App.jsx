import { useState, useEffect } from 'react';
import Header from './components/Header';
import MonthSelector from './components/MonthSelector';
import HabitTable from './components/HabitTable';
import MobileHabitView from './components/MobileHabitView';
import { useHabits } from './hooks/useHabits';
import { getDaysInMonth, getCurrentYear, getCurrentMonth, MONTHS } from './utils/dateUtils';
import './App.css';

function App() {
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());
  const [currentYear, setCurrentYear] = useState(getCurrentYear());
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);

  const {
    habits,
    toggleDay,
    addHabit,
    updateHabitName,
    deleteHabit,
    getMonthTotal
  } = useHabits();

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handleYearChange = (direction) => {
    setCurrentYear(currentYear + direction);
  };

  // Detectar cambios de tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="app">
      <Header 
        year={currentYear}
        month={currentMonth}
        monthName={MONTHS[currentMonth]}
        onYearChange={handleYearChange}
      />
      
      <MonthSelector 
        currentMonth={currentMonth}
        onMonthChange={setCurrentMonth}
      />

      {isMobile ? (
        <MobileHabitView
          habits={habits}
          days={days}
          year={currentYear}
          month={currentMonth}
          monthName={MONTHS[currentMonth]}
          onToggleDay={toggleDay}
          onUpdateHabit={updateHabitName}
          onDeleteHabit={deleteHabit}
          onAddHabit={addHabit}
          getMonthTotal={getMonthTotal}
        />
      ) : (
        <HabitTable
          habits={habits}
          days={days}
          year={currentYear}
          month={currentMonth}
          onToggleDay={toggleDay}
          onUpdateHabit={updateHabitName}
          onDeleteHabit={deleteHabit}
          onAddHabit={addHabit}
          getMonthTotal={getMonthTotal}
        />
      )}
    </div>
  );
}

export default App;