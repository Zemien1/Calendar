import {
  Button,
  Dialog,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  makeStyles,
  shorthands
} from '@fluentui/react-components';
import { Dismiss24Filled } from '@fluentui/react-icons';
import { ShiftOrderForm } from './ShiftOrderForm';
import { Job } from '../../lib/job';
import { Day } from '../../lib/week';
import { useState } from 'react';

export const NewShiftOrderDialog = (props: {
  day: Day;
  jobs: Job[];
  refreshData: () => void;
}) => {
  const styles = useStyles();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <Dialog open={isOpen}>
      <Button
        className={styles.openButton}
        size="small"
        onClick={open}
        as="a"
      >
        Add
      </Button>
      <DialogSurface className={styles.window}>
        <DialogBody>
          <DialogTitle action={(
            <Button
              appearance="subtle"
              aria-label="close"
              icon={<Dismiss24Filled />}
              onClick={close}
            />
          )}>
            Add new Shift Order
          </DialogTitle>
          <DialogContent>
            <ShiftOrderForm
              jobs={props.jobs}
              day={props.day}
              onSubmit={() => {
                close();
                props.refreshData();
              }}
            />
          </DialogContent>
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};

export const useStyles = makeStyles({
  openButton: {
    ...shorthands.padding('3px', '5px'),
    minWidth: 'max-content',
    position: 'absolute',
    right: '3px',
    top: '5px'
  },
  window: {
    minWidth: '750px',
  }
});