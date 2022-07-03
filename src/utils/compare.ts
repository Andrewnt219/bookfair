import dayjs from 'dayjs';
import { DbListing } from '../modules/listing';

export const compareDate = (a: dayjs.ConfigType, b: dayjs.ConfigType) => {
  return dayjs(a).isAfter(dayjs(b)) ? 1 : -1;
};

export const compareListingDate = (a: DbListing, b: DbListing) => {
  return compareDate(b.createdAt, a.createdAt);
};
