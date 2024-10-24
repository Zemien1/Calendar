import { Button, GriffelStyle, Text, makeStyles, mergeClasses, shorthands } from '@fluentui/react-components';
import { getShiftName } from '../lib/shiftName';
import { ShiftOrder } from './Calendar';
import { ShiftOrderStatus, colorMap } from '../lib/shiftOrderStatus';

export const ShiftOrderTile = (props: { shiftOrder: ShiftOrder; isCondensed: boolean; }) => {
  const styles = useStyles();

  return (
    <Button
      as="a"
      href={`/main.aspx?pagetype=entityrecord&etn=ava_shiftorder&id=${props.shiftOrder.id}`}
      target='_parent'
      className={mergeClasses(styles.button, styles[props.shiftOrder.status])}
    >
      <div className={mergeClasses(styles.row, styles.showOnSmallScreen)}>
        <Text
          className={styles.shiftName}
          size={200}
          weight="bold"
        >
          {getShiftName(props.shiftOrder.start, props.shiftOrder.end)}
        </Text>
        {props.isCondensed && (
          <>
            <div style={{ backgroundColor: props.shiftOrder.job?.color ?? 'white' }} className={styles.circleIcon} />
          </>
        )}
      </div>
      <div className={styles.row}>
      {(props.shiftOrder.requestedPositions > 0 || props.shiftOrder.remainingPositions > 0) && (
    <Text
      className={styles.availablePositions}
      size={100}
      weight="bold"
    >
      {props.shiftOrder.requestedPositions}/{props.shiftOrder.remainingPositions}
    </Text>
  )}
        <Text
          className={mergeClasses(styles.shiftName, styles.showOnBigScreen)}
          size={200}
          weight="bold"
        >
          {getShiftName(props.shiftOrder.start, props.shiftOrder.end)}
        </Text>
        <Text className={styles.bonusText} size={200}>
          {props.shiftOrder.premium && `+$${props.shiftOrder.premium}/h`}
        </Text>
        {props.isCondensed && (
          <>
            {props.shiftOrder.createdby?.domainname.includes('EXT') && (
              <Text className={styles.cpText} weight="bold">CP</Text>
            )}
            <div
              style={{ backgroundColor: props.shiftOrder.job?.color ?? 'white' }}
              className={mergeClasses(styles.circleIcon, styles.showOnBigScreen)}
            />
          </>
        )}
      </div>
      {!props.isCondensed && (
        <div className={styles.jobDescription}>
          {props.shiftOrder.createdby?.domainname.includes('EXT') && (
            <Text className={styles.cpText} weight="bold">CP</Text>
          )}
          <div
            style={{ backgroundColor: props.shiftOrder.job?.color ?? 'white' }}
            className={mergeClasses(styles.circleIcon, styles.iconNotCondensedPositioning)}
          />
          <Text size={200}>{props.shiftOrder.job?.name}</Text>
        </div>
      )}
    </Button>
  );
};

export const stylesByStatus = Object.fromEntries(
  Object.entries(colorMap).map(([status, color]) => [
    status as ShiftOrderStatus, {
      backgroundColor: color,
      color: 'white',
      ':hover': {
        backgroundColor: color,
        color: 'white',
      },
      ':focus': {
        outlineColor: color,
        color: 'white',
      },
    }]
  )) as Record<ShiftOrderStatus, GriffelStyle>;

const useStyles = makeStyles({
  button: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    ...shorthands.padding('5px'),
    ...shorthands.margin('2px', 0),
    ...shorthands.gap('5px'),
    ...shorthands.borderRadius('6px'),
    textDecorationLine: 'none',
  },
  row: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('5px'),
  },
  shiftName: {
    width: '100%',
    flexGrow: '2',
  },
  showOnSmallScreen: {
    '@media(max-width: 1700px)': {
      display: 'flex',
    },
    '@media(min-width: 1700px)': {
      display: 'none'
    }
  },
  showOnBigScreen: {
    '@media(max-width: 1700px)': {
      display: 'none',
    },
    '@media(min-width: 1700px)': {
      display: 'flex'
    }
  },
  availablePositions: {
    backgroundColor: 'white',
    color: '#08083f',
    ...shorthands.borderRadius('2px'),
    ...shorthands.padding(0, '4px'),
  },
  bonusText: {
    flexGrow: '1',
    textAlign: 'right',
    color: '#dbdbe3',
  },
  circleIcon: {
    minHeight: '12px',
    maxHeight: '12px',
    minWidth: '12px',
    maxWidth: '12px',
    ...shorthands.border('1px', 'solid', 'white'),
    ...shorthands.borderRadius('50%'),
  },
  iconNotCondensedPositioning: {
    ...shorthands.margin('2px', '1px')
  },
  jobDescription: {
    width: '100%',
    display: 'flex',
    ...shorthands.gap('3px'),
  },
  cpText: {
    marginRight: '5px',
    color: 'white',
  },
  ...stylesByStatus
});
