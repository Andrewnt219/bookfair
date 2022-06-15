import { DbWriteableItem } from '../../../interfaces';

export interface DbListingPhoto extends DbWriteableItem {
  listingId: string;
  mediaUrl: string;
}
