import { makeStyles } from '@fluentui/react-components';
import '../styles/loader.css';

export const Loader = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <div className="loader"><div></div><div></div><div></div></div>
    </div>
  );
};

const useStyles = makeStyles({
  container: {
    position: 'absolute',
    top: '0',
    bottom: '0',
    right: '0',
    left: '0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10
  }
});
