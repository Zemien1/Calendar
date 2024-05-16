import * as yup from 'yup';

export type FormDate = string;
export type FormTime = string;
type FormInt = number;
type FormDecimal = number;

export interface NewShiftOrderForm {
  date: FormDate;
  startTime: FormTime;
  endTime: FormTime;
  job: string;
  requestedPositions: FormInt;
  shiftPremium: FormDecimal;
  addAsHidden: boolean;
  unpaidBreak: FormInt;
}

export const formPathNameMapping: Record<keyof NewShiftOrderForm, string> = {
  date: 'Date',
  startTime: 'Start time',
  endTime: 'End time',
  job: 'Job',
  requestedPositions: 'Requested positions',
  shiftPremium: 'Shift premium',
  addAsHidden: 'Add as hidden',
  unpaidBreak: 'Unpaid break'
};

yup.setLocale({
  mixed: {
    default: 'Invalid value provided',
    required: 'This field is required.',
    notType: 'Wrong type of value.'
  },
  string: {
    matches: 'Please provide value in correct format.'
  },
  number: {
    min: 'Minimal value accepted is ${min}.',
    max: 'Maximum value accepted is ${max}.',
    integer: 'Value must be an integer.'
  }
});

const dateRegexp = /^\d\d?\/\d\d?\/\d{4,}$/;
export const timeRegexp = /^[01]?\d((:|\.)[0-6]\d)? ((am)|(AM)|(pm)|(PM))$/;
const premiumRegexp = /^\d+(\.\d{0,2})?$/;

export const validationSchema = yup.object().shape({
  date: yup.string().matches(dateRegexp).required(),
  startTime: yup.string().matches(timeRegexp).required(),
  endTime: yup.string().matches(timeRegexp).required(),
  job: yup.string().required(),
  requestedPositions: yup.number().integer().min(1).max(99).required(),
  unpaidBreak: yup.number().integer().min(0).max(10000),
  // eslint-disable-next-line
  shiftPremium: yup.number().min(0).test('decimal', 'Please provide value in correct format.', (value: number | undefined) => {
    if (value) {
      return premiumRegexp.test(value.toString());
    }
    return true;
  }),
  addAsHidden: yup.bool().required(),
});
