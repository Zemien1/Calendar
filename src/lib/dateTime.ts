export type DateTime = string;

export const parseDateTime = (dateTime: DateTime) => new Date(dateTime.slice(0, -1));

export const toLocalISOString = (date: Date) =>
  date.getFullYear() +
  '-' + pad(date.getMonth() + 1) +
  '-' + pad(date.getDate()) +
  'T' + pad(date.getHours()) +
  ':' + pad(date.getMinutes()) +
  ':' + pad(date.getSeconds());

const pad = (num: number) => (num < 10 ? '0' : '') + num;