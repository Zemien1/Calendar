import { Button, Divider, makeStyles, shorthands } from '@fluentui/react-components';
import { ArrowSync24Regular } from '@fluentui/react-icons';
import { Week } from '../lib/week';
import { WeekControl } from './WeekControl';
import { JobsFilterControl } from './JobsFilterControl';
import { ShiftStatusFilterControl } from './ShiftStatusFilterControl';
import { CondensedViewControl } from './CondensedViewControl';
import { JobOption } from '../lib/job';
import { Dispatch, SetStateAction } from 'react';
import { LegendBar } from './LegendBar';
import { StatusOption } from '../lib/shiftStatus';
import { ResetControlButton } from './ResetControlButton';

export const ControlBar = (props: {
  week: Week;
  onWeekChanged: (week: Week) => void;
  jobs: JobOption[];
  onJobsChange: Dispatch<SetStateAction<JobOption[]>>;
  shiftStatuses: StatusOption[];
  onShiftStatusesChange: Dispatch<SetStateAction<StatusOption[]>>;
  isCondensedView: boolean;
  onIsCondensedViewChange: Dispatch<SetStateAction<boolean>>;
  onRefreshData: () => void;
}) => {
  const styles = useStyles();
  const selectedJobOptions = props.jobs.filter(x => x.selected).map(x => x.id);
  const selectedStatusOptions = props.shiftStatuses.filter(x => x.selected).map(x => x.id);

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <WeekControl week={props.week} onWeekChanged={props.onWeekChanged} />
        <JobsFilterControl
          jobs={props.jobs}
          onJobsChange={props.onJobsChange}
        />
        <ShiftStatusFilterControl
          statuses={props.shiftStatuses}
          onStatusChange={props.onShiftStatusesChange}
        />
        <ResetControlButton
          disabled={selectedJobOptions.length === 0 && selectedStatusOptions.length === 0}
          onClick={() => {
            props.onJobsChange(jobs => createNewJobsWithSelectedFn(jobs, () => false));
            props.onShiftStatusesChange(statuses => createNewStatusesWithSelectedFn(statuses, () => false));
          }}
        >
          Reset Filter
        </ResetControlButton>
        <Divider className={styles.divider} vertical={true} />
        <CondensedViewControl
          isCondensedView={props.isCondensedView}
          onIsCondensedViewChange={props.onIsCondensedViewChange}
        />
        <Button
          appearance="primary"
          className={styles.refreshButton}
          onClick={props.onRefreshData}
          icon={<ArrowSync24Regular />}
        />
      </div>
      <LegendBar jobs={props.jobs} />
    </div>
  );
};

const useStyles = makeStyles({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '10px',
  },
  controls: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('10px')
  },
  divider: shorthands.margin('0', '1%'),
  resetButton: {
    marginLeft: '7px',
  },
  refreshButton: {
    marginLeft: '7px',
  }
});

const createNewJobsWithSelectedFn = (
  jobs: JobOption[],
  selectedFn: (job: JobOption) => boolean
): JobOption[] => jobs.map(x => ({
  id: x.id,
  name: x.name,
  color: x.color,
  selected: selectedFn(x),
  isActive: x.isActive,
  ava_defaultunpaidbreak: x.ava_defaultunpaidbreak,
}));

const createNewStatusesWithSelectedFn = (
  statuses: StatusOption[],
  selectedFn: (status: StatusOption) => boolean
): StatusOption[] => statuses.map(x => ({
  id: x.id,
  name: x.name,
  color: x.color,
  selected: selectedFn(x),
}));
