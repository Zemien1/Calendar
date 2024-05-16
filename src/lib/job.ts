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
  'CMAide/CMTech, CNA': '#001DFF',
  'LPN': '#31F86A',
  'LPN, RN': '#FD11B9',
  'CMAide/CMTech': '#FFEB00',
  'CNA': '#00F5FF',
  'CMAide/CMTech, CNA, STNA': '#FFBBEB',
  'CMAide/CMTech, CNA (Travel)': '#FFC19A',
  'RN': '#FF6403',
  'CMAide/CMTech, CNA, QMAP': '#801DFF',
  'CNA (Travel)': '#B1C6FF',
  'CMAide/CMTech, QMAP': '#00952A',
  'CNA, QMAP': '#960006',
  'Administrative': '#ff0000',
  'Care Giver': '#5b9bd5',
  'NP': '#ffc000',
  'QMAP': '#38ecaf',
  'RNA': '#ed6ba0',
  'STNA': '#c65911',
  'TMA': '#ffff66',
  'Administrative, Care Giver, CMAide/CMTech, CNA, LPN, NP, QMAP, RN, RNA, STNA, TMA': '#939393',
  'Other': '#6AODAD',
  'CNA & CMA':'#3D2B1F',
};