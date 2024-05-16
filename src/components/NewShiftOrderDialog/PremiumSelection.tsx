import { Field, Input, makeStyles } from '@fluentui/react-components';
import { Money16Regular } from '@fluentui/react-icons';
import { Label } from './Label';
import { UseFormRegisterReturn } from 'react-hook-form';

export const PremiumSelection = <T extends string,>(props: {
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
        contentBefore={'$'}
        contentAfter={<Money16Regular />}
        {...props.register}
      />
    </Field>
  );
};

const useStyles = makeStyles({
  input: {
    maxWidth: '125px'
  }
});