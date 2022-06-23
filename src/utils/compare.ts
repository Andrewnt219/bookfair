import dayjs from 'dayjs';

export const compareDate = (a: dayjs.ConfigType, b: dayjs.ConfigType) => {
  return dayjs(a).isAfter(dayjs(b)) ? 1 : -1;
};
