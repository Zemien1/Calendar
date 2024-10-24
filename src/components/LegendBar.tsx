import { Text, makeStyles, mergeClasses, shorthands } from '@fluentui/react-components';
import { CircleFilled } from '@fluentui/react-icons';
import { JobOption, generateColor } from '../lib/job';

export const LegendBar = (props: {
  jobs: JobOption[];
}) => {
  const styles = useStyles();
  const isAnySelected = props.jobs.reduce((acc, current) => acc || current.selected, false);
/**const jobsOptions: JobOption[] = jobs.map(x => ({
        id: x.ava_jobid,
        name: x.ava_name,
        color: generateColor(x.ava_jobid, x.ava_name),
        selected: false,
        isActive: generateIsActive(x.statecode),
        ava_defaultunpaidbreak: x.ava_defaultunpaidbreakdurationjob
      })); */
  return (
    <div className={styles.container}>
      <Text
        className={styles.smallText}
        size={200}
        weight="semibold"
      >
        Legend:
      </Text>
      {props.jobs.map(x => {
        const isDisabled = isAnySelected ? !x.selected : !x.isActive;

        return (
          <div className={mergeClasses(styles.legendItem, isDisabled && styles.disabled)} key={x.id}>
            <CircleFilled primaryFill={generateColor(x.id, x.name)} className={styles.circleIcon} />
            <Text size={200} weight="semibold">{x.name}</Text>
          </div>
        );
      })}
    </div>
  );
};

const useStyles = makeStyles({
  container: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('15px'),
    ...shorthands.border('1px', 'solid', '#00000024'),
    ...shorthands.padding('10px', '15px'),
    ...shorthands.margin('8px', '0', '5px'),
  },
  smallText: {
    color: '#899197',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    ...shorthands.gap('2px')
  },
  circleIcon: {
    height: '10px',
    width: '10px',
  },
  disabled: {
    opacity: 0.3
  }
});
