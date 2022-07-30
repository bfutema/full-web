import {
  addDays,
  lastDayOfWeek,
  differenceInDays,
  eachWeekOfInterval,
} from 'date-fns';

import { getFirstAndLastDatesFromDate } from './getFirstAndLastDatesFromDate';

export interface IDate {
  isShow: boolean;
  date: Date;
}

function getCalendarDates(day: Date) {
  const array: IDate[] = [];

  const [first, last] = getFirstAndLastDatesFromDate(day);

  const weeks = eachWeekOfInterval({
    start: new Date(first.getFullYear(), first.getMonth(), first.getDate()),
    end: new Date(last.getFullYear(), last.getMonth(), last.getDate()),
  });

  const from = weeks[0];
  const to = lastDayOfWeek(weeks[weeks.length - 1]);
  const diff = differenceInDays(to, from);

  for (let i = 0; i <= diff; i++) {
    const date = addDays(from, i);

    if (date.getMonth() === first.getMonth()) {
      array.push({ isShow: true, date });
    } else {
      array.push({ isShow: false, date });
    }
  }

  return array;
}

export { getCalendarDates };
