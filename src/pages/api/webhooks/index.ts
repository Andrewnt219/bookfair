import Cors from 'micro-cors';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  handleStripeCheckoutComplete,
  stripeCheckoutComplete,
  StripeCheckoutCompleteData,
} from '../../../middlewares';
import { withApiHandler } from '../../../utils';

// Stripe requires the raw body to construct the event.

const postHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const event = await stripeCheckoutComplete(req);

  if (event.type === 'checkout.session.completed') {
    console.log({ checkoutCompleted: event.data.object });
    await handleStripeCheckoutComplete(
      event.data.object as StripeCheckoutCompleteData
    );
  }

  return res.status(204).end();
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors({
  allowMethods: ['POST', 'HEAD'],
});

// Next.js problem https://vercel.com/guides/getting-started-with-nextjs-typescript-stripe#step-3:-handling-webhooks-&-checking-their-signatures
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default cors(withApiHandler({ postHandler }) as any);
