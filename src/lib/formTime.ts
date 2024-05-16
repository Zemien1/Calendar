import { FormDate, FormTime, timeRegexp } from './shiftOrderForm';

export const getDateStartTimeAsDate = (date: FormDate, time: FormTime) => getDateFromForm(date, time);
export const getDateEndTimeAsDate = (date: FormDate, time: FormTime, isOverNightShift: boolean) => {
  const newDate = getDateFromForm(date, time);
  newDate.setDate(newDate.getDate() + (isOverNightShift ? 1 : 0));

  return newDate;
};

const getDateFromForm = (date: FormDate, time: FormTime) => {
  const timeInCorrectFormat = getTimeInCorrectFormat(time);
  return new Date(`${date} ${timeInCorrectFormat}`);
};

const getTimeInCorrectFormat = (time: FormTime) => {
  const standardTime = time.replace('.', ':');
  if (standardTime.search(':') !== -1) {
    return standardTime;
  }

  const [hours, postfix] = standardTime.split(' ');
  return `${hours}:00 ${postfix}`;
};

const getMinutesFromFormTime = (time: FormTime): number => {
  if (!timeRegexp.test(time)) {
    throw new Error('Wrong time value');
  }

  const standardTime = time.replace('.', ':');
  const [hoursMinutes, postfix] = standardTime.split(' ');
  const [hourValue, minuteValue] = hoursMinutes.split(':');
  const hours = parseInt(hourValue, 10);
  const hoursWithSwappedZero = hours % 12;
  const minutes = parseInt(minuteValue ?? '0', 10);
  const shouldAdd12h = postfix.toLowerCase() !== 'am';
  const hours24h = hoursWithSwappedZero + (shouldAdd12h ? 12 : 0);

  return hours24h * 60 + minutes;
};

export const isShiftOverNight = (start: FormTime, end: FormTime) => getMinutesFromFormTime(end) <= getMinutesFromFormTime(start);
