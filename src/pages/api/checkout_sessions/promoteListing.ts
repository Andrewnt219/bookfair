import { Api } from '@bookfair/common';
import dayjs from 'dayjs';
import Stripe from 'stripe';
import { z } from 'zod';
import { businessRules } from '../../../constants';
import { formatAmountForStripe } from '../../../lib/stripe';
import { serverStripe } from '../../../lib/stripe/serverStripe';
import { PromoteListingMetadata } from '../../../modules/listing';
import { ListingService } from '../../../modules/listing/ListingService';
import {
  createAssertSchema,
  ResultSuccess,
  withApiHandler,
  WithApiHandler,
} from '../../../utils';
type Data = Stripe.Checkout.Session;
export type CheckoutSessions_PromoteListing = Api<Data, typeof requestSchema>;

const requestSchema = z.object({
  days: z.number().nonnegative(),
  listingId: z.string(),
});
const validateRequest =
  createAssertSchema<CheckoutSessions_PromoteListing['input']>(requestSchema);

const postHandler: WithApiHandler<Data> = async (req, res) => {
  const body = validateRequest(req.body);
  const listing = await ListingService.getOne(body.listingId);
  if (!listing) throw new Error('Listing not found');

  const promotionExpiresAt = dayjs().add(body.days, 'day').unix();
  const metadata: PromoteListingMetadata = {
    listingId: listing.id,
    expires_at: promotionExpiresAt.toString(),
    type: 'listing/promote',
  };
  const subTotal = businessRules.calculatePromotionCost(body.days);
  const params: Stripe.Checkout.SessionCreateParams = {
    submit_type: 'pay',
    payment_method_types: ['card'],
    line_items: [
      {
        name: `Promote ${listing.title} for ${body.days} days`,
        amount: formatAmountForStripe(subTotal, businessRules.STRIPE_CURRENCY),
        tax_rates: [process.env.STRIPE_TAX_ID],
        currency: businessRules.STRIPE_CURRENCY,
        quantity: 1,
      },
    ],
    success_url: `${req.headers.origin}/user/listings?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.origin}/user/listings`,
    metadata,
  };
  const checkoutSession: Stripe.Checkout.Session =
    await serverStripe.checkout.sessions.create(params);
  return res.status(200).json(ResultSuccess(checkoutSession));
};

export default withApiHandler({ postHandler });
