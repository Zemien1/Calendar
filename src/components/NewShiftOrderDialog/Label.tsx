import { Label as FluentUILabel, makeStyles } from '@fluentui/react-components';
import { ReactNode } from 'react';

export const Label = (props: { id?: string; children: ReactNode; }) => {
  const styles = useStyles();

  return (
    <FluentUILabel className={styles.label} id={props.id}>
      {props.children}
    </FluentUILabel>
  );
};

const useStyles = makeStyles({
  label: {
    color: '#7a8080'
  }
});