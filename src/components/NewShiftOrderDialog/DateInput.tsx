import { Field, Input, makeStyles } from '@fluentui/react-components';
import { CalendarLtr16Regular } from '@fluentui/react-icons';
import { Label } from './Label';
import { UseFormRegisterReturn } from 'react-hook-form';

export const DateInput = <T extends string,>(props: {
  className: string;
  label: string;
  register: UseFormRegisterReturn<T>;
}) => {
  const styles = useStyles();

  return (
    <Field className={props.className} label={<Label>{props.label}</Label>}>
      <Input
        className={styles.input}
        contentAfter={<CalendarLtr16Regular />}
        {...props.register}
      />
    </Field>
  );
};

const useStyles = makeStyles({
  input: {
    maxWidth: '250px'
  }
});