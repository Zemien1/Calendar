import { Text, makeStyles, shorthands } from '@fluentui/react-components';
import { ReactNode } from 'react';

export const ResetControlButton = (props: {
  children?: ReactNode;
  disabled?: boolean;
  onClick: () => void;
}) => {
  const styles = useStyles();

  return (
    <button
      style={{ background: 'none' }}
      className={styles.button}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      <Text size={400} weight="semibold">
        {props.children}
      </Text>
    </button>
  );
};

const useStyles = makeStyles({
  button: {
    minWidth: 'fit-content',
    display: 'block',
    color: '#007de2',
    backgroundColor: 'none',
    cursor: 'pointer',
    ...shorthands.border('0'),
    ':disabled': {
      color: '#00000044',
      cursor: 'default'
    }
  }
});
