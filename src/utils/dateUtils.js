export const MONTHS = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 
                       'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];

export const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

export const getCurrentYear = () => new Date().getFullYear();
export const getCurrentMonth = () => new Date().getMonth();

export const createDayKey = (year, month, day) => `${year}-${month}-${day}`;

export const filterDaysByMonth = (days, year, month) => {
  const prefix = `${year}-${month}-`;
  return Object.keys(days).filter(key => key.startsWith(prefix) && days[key]);
};