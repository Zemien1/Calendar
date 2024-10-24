import { Label, Switch, Text, makeStyles } from '@fluentui/react-components';
import { Dispatch, SetStateAction } from 'react';

export const CondensedViewControl = (props: {
  isCondensedView: boolean;
  onIsCondensedViewChange: Dispatch<SetStateAction<boolean>>;
}) => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Text
        className={styles.smallText}
        size={200}
        weight="semibold"
      >
        View:
      </Text>
      <Switch
        label={(
          <Label
            size="large"
            weight="semibold"
            color="#000036"
          >
            Condensed
          </Label>
        )}
        checked={props.isCondensedView}
        onChange={() => props.onIsCondensedViewChange(x => !x)}
        labelPosition="before"
      />
    </div>
  );
};

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  smallText: {
    color: '#899197',
    marginRight: '10px'
  }
});