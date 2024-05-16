export const getShiftName = (start: Date, end: Date) => `${getTimeWithAppendix(start)} - ${getTimeWithAppendix(end)}`;

const getTimeWithAppendix = (date: Date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';

  return `${getDisplayHours(hours)}${getDisplayMinutes(minutes)} ${ampm}`;
};

const getDisplayHours = (hours: number) => {
  const hoursMax12 = hours % 12;
  const hoursWithZeroSwapped = hoursMax12 !== 0 ? hoursMax12 : 12;
  return hoursWithZeroSwapped;
};

const getDisplayMinutes = (minutes: number) => {
  if (minutes === 0) {
    return '';
  }

  if (minutes < 10) {
    return `:0${minutes}`;
  }

  return `:${minutes}`;
};