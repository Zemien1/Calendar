import { Dropdown, Option, Text, makeStyles, shorthands } from '@fluentui/react-components';
import { CircleFilled } from '@fluentui/react-icons';
import { JobOption } from '../lib/job';
import { Dispatch, SetStateAction } from 'react';
import { ResetControlButton } from './ResetControlButton';
import { UnpaidBreak } from './NewShiftOrderDialog/UnpaidBreak';

export const JobsFilterControl = (props: {
  jobs: JobOption[];
  onJobsChange: Dispatch<SetStateAction<JobOption[]>>;
}) => {
  const styles = useStyles();
  const selectedOptions = props.jobs.filter(x => x.selected).map(x => x.id);
  const dropdownValue = selectedOptions.length === 0
    ? 'Filter by Job'
    : `${selectedOptions.length} Jobs Selected`;

  return (
    <div className={styles.container}>
      <Text
        className={styles.smallText}
        size={200}
        weight="semibold"
      >
        Jobs:
      </Text>
      <Dropdown
        multiselect={true}
        value={dropdownValue}
        selectedOptions={selectedOptions}
        onOptionSelect={(_, data) => {
          props.onJobsChange(jobs =>
            createNewJobsWithSelectedFn(jobs, job => data.selectedOptions.includes(job.id))
          );
        }}
      >
        {props.jobs.map(x => (
          <Option
            text={x.name}
            key={x.id}
            value={x.id}
            checkIcon={{
              style: {
                minHeight: '16px',
                minWidth: '16px'
              }
            }}
          >
            <CircleFilled className={styles.circleIcon} color={x.color} />
            {x.name}
          </Option>
        ))}
      </Dropdown>
      <ResetControlButton
        disabled={selectedOptions.length === 0}
        onClick={() => props.onJobsChange(jobs =>
          createNewJobsWithSelectedFn(jobs, () => false)
        )}
      >
        Reset Filter
      </ResetControlButton>
    </div >
  );
};

const useStyles = makeStyles({
  container: {
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

const createNewJobsWithSelectedFn = (
  jobs: JobOption[],
  selectedFn: (job: JobOption) => boolean
): JobOption[] => jobs.map(x => ({
  id: x.id,
  name: x.name,
  color: x.color,
  selected: selectedFn(x),
  isActive: x.isActive,
  ava_defaultunpaidbreak: x.ava_defaultunpaidbreak
}));
