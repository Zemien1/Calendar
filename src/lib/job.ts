export interface Job {
  id: string;
  name: string;
  color: string;
  isActive: boolean;
  ava_defaultunpaidbreak: number;
}

export type JobOption = Job & {
  selected: boolean;
}

export const generateIsActive = (status: number) => status == 0;
export const generateColor = (id: string, name: string) => commonJobsColors[name] ?? `#${id.slice(0, 6)}`;

const commonJobsColors: Record<string, string> = {
  'CNA, CNA & CMA': '#001DFF',
  'CMA/CMT, CNA, CNA & CMA': '#00F5FF',
  'Caregiver, CNA, CNA & CMA': '#801DFF',
  'CNA & CMA': '#FFEB00',
  'CMA/CMT, CNA': '#B1C6FF',
  'CMA/CMT, CNA, QMAP': '#C27C7C',
  'CMA/CMT, CNA & CMA': '#960006',
  'CNA, CNA & CMA, STNA': '#FFC19A',
  'CMA/CMT, CNA, STNA': '#C3E7DE',
  'Caregiver': '#FFBBEB',
  'QMAP': '#BDABAB',
  'CNA': '#5B9BD5',
  'LPN': '#31F86A',
  'LPN, RN': '#FD11B9',
  'RN': '#FF6403',
};