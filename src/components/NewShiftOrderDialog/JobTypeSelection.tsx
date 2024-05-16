import { Field, Radio, RadioGroup, Text, makeStyles, mergeClasses, shorthands, useId } from '@fluentui/react-components';
import { CircleFilled } from '@fluentui/react-icons';
import { Label } from './Label';
import { UseFormRegisterReturn } from 'react-hook-form';
import { Job } from '../../lib/job';

export const JobTypeSelection = <T extends string,>(props: {
  className?: string;
  label: string;
  jobs: Job[];
  register: UseFormRegisterReturn<T>;
  onJobChange: (jobId: string) => void; // Dodane
}) => {
  const styles = useStyles();
  const labelId = useId('jobType');

  const handleJobChange = (ev: React.FormEvent<HTMLDivElement>, data: { value: string }) => {
    props.onJobChange(data.value);
  };

  return (
    <Field
      className={mergeClasses(styles.field, props.className)}
      label={<Label id={labelId}>{props.label}</Label>}
      aria-labelledby={labelId}
    >
      <RadioGroup
        className={styles.jobContainer}
        onChange={handleJobChange} // Użycie zaktualizowanej funkcji handleJobChange unpaidbreak
      >
        {props.jobs.map(x => (
          <Radio
            key={x.id}
            className={styles.jobItem}
            value={x.id}
            label={(
              <span className={styles.jobLabel}>
                <CircleFilled className={styles.circleIcon} color={x.color} />
                <Text size={300}>{x.name}</Text>
              </span>
            )}
            input={{ className: styles.jobInput }}
            disabled={!x.isActive}
            {...props.register} // Założenie, że 'job' to nazwa pola
          />
        ))}
      </RadioGroup>
    </Field>
  );
};
const useStyles = makeStyles({
  field: {
    display: 'block'
  },
  jobContainer: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  jobItem: {
    display: 'flex',
    alignItems: 'center',
  },
  jobLabel: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '-6px',
    ...shorthands.gap('3px'),
  },
  jobInput: {
    ...shorthands.padding('0px')
  },
  circleIcon: {
    minHeight: '14px',
    minWidth: '14px',
    maxHeight: '14px',
    maxWidth: '14px',
  }
});
