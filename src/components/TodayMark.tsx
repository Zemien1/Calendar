import { Divider, Text, makeStyles, shorthands } from '@fluentui/react-components';

const isDateToday = (date: Date) => {
  const today = new Date();

  if (date.getDate() !== today.getDate()) return false;
  if (date.getMonth() !== today.getMonth()) return false;
  if (date.getFullYear() !== today.getFullYear()) return false;

  return true;
};

export const TodayMark = (props: { date: Date }) => {
  const styles = useStyles();

  return isDateToday(props.date) ? (
    <div className={styles.container}>
      <Divider className={styles.divider} appearance="strong" />
      <Text size={100} weight="bold">Today</Text>
      <Divider className={styles.divider} appearance="strong" />
    </div>
  ) : null;
};

const useStyles = makeStyles({
  container: {
    position: 'absolute',
    top: '-4px',
    left: '0',
    width: '100%',
    display: 'flex',
    color: '#ff343c',
  },
  divider: {
    ...shorthands.margin('0', '4px'),
    '::before': {
      ...shorthands.borderTop('2px', 'solid', '#ff343c')
    },
    '::after': {
      ...shorthands.borderTop('2px', 'solid', '#ff343c')
    }
  }
});
