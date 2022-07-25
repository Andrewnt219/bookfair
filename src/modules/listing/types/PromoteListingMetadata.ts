import Stripe from 'stripe';
import { businessRules } from '../../../constants';

// NOTE metadata is parsed as string only
export interface PromoteListingMetadata extends Stripe.MetadataParam {
  type: typeof businessRules['paymentTypes']['PROMOTE_LISTING'];
  expires_at: string;
  listingId: string;
}
