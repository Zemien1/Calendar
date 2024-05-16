export type ShiftStatus =
  | 'assigned'
  | 'canceled'
  | 'dropped'
  | 'starting_soon'
  | 'ongoing_clocked_in'
  | 'ongoing_no_clock_in'
  | 'no_show'
  | 'awaiting_timesheet'
  | 'ready_for_review'
  | 'approved'
  | 'paid'
  | 'to_resolve'
  | 'revoked';

// no display shifts
// 100000001: 'requested',
// 100000002: 'proposed_to_client',
// 100000003: 'request_withdrawn',
// 100000004: 'request_rejected',
// 100000005: 'not_assigned',

export const hiddenStatuses = [
  100000001,
  100000002,
  100000003,
  100000004,
  100000005,
];

export const statusMap: Record<number, ShiftStatus> = {
  100000006: 'assigned',
  100000007: 'canceled',
  100000008: 'dropped',
  100000009: 'starting_soon',
  100000011: 'ongoing_clocked_in',
  100000012: 'ongoing_no_clock_in',
  100000013: 'no_show',
  100000014: 'awaiting_timesheet',
  100000016: 'ready_for_review',
  100000017: 'approved',
  100000018: 'paid',
  100000019: 'to_resolve',
  100000020: 'revoked',
};

export const colorMap: Record<ShiftStatus, string> = {
  'assigned': '#1F4399',
  'canceled': '#8893A0',
  'dropped': '#EA0000',
  'starting_soon': '#FFBB03',
  'ongoing_clocked_in': '#009645',
  'ongoing_no_clock_in': '#FF6403',
  'no_show': '#EA0000',
  'awaiting_timesheet': '#FFBB03',
  'ready_for_review': '#266AFC',
  'approved': '#00D66B',
  'paid': '#009645',
  'to_resolve': '#FF6403',
  'revoked': '#930000',
};
