import { DbReadnonlyItem } from '../../../interfaces';

export interface DbPayment extends DbReadnonlyItem {
  amount: number;
  type: 'listing/slot' | 'listing/promote';
}
