import { makeStyles, shorthands } from '@fluentui/react-components';
import { Calendar, Shift, ShiftOrder } from './Calendar';
import { ControlBar } from './ControlBar';
import { Week, getCurrentWeek } from '../lib/week';
import { useEffect, useState } from 'react';
import { getData, getJobs } from '../api/dataApi';
import { parseDateTime } from '../lib/dateTime';
import { hiddenStatuses, statusMap as shiftStatusMap, colorMap, StatusOption, ShiftStatus } from '../lib/shiftStatus';
import { JobOption, generateColor, generateIsActive } from '../lib/job';
import { Loader } from './Loader';
import { ScrollableContainer } from './ScrollableContainer';
import { statusMap as shiftOrderStatusMap } from '../lib/shiftOrderStatus';
import { ShowFiledOrders } from './ShowFilledOrders';

export const CalendarControl = () => {
  const styles = useStyles();
  const [week, setWeek] = useState<Week>(getCurrentWeek());
  const [refreshDataState, setRefreshDataState] = useState<boolean>(false);
  const [shiftOrders, setShiftOrders] = useState<ShiftOrder[]>([]);
  const [jobs, setJobs] = useState<JobOption[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isViewCondensed, setIsViewCondensed] = useState<boolean>(true);
  const [shiftStatuses, setShiftStatuses] = useState<StatusOption[]>([]);
  const [showFilledOrders, setShowFilledOrders] = useState<boolean>(true);

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
            status: Number(x.ava_statusshifts!), // Ensure the status is a number
            nurse: x.ava_Providers?.ava_fullname ?? 'No assignment',
            cost: x.ava_wagerate!,
            job: job,
            sh_origin: x.sh_origin ?? false
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
          shifts: shiftOrderShifts,
          createdby: shiftOrder.createdby ? { domainname: shiftOrder.createdby.domainname } : { domainname: 'Unknown' },
          sh_origin: origin
        };
      });

      setShiftOrders(shiftOrders);
      setJobs(existingJobs => {
        return jobsOptions.map(job => {
          const existingJob = existingJobs.find(j => j.id === job.id);
          if (existingJob) {
            return { ...job, selected: existingJob.selected };
          }
          return job;
        });
      });
      setLoading(false);
    })();
  }, [week, refreshDataState]);

  useEffect(() => {
    // Initialize shift statuses
    const statuses: StatusOption[] = Object.entries(shiftStatusMap)
    .filter(([id]) => !hiddenStatuses.includes(Number(id)))
    .map(([id, name]) => ({
      id: Number(id),
      name: name as ShiftStatus,
      selected: name !== 'canceled', 
      color: colorMap[name as ShiftStatus],
      }));
    setShiftStatuses(statuses);
  }, []);

  const selectedJobs = jobs.filter(x => x.selected).map(x => x.id);
  const selectedStatuses = shiftStatuses.filter(x => x.selected).map(x => x.id);
  const isFilterActive = selectedJobs.length > 0 || selectedStatuses.length > 0;

  const filteredShiftOrders = isFilterActive
    ? shiftOrders
        .filter(shiftOrder => selectedJobs.length === 0 || selectedJobs.includes(shiftOrder.job?.id ?? ''))
        .map(shiftOrder => ({
          ...shiftOrder,
          shifts: shiftOrder.shifts.filter(shift => selectedStatuses.length === 0 || selectedStatuses.includes(shift.status)),
        }))
        .filter(shiftOrder => shiftOrder.shifts.length > 0 || shiftOrder.remainingPositions >= 1)
    : shiftOrders;




  const sortedShiftOrders = (orders: ShiftOrder[]) => orders.sort((a, b) => a.start.getTime() - b.start.getTime());

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
        shiftStatuses={shiftStatuses}
        onShiftStatusesChange={setShiftStatuses}
        isCondensedView={isViewCondensed}
        onIsCondensedViewChange={setIsViewCondensed}
        onRefreshData={() => setRefreshDataState(x => !x)}
        ShowFilledOrders={showFilledOrders}  
        onShowFilledOrdersChange={setShowFilledOrders}  />
      {loading ? (
        <Loader />
      ) : (
        <ScrollableContainer height="calc(100vh - 130px)">
          <Calendar
              shiftOrders={sortedShiftOrders(filteredShiftOrders)}
              shifts={filteredShiftOrders.flatMap(x => x.shifts)}
              week={week}
              isViewCondensed={isViewCondensed}
              jobs={jobs}
              refreshData={() => setRefreshDataState(x => !x)}
              selectedStatuses={selectedStatuses} // Dodane do przekazania statusów do kalendarza
              ShowFilledOrders={showFilledOrders}       
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
