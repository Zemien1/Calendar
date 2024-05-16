import { Button, Field, Input, makeStyles, shorthands } from '@fluentui/react-components';
import { Add16Filled, DividerShortFilled } from '@fluentui/react-icons';
import { Label } from './Label';
import { FieldValues, Path, UseFormRegisterReturn } from 'react-hook-form';

export const AvailablePositions = <T extends Path<TFieldValues>, TFieldValues extends FieldValues>(props: {
  register: UseFormRegisterReturn<T>;
  label: string;
  changeValue: (value: number) => void;
  getCurrentValue: () => number;
}) => {
  const styles = useStyles();

  return (
    <Field className={styles.field} label={<Label>{props.label}</Label>}>
      <div className={styles.fieldDisplay}>
        <Button
          icon={<DividerShortFilled className={styles.substractIcon} />}
          tabIndex={-1}
          onClick={() => props.changeValue(props.getCurrentValue() - 1)}
        />
        <Input
          type="text"
          inputMode="numeric"
          className={styles.input}
          {...props.register}
        />
        <Button
          icon={<Add16Filled />}
          tabIndex={-1}
          onClick={() => props.changeValue(props.getCurrentValue() + 1)}
        />
      </div>
    </Field>
  );
};

const useStyles = makeStyles({
  field: {
    maxWidth: 'max-content',
  },
  fieldDisplay: {
    display: 'flex',
    ...shorthands.gap('5px')
  },
  substractIcon: {
    height: '16px',
    width: '16px',
    transform: 'rotate(90deg)'
  },
  input: {
    maxWidth: '80px'
  }
});
