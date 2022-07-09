import { Stripe, loadStripe } from '@stripe/stripe-js';

let stripe: Stripe | null;
export const getStripe = async () => {
  stripe ??= await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  if (!stripe) {
    throw new Error('Could not connect to Stripe');
  }

  return stripe;
};
