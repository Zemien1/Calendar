import { Field, Input, makeStyles } from '@fluentui/react-components';
import { Label } from './Label';
import {ClockAlarm20Regular} from '@fluentui/react-icons';
import { UseFormRegisterReturn } from 'react-hook-form';

export const UnpaidBreak = <T extends string,>(props: {
  label: string;
  register: UseFormRegisterReturn<T>;
}) => {
  const styles = useStyles();

  return (
    <Field label={<Label>{props.label}</Label>}>
      <Input
        type="text"
        inputMode="numeric"
        className={styles.input}
        contentAfter={<ClockAlarm20Regular/>}
        {...props.register}
      />
    </Field>
  );
};

const useStyles = makeStyles({
  field: {
    maxWidth: '100px'
  },
  input: {
    maxWidth: '100px'
  },
  label: {
    color: '#8b9191'
  }
});