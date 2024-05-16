// filtering out null values doesn't provide type safety
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { makeStyles, shorthands } from '@fluentui/react-components';
import { Calendar, Shift, ShiftOrder } from './Calendar';
import { ControlBar } from './ControlBar';
import { Week, getCurrentWeek } from '../lib/week';
import { useEffect, useState } from 'react';
import { getData, getJobs } from '../api/dataApi';
import { parseDateTime } from '../lib/dateTime';
import { hiddenStatuses, statusMap as shiftStatusMap } from '../lib/shiftStatus';
import { JobOption, generateColor, generateIsActive } from '../lib/job';
import { Loader } from './Loader';
import { ScrollableContainer } from './ScrollableContainer';
import { statusMap as shiftOrderStatusMap } from '../lib/shiftOrderStatus';
import { UnpaidBreak } from './NewShiftOrderDialog/UnpaidBreak';

export const CalendarControl = () => {
  const styles = useStyles();
  const [week, setWeek] = useState<Week>(getCurrentWeek());
  const [refreshDataState, setRefreshDataState] = useState<boolean>(false);
  const [shiftOrders, setShiftOrders] = useState<ShiftOrder[]>([]);
  const [jobs, setJobs] = useState<JobOption[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isViewCondensed, setIsViewCondensed] = useState<boolean>(true);

  useEffect(() => {
    void (async () => {
      setLoading(true);
      const data = await getData(week.start, week.end);
      const jobs = await getJobs();

      const jobsOptions: JobOption[] = jobs.map(x => ({
        id: x.ava_jobid,
        name: x.ava_name,
        color: generateColor(x.ava_jobid, x.ava_name),
        selected: false,
        isActive: generateIsActive(x.statecode),
        ava_defaultunpaidbreak: x.ava_defaultunpaidbreakdurationjob
      }));

      const shiftOrders: ShiftOrder[] = data.map(shiftOrder => {
        const job = shiftOrder.ava_JobName && {
          id: shiftOrder.ava_JobName.ava_jobid,
          name: shiftOrder.ava_JobName.ava_name,
          color: generateColor(shiftOrder.ava_JobName.ava_jobid, shiftOrder.ava_JobName.ava_name),
          isActive: generateIsActive(shiftOrder.ava_JobName.statecode),
          ava_defaultunpaidbreak: shiftOrder.ava_JobName.ava_defaultunpaidbreakdurationjob
        };

        const shiftOrderShifts: Shift[] = shiftOrder.ava_ava_shiftorder_ava_shifts_shiftorder
          .filter(x => x.ava_statusshifts !== null && x.ava_expectedstarttime !== null && x.ava_expectedendtime !== null && x.ava_wagerate !== null)
          .filter(x => !hiddenStatuses.includes(x.ava_statusshifts!))
          .map(x => ({
            id: x.ava_shiftsid,
            start: parseDateTime(x.ava_expectedstarttime!),
            end: parseDateTime(x.ava_expectedendtime!),
            status: shiftStatusMap[x.ava_statusshifts!],
            nurse: x.ava_Providers?.ava_fullname ?? 'No assignment',
            cost: x.ava_wagerate!,
            job: job
          }));

        return {
          id: shiftOrder.ava_shiftorderid,
          start: parseDateTime(shiftOrder.ava_starttime),
          end: parseDateTime(shiftOrder.ava_endtime),
          status: shiftOrderStatusMap[shiftOrder.ava_status],
          remainingPositions: shiftOrder.ava_remainingpositionstofillin ?? shiftOrder.ava_requestedpositions,
          numberOfAssignments: shiftOrder.ava_numberofassignmentshifts ?? 0,
          requestedPositions: shiftOrder.ava_pendingproviders ?? 0,
          premium: shiftOrder.ava_shiftpremium,
          break: shiftOrder.ava_unpaidbreak,
          job: job,
          shifts: shiftOrderShifts
        };
      });

      setShiftOrders(shiftOrders);
      setJobs(jobsOptions);
      setLoading(false);
    })();
  }, [week, refreshDataState]);

  const selectedJobs = jobs.filter(x => x.selected).map(x => x.id);
  const isFilterActive = selectedJobs.length >= 1;
  const filteredShiftOrders = isFilterActive ? shiftOrders.filter(x => isShiftOrderInFilters(x, selectedJobs)) : shiftOrders;

  return (
    <div className={styles.container}>
      <ControlBar
        week={week}
        onWeekChanged={week => {
          setLoading(true);
          setWeek(week);
        }}
        jobs={jobs}
        onJobsChange={setJobs}
        isCondensedView={isViewCondensed}
        onIsCondensedViewChange={setIsViewCondensed}
      />
      {loading ? (
        <Loader />
      ) : (
        <ScrollableContainer height="calc(100vh - 130px)">
          <Calendar
            shiftOrders={filteredShiftOrders}
            shifts={filteredShiftOrders.flatMap(x => x.shifts)}
            week={week}
            isViewCondensed={isViewCondensed}
            jobs={jobs}
            refreshData={() => setRefreshDataState(x => !x)}
          />
        </ScrollableContainer>
      )}
    </div>
  );
};

const useStyles = makeStyles({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.padding('0', '10px', '5px')
  }
});

const isShiftOrderInFilters = (shiftOrder: ShiftOrder, selectedJobs: string[]) => {
  return selectedJobs.includes(shiftOrder.job?.id ?? '');
};