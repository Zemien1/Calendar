import { Checkbox, Text, makeStyles } from '@fluentui/react-components';
import { UseFormRegisterReturn } from 'react-hook-form';

export const AddHiddenSelection = <T extends string,>(props: {
  register: UseFormRegisterReturn<T>;
}) => {
  const styles = useStyles();

  return (
    <Checkbox
      className={styles.checkbox}
      label={<Text size={300}>Add as hidden - do not advertise to Providers</Text>}
      {...props.register}
    />
  );
};

const useStyles = makeStyles({
  checkbox: {
    maxWidth: 'max-content'
  }
});