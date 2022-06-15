import { DbWriteableItem } from '../../../interfaces';

export interface DbListing extends DbWriteableItem {
  userId: string;
  title: string;
  price: number;
  description: string;
  isSold: boolean;
  viewCount: number;
}
