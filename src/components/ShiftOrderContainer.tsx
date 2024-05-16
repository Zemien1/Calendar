import { Text, makeStyles, shorthands } from '@fluentui/react-components';
import { ShiftOrder } from './Calendar';
import { ShiftOrderTile } from './ShiftOrderTile';

export const ShiftOrderContainer = (props: {
  shiftOrders: ShiftOrder[];
  isViewCondensed: boolean;
}) => {
  const styles = useStyles();
  const allAssignments = props.shiftOrders.reduce((acc, current) => acc + current.numberOfAssignments, 0);
  const shiftOrdersToDisplay = props.shiftOrders.filter(x => x.remainingPositions >= 1);

  return (
    <div className={styles.container}>
      <div className={styles.shiftOrderContainer}>
        {shiftOrdersToDisplay.map(x => (
          <ShiftOrderTile
            key={x.id}
            shiftOrder={x}
            isCondensed={props.isViewCondensed}
          />
        ))}
      </div>
      {allAssignments >= 1 && (
        <div className={styles.assignedContainer}>
          <Text size={200} weight="semibold">Assigned:</Text>
          <Text size={200} weight="bold">{allAssignments}</Text>
        </div>
      )}
    </div>
  );
};

const useStyles = makeStyles({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: '15px',
    ...shorthands.gap('1px')
  },
  shiftOrderContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  assignedContainer: {
    position: 'absolute',
    bottom: '2px',
    display: 'flex',
    color: '#000036',
    ...shorthands.gap('4px')
  }
});