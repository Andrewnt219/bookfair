import { Api } from '@bookfair/common';
import { authMiddleware } from '../../../middlewares';
import {
  createAssertSchema,
  ResultSuccess,
  WithApiHandler,
  withApiHandler,
} from '../../../utils';
import { purchaseSlotSchema } from '../../../modules/user-profile/types/purchase-slot-schema';
import { PurchaseSlotMetadata } from '../../../modules/user-profile';
import { businessRules } from '../../../constants';
import Stripe from 'stripe';
import { formatAmountForStripe } from '../../../lib/stripe';
import { serverStripe } from '../../../lib/stripe/serverStripe';
type Data = Stripe.Checkout.Session;
export type CheckoutSessions_PurchaseListing = Api<
  Data,
  typeof purchaseSlotSchema
>;

const validateRequest =
  createAssertSchema<CheckoutSessions_PurchaseListing['input']>(
    purchaseSlotSchema
  );

const postHandler: WithApiHandler<Data> = async (req, res) => {
  const userId = await authMiddleware(req);
  const body = validateRequest(req.body);

  const metadata: PurchaseSlotMetadata = {
    type: 'listing/slot',
    userId,
    quantity: body.quantity.toString(),
  };
  const subTotal = businessRules.calculatePurchaseSlot(body.quantity);
  const params: Stripe.Checkout.SessionCreateParams = {
    submit_type: 'pay',
    payment_method_types: ['card'],
    line_items: [
      {
        name: `Purchase ${body.quantity} slots`,
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
