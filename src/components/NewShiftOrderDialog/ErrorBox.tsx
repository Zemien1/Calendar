import { makeStyles, shorthands, Text } from '@fluentui/react-components';
import { ErrorCircle24Regular } from '@fluentui/react-icons';

export const ErrorBox = (props: {
  message: string;
}) => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <ErrorCircle24Regular className={styles.icon} />
      <Text>{props.message}</Text>
    </div>
  );
};

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#bc2f32',
    color: 'white',
    ...shorthands.gap('5px'),
    ...shorthands.padding('3px', '4px'),
    ...shorthands.borderRadius('3px'),
  },
  icon: {
    color: 'white'
  }
});