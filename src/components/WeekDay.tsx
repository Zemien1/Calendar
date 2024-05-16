import { makeStyles, shorthands } from '@fluentui/react-components';
import { Day } from '../lib/week';
import { TodayMark } from './TodayMark';
import { DayTitle } from './DayTitle';
import { NewShiftOrderDialog } from './NewShiftOrderDialog/NewShiftOrderDialog';
import { Job } from '../lib/job';

export const WeekDay = (props: {
  jobs: Job[];
  day: Day;
  refreshData: () => void;
}) => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <TodayMark date={props.day.date} />
      <DayTitle day={props.day} />
      <NewShiftOrderDialog
        day={props.day}
        jobs={props.jobs}
        refreshData={props.refreshData}
      />
    </div>
  );
};

const useStyles = makeStyles({
  container: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...shorthands.padding('7px', 0, '6px')
  }
});