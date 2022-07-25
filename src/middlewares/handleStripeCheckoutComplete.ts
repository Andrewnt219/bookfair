import dayjs from 'dayjs';
import Stripe from 'stripe';
import { AuthService } from '../modules/auth/service';
import { PromoteListingMetadata } from '../modules/listing';
import { ListingService } from '../modules/listing/ListingService';
import { DbPayment } from '../modules/payments';
import { PaymentService } from '../modules/payments/PaymentService';
import { PurchaseSlotMetadata } from '../modules/user-profile';

export type StripeCheckoutCompleteData = Stripe.Checkout.Session & {
  metadata: PurchaseSlotMetadata | PromoteListingMetadata;
  amount_total: number;
};

export const handleStripeCheckoutComplete = async (
  data: StripeCheckoutCompleteData
) => {
  const payment: DbPayment = {
    createdAt: dayjs().unix(),
    id: data.id,
    amount: data.amount_total,
    type: data.metadata.type,
  };
  await PaymentService.createOne(payment);

  const { metadata } = data;
  switch (metadata.type) {
    case 'listing/slot':
      await AuthService.purchaseListing(metadata.userId, +metadata.quantity);
      break;

    case 'listing/promote':
      await ListingService.promoteOne(metadata.listingId, +metadata.expires_at);
      break;

    default:
      console.error({ payment }, 'Unhandled payment type: ');
      break;
  }
};
