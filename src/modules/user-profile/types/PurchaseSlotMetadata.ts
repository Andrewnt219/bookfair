import Stripe from 'stripe';
import { businessRules } from '../../../constants';

// NOTE metadata is parsed as string only
export interface PurchaseSlotMetadata extends Stripe.MetadataParam {
  type: typeof businessRules['paymentTypes']['PURCHASE_SLOT'];
  quantity: string;
  userId: string;
}
