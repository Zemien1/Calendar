import { GriffelStyle, Text, makeStyles, mergeClasses, shorthands } from '@fluentui/react-components';
import { CircleFilled } from '@fluentui/react-icons';
import { ShiftStatus, colorMap } from '../lib/shiftStatus';
import { Shift } from './Calendar';

export const ShiftTile = (props: { shift: Shift; isCondensed: boolean; }) => {
  const styles = useStyles();

  return (
    <a
      href={`/main.aspx?pagetype=entityrecord&etn=ava_shifts&id=${props.shift.id}`}
      target='_parent'
      className={mergeClasses(styles.button, styles[props.shift.status])}
    >
      <Text
        className={styles.titleText}
        size={200}
        weight="bold"
      >
        {props.shift.nurse}
      </Text>
      <Text size={200} weight="medium">${props.shift.cost}/hr</Text>
      {props.isCondensed ? (
        <CircleFilled
          primaryFill={props.shift.job?.color ?? 'white'}
          className={mergeClasses(styles.circleIcon, styles.iconCondensedPositioning)}
        />
      ) : (
        <div className={styles.jobDescription}>
          <CircleFilled
            primaryFill={props.shift.job?.color ?? 'white'}
            className={mergeClasses(styles.circleIcon, styles.iconNotCondensedPositioning)}
          />
          <Text size={200}>{props.shift.job?.name}</Text>
        </div>
      )}
    </a>
  );
};

export const stylesByStatus = Object.fromEntries(
  Object.entries(colorMap).map(([status, color]) => [
    status as ShiftStatus, {
      ...shorthands.border('1px', 'solid', color),
      ...shorthands.borderLeft('10px', 'solid', color),
    }]
  )) as Record<ShiftStatus, GriffelStyle>;

const useStyles = makeStyles({
  button: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    color: '#384848',
    cursor: 'pointer',
    textDecorationLine: 'none',
    ...shorthands.padding('4px', '18px', '4px', '6px'),
    ...shorthands.gap('4px'),
    ...shorthands.margin('2px', 0),
    ...shorthands.borderRadius('4px'),
  },
  titleText: {
    color: '#000036',
    ':hover': {
      color: '#000036',
    }
  },
  circleIcon: {
    minheight: '13px',
    minWidth: '13px',
  },
  iconCondensedPositioning: {
    position: 'absolute',
    top: '4px',
    right: '4px',
  },
  iconNotCondensedPositioning: {
    marginTop: '1px',
  },
  jobDescription: {
    width: '100%',
    display: 'flex',
    ...shorthands.gap('3px')
  },
  ...stylesByStatus,
});
