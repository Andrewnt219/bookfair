import { buffer } from 'micro';
import { NextApiRequest } from 'next';
import Stripe from 'stripe';
import { HttpException } from '../errors';
import { serverStripe } from '../lib/stripe/serverStripe';
import { getErrorMessage } from '../utils';

export const stripeCheckoutComplete = async (
  req: NextApiRequest
): Promise<Stripe.Event> => {
  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'] as string;

  let event: Stripe.Event;

  try {
    event = serverStripe.webhooks.constructEvent(
      buf.toString(),
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    throw new HttpException(400, getErrorMessage(err));
  }

  return event;
};
