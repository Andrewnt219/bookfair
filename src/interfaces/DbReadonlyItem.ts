import { DbItem } from './DbItem';

export interface DbReadnonlyItem extends DbItem {
  createdAt: string;
}
