import { Api } from '@bookfair/common';
import { z } from 'zod';
import {
  createAssertSchema,
  ResultSuccess,
  withApiHandler,
  WithApiHandler,
} from '../../../utils';
import Stripe from 'stripe';
import { serverStripe } from '../../../lib/stripe/serverStripe';

type Data = Stripe.Checkout.Session;
export type CheckoutSession_Index = Api<Data, typeof requestSchema>;

const requestSchema = z.object({
  session_id: z.string().refine((val) => val.startsWith('cs_'), {
    message: 'Session ID must start with cs_',
  }),
});
const validateRequest =
  createAssertSchema<CheckoutSession_Index['input']>(requestSchema);

const getHandler: WithApiHandler<Data> = async (req, res) => {
  const query = validateRequest(req.query);
  const checkoutSession = await serverStripe.checkout.sessions.retrieve(
    query.session_id
  );
  return res.status(200).json(ResultSuccess(checkoutSession));
};

export default withApiHandler({ getHandler });
