import { Button, Text, makeStyles, mergeClasses, shorthands } from '@fluentui/react-components';
import { TimeInput } from './TimeInput';
import { QuickTimeSelection } from './QuickTimeSelection';
import { JobTypeSelection } from './JobTypeSelection';
import { AvailablePositions } from './AvailablePositionsSelection';
import { PremiumSelection } from './PremiumSelection';
import { AddHiddenSelection } from './AddHiddenSelection';
import { Job } from '../../lib/job';
import { DateInput } from './DateInput';
import { useForm } from 'react-hook-form';
import { NewShiftOrderForm, formPathNameMapping, validationSchema } from '../../lib/shiftOrderForm';
import { Day } from '../../lib/week';
import { NewShiftOrder, addShiftOrder } from '../../api/dataApi';
import { useEffect, useState } from 'react';
import { ErrorBox } from './ErrorBox';
import { OverNightMark } from './OverNightMark';
import { getDateEndTimeAsDate, getDateStartTimeAsDate, isShiftOverNight } from '../../lib/formTime';
import { Loader } from '../Loader';
import { UnpaidBreak } from './UnpaidBreak';

interface Error {
  path: keyof NewShiftOrderForm;
  message: string;
}

export const ShiftOrderForm = (props: {
  day: Day;
  jobs: Job[];
  onSubmit: () => void;
}) => {
  const styles = useStyles();
  const [resetFormTrigger, setResetFormTrigger] = useState<boolean>(false);
  const [resetForm, setResetForm] = useState<NewShiftOrderForm | undefined>(undefined);
  const [error, setError] = useState<string | undefined>();
  const defaultValues: Partial<NewShiftOrderForm> = {
    date: props.day.date.toLocaleDateString('en-US'),
    requestedPositions: 1,
    shiftPremium: 0,
  };

  const form = useForm<NewShiftOrderForm>({ defaultValues: defaultValues });

  useEffect(() => {
    form.reset(resetForm ?? defaultValues);
  }, [resetFormTrigger]);

  const triggerFormReset = (formState?: NewShiftOrderForm) => {
    setResetForm(formState);
    setResetFormTrigger(x => !x);
  };

  const setValue = (name: keyof NewShiftOrderForm, value: string | number) => form.setValue(name, value);

  const handleJobChange = (selectedJobId: string) => {
    const selectedJob = props.jobs.find(job => job.id === selectedJobId);
    const defaultUnpaidBreakValue = selectedJob ? selectedJob.ava_defaultunpaidbreak : 0;
    setValue('unpaidBreak', defaultUnpaidBreakValue); // Ustaw wartość domyślnej bezpłatnej przerwy
  };
  

  const onSubmit = async (formData: NewShiftOrderForm) => {
    try {
      await validationSchema.validate(formData);
      const isOverNight = isShiftOverNight(formData.startTime, formData.endTime);
      const requestData: NewShiftOrder = {
        startTime: getDateStartTimeAsDate(formData.date, formData.startTime),
        endTime: getDateEndTimeAsDate(formData.date, formData.endTime, isOverNight),
        shiftPremium: formData.shiftPremium,
        unpaidBreak: formData.unpaidBreak,
        requestedPositions: formData.requestedPositions,
        jobId: formData.job,
        hidden: formData.addAsHidden,
      };

      await addShiftOrder(requestData);
      triggerFormReset();
      props.onSubmit();
    } catch (error: any) {
      if (error.path) {
        const { path, message } = error as Error;
        const errorMessage = `${formPathNameMapping[path]}: ${message}`;
        setError(errorMessage);
        const resetValue = {
          ...formData,
          [path]: defaultValues[path] ?? null,
        };
        triggerFormReset(resetValue);
      } else {
        setError('Unable to send the request');
        triggerFormReset();
      }
    }
  };

  return (
    <div className={styles.loaderContainer}>
      {form.formState.isSubmitting && <Loader />}
      <form onSubmit={form.handleSubmit(onSubmit)} className={mergeClasses(styles.container, form.formState.isSubmitting && styles.isLoading)}>
        {error && <ErrorBox message={error} />}
        <div className={styles.popupContainer}>
          <div className={styles.topRow}>
            <DateInput
              className={styles.rowItem}
              label={formPathNameMapping.date}
              register={form.register('date')}
            />
            <TimeInput
              className={styles.rowItem}
              label={formPathNameMapping.startTime}
              register={form.register('startTime')}
            />
            <TimeInput
              className={styles.rowItem}
              label={formPathNameMapping.endTime}
              register={form.register('endTime')}
            />
            <UnpaidBreak
              label={formPathNameMapping.unpaidBreak}
              register={form.register('unpaidBreak', { valueAsNumber: true })}
            />
          </div>
          <OverNightMark control={form.control} />
        </div>
        <div className={styles.row}>
          <JobTypeSelection
            className={styles.jobSelection}
            label={formPathNameMapping.job}
            register={form.register('job')}
            jobs={props.jobs}
            onJobChange={handleJobChange} // Dodajemy funkcję callback
          />
          <QuickTimeSelection
            className={styles.quickTimeSelection}
            label="Quick time selection"
            setStartTime={value => setValue('startTime', value)}
            setEndTime={value => setValue('endTime', value)}
          />
        </div>
        <div className={styles.row}>
          <AvailablePositions
            register={form.register('requestedPositions', { valueAsNumber: true })}
            label={formPathNameMapping.requestedPositions}
            changeValue={value => setValue('requestedPositions', value)}
            getCurrentValue={() => form.getValues('requestedPositions')}
          />
          <PremiumSelection
            label={formPathNameMapping.shiftPremium}
            register={form.register('shiftPremium', { valueAsNumber: true })}
          />
        </div>
        <AddHiddenSelection register={form.register('addAsHidden')} />
        <Button
          className={styles.submitButton}
          type="submit"
          appearance="primary"
          disabled={form.formState.isSubmitting}
        >
          <Text size={500}>Submit</Text>
        </Button>
      </form>
    </div>
  );
};

const useStyles = makeStyles({
  loaderContainer: {
    position: 'relative',
    width: '100%',
  },
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('15px')
  },
  popupContainer: {
    position: 'relative',
    paddingBottom: '8px'
  },
  row: {
    width: '100%',
    display: 'flex',
    ...shorthands.gap('10px')
  },
  topRow: {
    width: '100%',
    display: 'flex',
    paddingRight: '15px',
    ...shorthands.gap('25px'),
  },
  rowItem: {
    flexGrow: 1
  },
  jobSelection: {
    width: '48%'
  },
  quickTimeSelection: {
    width: '52%'
  },
  submitButton: {
    position: 'absolute',
    bottom: '40px',
    right: '50px',
    height: '60px',
    width: '210px',
  },
  isLoading: {
    opacity: 0.2
  },
});
