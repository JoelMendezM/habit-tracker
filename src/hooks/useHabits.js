import { useState } from 'react';
import { createDayKey, filterDaysByMonth } from '../utils/dateUtils';

export const useHabits = () => {
  const [habits, setHabits] = useState([
    { id: 1, name: 'Leer 30 min', days: {} },
    { id: 2, name: 'Ejercicio', days: {} },
    { id: 3, name: 'Meditar', days: {} }
  ]);

  const toggleDay = (habitId, year, month, day) => {
    setHabits(habits.map(habit => {
      if (habit.id === habitId) {
        const key = createDayKey(year, month, day);
        const newDays = { ...habit.days };
        newDays[key] = !newDays[key];
        return { ...habit, days: newDays };
      }
      return habit;
    }));
  };

  const addHabit = (name) => {
    if (name.trim()) {
      const newHabit = {
        id: Date.now(),
        name: name.trim(),
        days: {}
      };
      setHabits([...habits, newHabit]);
      return true;
    }
    return false;
  };

  const updateHabitName = (habitId, newName) => {
    if (newName.trim()) {
      setHabits(habits.map(habit => 
        habit.id === habitId ? { ...habit, name: newName.trim() } : habit
      ));
      return true;
    }
    return false;
  };

  const deleteHabit = (habitId) => {
    setHabits(habits.filter(habit => habit.id !== habitId));
  };

  const getMonthTotal = (habit, year, month) => {
    return filterDaysByMonth(habit.days, year, month).length;
  };

  return {
    habits,
    toggleDay,
    addHabit,
    updateHabitName,
    deleteHabit,
    getMonthTotal
  };
};