import { DayjsAble } from '@bookfair/common';
import dayjs from 'dayjs';

// get name of months between two dates
export const getMonthsBetween = (startDate: DayjsAble, endDate: DayjsAble) => {
  const months = [];
  let currentDate = dayjs(startDate);
  while (currentDate.isBefore(endDate)) {
    months.push(currentDate.format('MMMM'));
    currentDate = currentDate.add(1, 'month');
  }
  return months;
};
