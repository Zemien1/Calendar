export interface ShiftTime {
  hours: number;
  minutes: number;
  appendix: string;
}

export interface Shift {
  start: ShiftTime;
  end: ShiftTime;
}

export const getTime = (time: ShiftTime) => `${time.hours}${time.minutes === 0 ? '' : `:${time.minutes >= 10 ? time.minutes : `0${time.minutes}`}`} ${time.appendix.toLowerCase()}`;
export const getShiftName = (shift: Shift) => `${getTime(shift.start)} - ${getTime(shift.end)}`;

export const commonShifts: Shift[] = [{
  start: {
    hours: 6,
    minutes: 0,
    appendix: 'AM'
  },
  end: {
    hours: 2,
    minutes: 0,
    appendix: 'PM'
  }
}, {
  start: {
    hours: 6,
    minutes: 0,
    appendix: 'AM'
  },
  end: {
    hours: 6,
    minutes: 0,
    appendix: 'PM'
  }
}, {
  start: {
    hours: 6,
    minutes: 30,
    appendix: 'AM'
  },
  end: {
    hours: 7,
    minutes: 0,
    appendix: 'PM'
  }
}, {
  start: {
    hours: 7,
    minutes: 0,
    appendix: 'AM'
  },
  end: {
    hours: 3,
    minutes: 0,
    appendix: 'PM'
  }
}, {
  start: {
    hours: 7,
    minutes: 0,
    appendix: 'AM'
  },
  end: {
    hours: 3,
    minutes: 30,
    appendix: 'PM'
  }
}, {
  start: {
    hours: 7,
    minutes: 0,
    appendix: 'AM'
  },
  end: {
    hours: 7,
    minutes: 0,
    appendix: 'PM'
  }
}, {
  start: {
    hours: 7,
    minutes: 0,
    appendix: 'AM'
  },
  end: {
    hours: 11,
    minutes: 0,
    appendix: 'PM'
  }
}, {
  start: {
    hours: 2,
    minutes: 0,
    appendix: 'PM'
  },
  end: {
    hours: 10,
    minutes: 0,
    appendix: 'PM'
  }
}, {
  start: {
    hours: 3,
    minutes: 0,
    appendix: 'PM'
  },
  end: {
    hours: 7,
    minutes: 0,
    appendix: 'AM'
  }
}, {
  start: {
    hours: 3,
    minutes: 0,
    appendix: 'PM'
  },
  end: {
    hours: 7,
    minutes: 0,
    appendix: 'PM'
  }
}, {
  start: {
    hours: 3,
    minutes: 0,
    appendix: 'PM'
  },
  end: {
    hours: 11,
    minutes: 0,
    appendix: 'PM'
  }
}, {
  start: {
    hours: 3,
    minutes: 0,
    appendix: 'PM'
  },
  end: {
    hours: 11,
    minutes: 30,
    appendix: 'PM'
  }
}, {
  start: {
    hours: 6,
    minutes: 0,
    appendix: 'PM'
  },
  end: {
    hours: 6,
    minutes: 0,
    appendix: 'AM'
  }
}, {
  start: {
    hours: 7,
    minutes: 0,
    appendix: 'PM'
  },
  end: {
    hours: 7,
    minutes: 0,
    appendix: 'AM'
  }
}, {
  start: {
    hours: 7,
    minutes: 0,
    appendix: 'PM'
  },
  end: {
    hours: 11,
    minutes: 0,
    appendix: 'PM'
  }
}, {
  start: {
    hours: 10,
    minutes: 0,
    appendix: 'PM'
  },
  end: {
    hours: 6,
    minutes: 0,
    appendix: 'AM'
  }
}, {
  start: {
    hours: 11,
    minutes: 0,
    appendix: 'PM'
  },
  end: {
    hours: 7,
    minutes: 0,
    appendix: 'AM'
  }
}, {
  start: {
    hours: 11,
    minutes: 0,
    appendix: 'PM'
  },
  end: {
    hours: 7,
    minutes: 30,
    appendix: 'AM'
  }
}];