import { DateTime } from '../lib/dateTime';

export interface ShiftOrder {
  ava_shiftorderid: string;
  ava_starttime: DateTime;
  ava_endtime: DateTime;
  ava_status: number;
  ava_numberofassignmentshifts: number | null;
  ava_pendingproviders: number | null;
  ava_requestedpositions: number;
  ava_remainingpositionstofillin: number | null;
  ava_shiftpremium: number | null;
  ava_ava_shiftorder_ava_shifts_shiftorder: Shift[];
  ava_JobName: Job | null;
  ava_unpaidbreak: number | null;
}

interface Shift {
  ava_shiftsid: string;
  ava_expectedstarttime: DateTime | null;
  ava_expectedendtime: DateTime | null;
  ava_statusshifts: number | null;
  ava_wagerate: number | null;
  ava_Providers: Provider | null;
}

interface Provider {
  ava_providersid: string;
  ava_fullname: string;
}

export interface Job {
  id: string;
  selected: any;
  ava_jobid: string;
  ava_name: string;
  statecode: number;
  ava_defaultunpaidbreakdurationjob: number;
}
