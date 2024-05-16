import { makeStyles, shorthands, Text } from '@fluentui/react-components';
import { Info16Regular } from '@fluentui/react-icons';
import { NewShiftOrderForm } from '../../lib/shiftOrderForm';
import { useEffect, useState } from 'react';
import { isShiftOverNight } from '../../lib/formTime';
import { Control, useWatch } from 'react-hook-form';

export const OverNightMark = (props: {
  control: Control<NewShiftOrderForm>
}) => {
  const styles = useStyles();
  const [isOverNight, setIsOverNight] = useState(false);
  const startTime = useWatch({
    control: props.control,
    name: 'startTime'
  });
  const endTime = useWatch({
    control: props.control,
    name: 'endTime'
  });

  useEffect(() => {
    try {
      const isShiftOvernight = isShiftOverNight(startTime, endTime);
      setIsOverNight(isShiftOvernight);
    } catch (e) {
      setIsOverNight(false);
    }
  }, [startTime, endTime]);

  return isOverNight ? (
    <div className={styles.container}>
      <Info16Regular />
      <Text size={200}>Overnight Shift</Text>
    </div>
  ) : null;
};

const useStyles = makeStyles({
  container: {
    position: 'absolute',
    bottom: '-13px',
    left: '-3px',
    display: 'flex',
    alignItems: 'center',
    color: '#456f95',
    ...shorthands.gap('2px'),
    ...shorthands.padding('3px', '4px'),
    ...shorthands.borderRadius('3px'),
  }
});