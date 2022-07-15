import { DayjsAble } from '@bookfair/common';
import dayjs from 'dayjs';
import { DbListing } from '../modules/listing';

export const compareDate = (a: DayjsAble, b: DayjsAble) => {
  return dayjs(a).isAfter(dayjs(b)) ? 1 : -1;
};

export const compareListingDate = (a: DbListing, b: DbListing) => {
  return compareDate(dayjs.unix(b.createdAt), dayjs.unix(a.createdAt));
};
