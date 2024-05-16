export interface Week {
  start: Date;
  end: Date;
  days: Day[];
}

export interface Day {
  key: number;
  name: string;
  date: Date;
}

export const weekDaysIndexes = [0, 1, 2, 3, 4, 5, 6];
const dayNameMap: Record<number, string> = {
  0: 'Mon',
  1: 'Tue',
  2: 'Wed',
  3: 'Thu',
  4: 'Fri',
  5: 'Sat',
  6: 'Sun'
};

export const getNextWeek = (week: Week) => {
  const dateInWeek = new Date(week.end);
  dateInWeek.setDate(dateInWeek.getDate() + 1);

  return generateWeekFromDate(dateInWeek);
};

export const getPreviousWeek = (week: Week) => {
  const dateInWeek = new Date(week.start);
  dateInWeek.setDate(dateInWeek.getDate() - 1);

  return generateWeekFromDate(dateInWeek);
};

export const getCurrentWeek = (): Week => {
  const today = new Date();
  return generateWeekFromDate(today);
};

const generateWeekFromDate = (date: Date) => {
  const weekStart = getWeekStart(date);

  return {
    start: weekStart,
    end: getWeekEnd(date),
    days: generateWeekDaysWeekStart(weekStart),
  };
};

const getWeekStart = (date: Date) => {
  const dayOfWeek = date.getDay();
  const firstDayOfWeek = new Date(date);
  const diff = (dayOfWeek + 6) % 7;

  firstDayOfWeek.setDate(date.getDate() - diff);
  firstDayOfWeek.setHours(0,0,0,0);

  return firstDayOfWeek;
};

const getWeekEnd = (date: Date) => {
  const dayOfWeek = date.getDay();
  const lastDayOfWeek = new Date(date);
  const diff = (7 - dayOfWeek) % 7;
  lastDayOfWeek.setDate(date.getDate() + diff);
  lastDayOfWeek.setHours(23,59,59,999);

  return lastDayOfWeek;
};

const generateWeekDaysWeekStart = (weekStart: Date): Day[] => [0, 1, 2, 3, 4, 5, 6].map(x => ({
  key: x,
  name: dayNameMap[x],
  date: createDateWithDayOffset(weekStart, x),
}));

const createDateWithDayOffset = (weekStart: Date, offset: number): Date => {
  const date = new Date(weekStart);
  date.setDate(date.getDate() + offset);
  date.setHours(0,0,0,0);

  return date;
};

export const areWeeksTheSame = (a: Week, b: Week) => {
  if (a.start.getTime() !== b.start.getTime()) return false;
  if (a.end.getTime() !== b.end.getTime()) return false;

  return true;
};