import { DbItem } from './DbItem';

export interface DbWriteableItem extends DbItem {
  createdAt: string;
  updatedAt: string;
}
