export type ShiftOrderStatus = 'published' | 'hidden' | 'closed';

export const hiddenCode = 100000001;
export const openCode = 100000000;

export const statusMap: Record<number, ShiftOrderStatus> = {
  [openCode]: 'published',
  [hiddenCode]: 'hidden',
  100000002: 'closed',
};

export const colorMap: Record<ShiftOrderStatus, string> = {
  'published': '#0c3b5e',
  'hidden': '#00b7c3',
  'closed': '#575757',
};