import { ReactNode } from 'react';
import { makeStyles } from '@fluentui/react-components';

export const ScrollableContainer = (props: { children: ReactNode; height: string; }) => {
  const styles = useStyles();

  return (
    <div style={{ height: props.height }} className={styles.container}>
      {props.children}
    </div>
  );
};

const useStyles = makeStyles({
  container: {
    width: '100%',
    overflowY: 'auto',
  }
});
