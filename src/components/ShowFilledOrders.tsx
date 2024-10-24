import { Label, Switch, Text, makeStyles } from '@fluentui/react-components';
import { Dispatch, SetStateAction } from 'react';

export const ShowFiledOrders = (props: {
  ShowFilledOrders: boolean;
  onShowFilledOrdersChange: Dispatch<SetStateAction<boolean>>;
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
            className={styles.noWrap}
          >
            Show Filled Orders
          </Label>
        )}
        checked={props.ShowFilledOrders}
        onChange={() => props.onShowFilledOrdersChange(x => !x)}
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
    paddingRight:'20px'
  },
  smallText: {
    color: '#899197',
    marginRight: '10px'
  },
  noWrap: {
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap', // Zapobiega zawijaniu tekstu
  }
});