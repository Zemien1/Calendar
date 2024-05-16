import { Field, Input, makeStyles, mergeClasses } from '@fluentui/react-components';
import { Clock20Regular } from '@fluentui/react-icons';
import { Label } from './Label';
import { UseFormRegisterReturn } from 'react-hook-form';

export const TimeInput = <TName extends string>(props: {
  className: string;
  label: string;
  register: UseFormRegisterReturn<TName>;
}) => {
  const styles = useStyles();

  return (
    <Field className={mergeClasses(props.className, styles.field)} label={<Label>{props.label}</Label>}>
      <Input
        className={styles.input}
        type="text"
        contentAfter={<Clock20Regular />}
        {...props.register}
      />
    </Field>
  );
};

const useStyles = makeStyles({
  field: {
    maxWidth: '120px'
  },
  input: {
    maxWidth: '120px'
  },
  label: {
    color: '#8b9191'
  }
});