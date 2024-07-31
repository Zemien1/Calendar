import { Dropdown, Option, Text, makeStyles, shorthands } from '@fluentui/react-components';
import { CircleFilled } from '@fluentui/react-icons';
import { StatusOption } from '../lib/shiftStatus';
import { Dispatch, SetStateAction } from 'react';

// Funkcja pomocnicza do przekształcania nazw statusów
const formatStatusLabel = (status: string) => {
  return status
    .toLowerCase()
    .replace(/_/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());
};

export const ShiftStatusFilterControl = (props: {
  statuses: StatusOption[];
  onStatusChange: Dispatch<SetStateAction<StatusOption[]>>;
}) => {
  const styles = useStyles();
  const selectedOptions = props.statuses.filter(x => x.selected).map(x => x.id.toString());
  const dropdownValue = selectedOptions.length === 0
    ? 'Filter by Status'
    : `${selectedOptions.length} Statuses Selected`;

  return (
    <div className={styles.container}>
      <Text
        className={styles.smallText}
        size={200}
        weight="semibold"
      >
        Statuses:
      </Text>
      <Dropdown
        multiselect={true}
        value={dropdownValue}
        selectedOptions={selectedOptions}
        onOptionSelect={(_, data) => {
          props.onStatusChange(statuses =>
            createNewStatusesWithSelectedFn(statuses, status => data.selectedOptions.includes(status.id.toString()))
          );
        }}
      >
        {props.statuses.map(x => (
          <Option
            text={x.name}
            key={x.id.toString()}
            value={x.id.toString()}
            checkIcon={{
              style: {
                minHeight: '16px',
                minWidth: '16px'
              }
            }}
          >
            <CircleFilled className={styles.circleIcon} color={x.color} />
            {formatStatusLabel(x.name)}
          </Option>
        ))}
      </Dropdown>
    </div>
  );
};

const useStyles = makeStyles({
  container: {
    paddingLeft: '15px',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    ...shorthands.gap('15px')
  },
  circleIcon: {
    minHeight: '11px',
    maxHeight: '11px',
    minWidth: '11px',
    maxWidth: '11px'
  },
  smallText: {
    color: '#899197',
  },
});

const createNewStatusesWithSelectedFn = (
  statuses: StatusOption[],
  selectedFn: (status: StatusOption) => boolean
): StatusOption[] => statuses.map(x => ({
  id: x.id,
  name: x.name,
  color: x.color,
  selected: selectedFn(x),
}));
