import { getCurrentAccount, isDev } from '../lib/account';
import { toLocalISOString } from '../lib/dateTime';
import { hiddenCode, openCode } from '../lib/shiftOrderStatus';
import { ODataResponse } from '../types/odata';
import { Job, ShiftOrder } from '../types/qed';

export interface NewShiftOrder {
  startTime: Date;
  endTime: Date;
  shiftPremium: number;
  unpaidBreak: number;
  requestedPositions: number;
  jobId: string;
  hidden: boolean;
}

const getDataQuery = (clientId: string | null, weekStartPoint: Date, weekEndPoint: Date): Record<string, string> => ({
  '$select': 'ava_shiftorderid,ava_starttime,ava_endtime,ava_status,ava_pendingproviders,ava_requestedpositions,ava_remainingpositionstofillin,ava_numberofassignmentshifts,ava_shiftpremium,ava_unpaidbreak',
  '$expand': 'ava_ava_shiftorder_ava_shifts_shiftorder($select=ava_shiftsid,ava_expectedstarttime,ava_expectedendtime,ava_statusshifts,ava_wagerate;$expand=ava_Providers($select=ava_providersid,ava_fullname)),ava_JobName($select=ava_jobid,ava_name,ava_defaultunpaidbreakdurationjob)',
  '$filter': `${clientId ? `_ava_client_value eq '${clientId}' and ` : ''}ava_starttime gt '${toLocalISOString(weekStartPoint)}' and ava_starttime lt '${toLocalISOString(weekEndPoint)}'`,
});

export const getData = async (weekStartPoint: Date, weekEndPoint: Date): Promise<ShiftOrder[]> => {
  const clientId = getCurrentAccount();
  if (!clientId && !isDev) {
    return [];
  }

  const query = getDataQuery(clientId, weekStartPoint, weekEndPoint);
  const queryString = Object.entries(query).map(([selector, value]) => `${selector}=${value}`).join('&');

  const response = await fetch(`/api/data/v9.2/ava_shiftorders?${queryString}`);
  const json: ODataResponse<ShiftOrder> = await response.json();

  return json.value;
};

export const getJobs = async (): Promise<Job[]> => {
  const clientId = getCurrentAccount();
  if (!clientId && !isDev) {
    return [];
  }

  const queryString = clientId ? `?$filter=_ava_company_value eq '${clientId}'` : '';
  const response = await fetch(`/api/data/v9.2/ava_jobs${queryString}`);

  const json: ODataResponse<Job> = await response.json();

  return json.value;
};

export const addShiftOrder = async (data: NewShiftOrder): Promise<Response> => {
  const clientId = getCurrentAccount();
  const body = {
    ava_startdate: dateFormatter.format(getDate(data.startTime)),
    ava_starttime: dateTimeFormatter.format(data.startTime),
    ava_endtime: dateTimeFormatter.format(data.endTime),
    ava_requestedpositions: data.requestedPositions,
    'ava_JobName@odata.bind': `/ava_jobs(${data.jobId})`,
    ava_status: data.hidden ? hiddenCode : openCode,
    ...(clientId && {
      'ava_Client@odata.bind': `/accounts(${clientId})`,
    }),
    ...(data.shiftPremium > 0 && {
      ava_shiftpremium: data.shiftPremium,
      
    }),
    ava_unpaidbreak: data.unpaidBreak
  };

  return fetch('/api/data/v9.2/ava_shiftorders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
};

const getDate = (time: Date) => {
  const date = new Date(time);

  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);

  return date;
};

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
});

const dateTimeFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
});