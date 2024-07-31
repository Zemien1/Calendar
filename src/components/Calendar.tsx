import {
  TableBody,
  TableCell,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  Text,
  makeStyles,
  shorthands,
  mergeClasses,
} from '@fluentui/react-components';
import { CaretDown24Filled } from '@fluentui/react-icons';
import groupBy from 'lodash/groupBy';
import { getShiftName } from '../lib/shiftName';
import { ShiftTile } from './ShiftTile';
import { WeekDay } from './WeekDay';
import { ShiftStatus } from '../lib/shiftStatus';
import { Week, weekDaysIndexes } from '../lib/week';
import { Job } from '../lib/job';
import { useState } from 'react';
import { sortShiftEntriesAsc, sortShiftEntriesDesc } from '../lib/sort';
import { ShiftOrderStatus } from '../lib/shiftOrderStatus';
import { ShiftOrderContainer } from './ShiftOrderContainer';

export interface Shift {
  id: string;
  start: Date;
  end: Date;
  status: number; // Poprawiono typ statusu na number
  nurse: string;
  cost: number;
  job: Job | null;
}

export interface ShiftOrder {
  id: string;
  start: Date;
  end: Date;
  status: ShiftOrderStatus;
  remainingPositions: number;
  requestedPositions: number;
  numberOfAssignments: number;
  premium: number | null;
  break: number | null;
  job: Job | null;
  shifts: Shift[];
}

export const Calendar = (props: {
  shiftOrders: ShiftOrder[];
  shifts: Shift[];
  week: Week;
  isViewCondensed: boolean;
  jobs: Job[];
  refreshData: () => void;
  selectedStatuses: number[]; // Dodane do przekazania statusów do ShiftOrderContainer
}) => {
  const styles = useStyles();
  const [isSortedAsc, setIsSortedAsc] = useState<boolean>(true);
  const shiftsByShiftTime = groupBy(props.shifts, x => getShiftName(x.start, x.end));
  const shiftsByShiftTimeEntries = Object.entries(shiftsByShiftTime)
    .sort(isSortedAsc ? sortShiftEntriesAsc : sortShiftEntriesDesc);
  const shiftOrdersByDay = groupBy(props.shiftOrders, x => getWeekDayIndexFromDay(x.start.getDay()));

  return (
    <Table className={styles.container}>
      <TableHeader>
        <TableRow className={styles.stickyRow}>
          <TableHeaderCell
            className={mergeClasses(styles.cell, styles.weekDayCell, styles.titleCell)}
            key="shift"
          />
          {props.week.days.map((weekday) => (
            <th key={weekday.key} className={mergeClasses(styles.cell, styles.weekDayCell)}>
              <WeekDay
                jobs={props.jobs}
                day={weekday}
                refreshData={props.refreshData}
              />
            </th>
          ))}
        </TableRow>
        <TableRow style={{ position: 'relative' }}>
          <TableHeaderCell
            className={styles.shiftColumn}
            key="shift"
            button={{
              className: styles.shiftColumnButton,
              onClick: () => setIsSortedAsc(x => !x)
            }}
          >
            <Text size={400} weight="bold">Open Shifts</Text>
            <CaretDown24Filled className={mergeClasses(styles.sortArrow, !isSortedAsc && styles.rotate)} />
          </TableHeaderCell>
          {props.week.days.map((weekday) => (
            <TableHeaderCell
              className={mergeClasses(styles.cell, styles.shiftOrderCell)}
              key={weekday.key}
              button={{ className: styles.headerButton }}
            >
              <ShiftOrderContainer
                shiftOrders={shiftOrdersByDay[weekday.key] ?? []}
                isViewCondensed={props.isViewCondensed}
                selectedStatuses={props.selectedStatuses} // Dodane do przekazania statusów do ShiftOrderContainer
              />
            </TableHeaderCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {shiftsByShiftTimeEntries.map(([shiftName, itemsByShift]) => {
          const groupedByDay = groupBy(itemsByShift, x => getWeekDayIndexFromDay(x.start.getDay()));

          return (
            <TableRow className={styles.row} key={shiftName}>
              <TableCell className={mergeClasses(styles.cell, styles.titleCell)}>
                <Text size={400} weight="bold">
                  {shiftName}
                </Text>
              </TableCell>
              {weekDaysIndexes.map((index) => {
                const items = groupedByDay[index];
                return (
                  <TableCell className={styles.cell} key={index}>
                    {items ? items.map(x => (
                      <ShiftTile
                        key={x.id}
                        shift={x}
                        isCondensed={props.isViewCondensed}
                      />
                    )) : null}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

const useStyles = makeStyles({
  container: {
    width: '100%',
    ...shorthands.margin(0, 'auto')
  },
  stickyRow: {
    position: 'sticky',
    top: 0,
    left: 0,
    zIndex: 10,
  },
  shiftColumn: {
    color: '#000036',
    ...shorthands.borderRight('1px', 'solid', '#ebebeb'),
    ...shorthands.borderBottom('2px', 'solid', '#00000088'),
    ...shorthands.padding('5px')
  },
  shiftColumnButton: {
    cursor: 'pointer',
  },
  sortArrow: {
    marginLeft: '5px',
    height: '13px',
    width: '13px'
  },
  rotate: {
    transform: 'rotate(180deg)'
  },
  row: {
    ':hover': {
      backgroundColor: 'initial'
    },
    ':active': {
      backgroundColor: 'initial'
    },
    ':focus-within': {
      backgroundColor: 'initial !important'
    }
  },
  cell: {
    ...shorthands.border('1px', 'solid', '#ebebeb'),
    ...shorthands.padding('2px'),
    backgroundClip: 'padding-box',
    ':nth-of-type(even)': {
      backgroundColor: '#fcfcfc',
    },
    ':nth-of-type(odd)': {
      backgroundColor: '#ffffff',
    },
  },
  weekDayCell: {
    position: 'relative',
    ...shorthands.borderBottom(0),
    ...shorthands.borderTop(0),
    ...shorthands.padding(0)
  },
  shiftOrderCell: {
    position: 'relative',
    verticalAlign: 'top',
    ...shorthands.borderBottom('2px', 'solid', '#00000088'),
    ...shorthands.borderTop(0),
  },
  headerButton: {
    position: 'unset',
  },
  titleCell: {
    color: '#000036',
    verticalAlign: 'top',
    ...shorthands.borderLeft(0)
  }
});

const getWeekDayIndexFromDay = (day: number) => (day + 6) % 7;
