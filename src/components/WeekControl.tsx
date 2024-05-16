import { Button, makeStyles, mergeClasses, shorthands, Text } from '@fluentui/react-components';
import { IosArrowLtr24Filled, IosArrowRtl24Filled } from '@fluentui/react-icons';
import { Week, areWeeksTheSame, getCurrentWeek, getNextWeek, getPreviousWeek } from '../lib/week';
import { ResetControlButton } from './ResetControlButton';

export const WeekControl = (props: {
  week: Week;
  onWeekChanged: (week: Week) => void;
}) => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Button
        className={styles.button}
        icon={<IosArrowLtr24Filled className={mergeClasses(styles.buttonIcon, styles.buttonLeft)} />}
        onClick={() => props.onWeekChanged(getPreviousWeek(props.week))}
      />
      <Button
        className={styles.button}
        icon={<IosArrowRtl24Filled className={mergeClasses(styles.buttonIcon, styles.buttonRight)} />}
        onClick={() => props.onWeekChanged(getNextWeek(props.week))}
      />
      <Text
        className={styles.dateText}
        size={400}
        weight="bold"
      >
        {getWeekRangeString(props.week.start, props.week.end)}
      </Text>
      <ResetControlButton
        onClick={() => props.onWeekChanged(getCurrentWeek())}
        disabled={areWeeksTheSame(props.week, getCurrentWeek())}
      >
        Show Current Week
      </ResetControlButton>
    </div>
  );
};

const useStyles = makeStyles({
  container: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('15px'),
    ...shorthands.padding('5px')
  },
  button: {
    height: '30px',
    width: '30px',
    ...shorthands.borderColor('#00000066')
  },
  buttonIcon: {
    height: '15px',
    width: '15px',
    color: '#000031',
  },
  buttonLeft: shorthands.margin('0', '-5px', '0', '0'),
  buttonRight: shorthands.margin('0', '0', '0', '-5px'),
  dateText: {
    color: '#000036',
  }
});

const getWeekRangeString = (start: Date, end: Date) => {
  if (start.getFullYear() !== end.getFullYear()) {
    return `${yearMonthDayFormat.format(start)} - ${yearMonthDayFormat.format(end)}`;
  }

  if (start.getMonth() !== end.getMonth()) {
    return `${monthDayFormat.format(start)} - ${monthDayFormat.format(end)}, ${start.getFullYear()}`;
  }

  return `${monthDayFormat.format(start)} - ${end.getDate()}, ${start.getFullYear()}`;
};

const yearMonthDayFormat = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric'
});

const monthDayFormat = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric'
});