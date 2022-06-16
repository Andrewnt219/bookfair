import { DbWriteableItem } from '../../../interfaces';
import { DbListingPhoto } from './DbListingPhoto';

export interface DbListing extends DbWriteableItem {
  userId: string;
  title: string;
  price: number;
  description: string;
  isSold: boolean;
  viewCount: number;
  photos: DbListingPhoto[];
}
