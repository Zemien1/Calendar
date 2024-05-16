import { Text, makeStyles, mergeClasses, shorthands } from '@fluentui/react-components';
import { commonShifts, getShiftName, getTime } from '../../lib/commonShifts';
import { Label } from './Label';

export const QuickTimeSelection = (props: {
  className?: string;
  label: string;
  setStartTime: (startTime: string) => void;
  setEndTime: (endTime: string) => void;
}) => {
  const styles = useStyles();

  return (
    <div className={mergeClasses(styles.container, props.className)}>
      <Label>{props.label}</Label>
      <div className={styles.optionsContainer}>
        {commonShifts.map((x, i) => (
          <button
            key={i}
            className={styles.item}
            type="button"
            tabIndex={-1}
            onClick={() => {
              props.setStartTime(getTime(x.start));
              props.setEndTime(getTime(x.end));
            }}
          >
            <Text size={300}>{getShiftName(x)}</Text>
          </button>
        ))}
      </div>
    </div>
  );
};

const useStyles = makeStyles({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('10px')
  },
  optionsContainer: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    ...shorthands.gap('10px')
  },
  item: {
    backgroundColor: 'white',
    color: '#456f95',
    cursor: 'pointer',
    ...shorthands.border('1px', 'solid', '#00000044'),
    ...shorthands.borderRadius('16px'),
    ...shorthands.padding('2px', '8px'),
  }
});