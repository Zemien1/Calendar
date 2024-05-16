import { Shift } from '../components/Calendar';

const minutesInHour = 60;
const getDateSortValue = (date: Date) => date.getHours() * minutesInHour + date.getMinutes();

const maxMinutes = minutesInHour * 24;
const getShiftSortValue = (shift: Shift) => getDateSortValue(shift.start) * maxMinutes + getDateSortValue(shift.end);

export const sortShiftEntriesDesc = ([, [shiftA]]: [string, Shift[]], [, [shiftB]]: [string, Shift[]]) =>
  getShiftSortValue(shiftB) - getShiftSortValue(shiftA);

export const sortShiftEntriesAsc = ([, [shiftA]]: [string, Shift[]], [, [shiftB]]: [string, Shift[]]) =>
  getShiftSortValue(shiftA) - getShiftSortValue(shiftB);