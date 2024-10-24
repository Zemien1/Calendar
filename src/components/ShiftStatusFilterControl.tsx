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
  const allSelected = selectedOptions.length === props.statuses.length;
  const allExceptOneSelected = selectedOptions.length === props.statuses.length - 1;
  
  const dropdownValue = allSelected
  ? 'All Statuses Selected'
  : selectedOptions.length === 0
  ? 'Filter by Status'
  : selectedOptions.length === props.statuses.length - 1
    ? `is not ${formatStatusLabel(props.statuses.find(status => !selectedOptions.includes(status.id.toString()))?.name ?? '')}`
    : `${selectedOptions.length} Statuses Selected`;

  const handleOptionSelect = (selectedOptions: string[]) => {
    if (selectedOptions.includes('select_all')) {
      const newSelectionState = !allSelected;
      props.onStatusChange(statuses => createNewStatusesWithSelectedFn(statuses, () => newSelectionState));
    } else {
      props.onStatusChange(statuses =>
        createNewStatusesWithSelectedFn(statuses, status => selectedOptions.includes(status.id.toString()))
      );
    }
  };

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
        onOptionSelect={(_, data) => handleOptionSelect(data.selectedOptions)}
      >
        <Option
          text="Select all"
          key="select_all"
          value="select_all"
          checkIcon={{ 
            children: allSelected ? <div className={styles.checkedIcon}>✔</div> : <div className={styles.uncheckedIcon} /> 
          }}
        >
          <div className={styles.optionContent}>
            <CircleFilled className={styles.circleIcon} color="#000000" />
            Select all
          </div>
        </Option>
        <div className={styles.divider}></div> {/* Dodanie linii podziału */}
        {props.statuses.map(x => (
          <Option
            text={x.name}
            key={x.id.toString()}
            value={x.id.toString()}
            checkIcon={{ 
              children: selectedOptions.includes(x.id.toString()) ? <div className={styles.checkedIcon}>✔</div> : <div className={styles.uncheckedIcon} /> 
            }}
          >
            <div className={styles.optionContent}>
              <CircleFilled className={styles.circleIcon} color={x.color} />
              {formatStatusLabel(x.name)}
            </div>
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
    maxWidth: '11px',
    marginRight: '4px',
  },
  checkedIcon: {
    width: '16px',
    height: '16px',
    backgroundColor: '#615ec5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '9px',
    borderBlockColor: '#21130d',
    borderBlockWidth: '2px',
  },
  uncheckedIcon: {
    width: '16px',
    height: '16px',
    backgroundColor: 'transparent',
  },
  optionContent: {
    display: 'flex',
    alignItems: 'center',
  },
  smallText: {
    color: '#899197',
  },
  divider: {
    width: '100%',
    height: '1px',
    backgroundColor: '#d1d1d1',
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
