import { useState, useEffect } from 'react';
import { 
  collection, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot 
} from 'firebase/firestore';
import { db } from '../firebase';
import { createDayKey, filterDaysByMonth } from '../utils/dateUtils';

export const useHabits = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar hábitos desde Firebase (en tiempo real)
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'habits'), (snapshot) => {
      const habitsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setHabits(habitsData);
      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  const toggleDay = async (habitId, year, month, day) => {
    const habit = habits.find(h => h.id === habitId);
    if (!habit) return;

    const key = createDayKey(year, month, day);
    const newDays = { ...habit.days };
    newDays[key] = !newDays[key];

    // Actualizar en Firebase
    const habitRef = doc(db, 'habits', habitId.toString());
    await updateDoc(habitRef, { days: newDays });
  };

  const addHabit = async (name) => {
    if (name.trim()) {
      const newHabit = {
        name: name.trim(),
        days: {}
      };
      
      // Crear nuevo documento en Firebase
      const newId = Date.now().toString();
      await setDoc(doc(db, 'habits', newId), newHabit);
      return true;
    }
    return false;
  };

  const updateHabitName = async (habitId, newName) => {
    if (newName.trim()) {
      const habitRef = doc(db, 'habits', habitId.toString());
      await updateDoc(habitRef, { name: newName.trim() });
      return true;
    }
    return false;
  };

  const deleteHabit = async (habitId) => {
    const habitRef = doc(db, 'habits', habitId.toString());
    await deleteDoc(habitRef);
  };

  const getMonthTotal = (habit, year, month) => {
    return filterDaysByMonth(habit.days, year, month).length;
  };

  return {
    habits,
    loading,
    toggleDay,
    addHabit,
    updateHabitName,
    deleteHabit,
    getMonthTotal
  };
};