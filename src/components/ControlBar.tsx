import { Divider, makeStyles, shorthands } from '@fluentui/react-components';
import { Week } from '../lib/week';
import { WeekControl } from './WeekControl';
import { JobsFilterControl } from './JobsFilterControl';
import { CondensedViewControl } from './CondensedViewControl';
import { JobOption } from '../lib/job';
import { Dispatch, SetStateAction } from 'react';
import { LegendBar } from './LegendBar';

export const ControlBar = (props: {
  week: Week;
  onWeekChanged: (week: Week) => void;
  jobs: JobOption[];
  onJobsChange: Dispatch<SetStateAction<JobOption[]>>;
  isCondensedView: boolean;
  onIsCondensedViewChange: Dispatch<SetStateAction<boolean>>;
}) => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <div className={styles.controls}>
        <WeekControl week={props.week} onWeekChanged={props.onWeekChanged} />
        <JobsFilterControl
          jobs={props.jobs}
          onJobsChange={props.onJobsChange}
        />
        <Divider className={styles.divider} vertical={true} />
        <CondensedViewControl
          isCondensedView={props.isCondensedView}
          onIsCondensedViewChange={props.onIsCondensedViewChange}
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
  },
  divider: shorthands.margin('0', '2%')
});