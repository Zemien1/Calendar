import { Text, makeStyles, shorthands } from '@fluentui/react-components';
import { Day } from '../lib/week';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    color: '#000036',
    ...shorthands.gap('5px')
  }
});

export const DayTitle = (props: { day: Day; }) => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Text size={400} weight="semibold">{props.day.name}</Text>
      <Text size={400} weight="bold">{props.day.date.getDate()}</Text>
    </div>
  );
};