import { Api } from '@bookfair/common';
import { z } from 'zod';
import { businessRules } from '../../../constants';
import { ListingService } from '../../../modules/listing/ListingService';
import { PaymentService } from '../../../modules/payments/PaymentService';
import {
  createAssertSchema,
  ResultSuccess,
  withApiHandler,
  WithApiHandler,
} from '../../../utils';
import dayjs from 'dayjs';
import { authMiddleware, listingMiddleware } from '../../../middlewares';
import { nanoid } from 'nanoid';

type Data = { promotionExpire: string };
export type Listing_PromoteOne = Api<Data, typeof requestSchema>;

const requestSchema = z.object({
  days: z.number().nonnegative(),
  listingId: z.string(),
});
const validateRequest =
  createAssertSchema<Listing_PromoteOne['input']>(requestSchema);

const postHandler: WithApiHandler<Data> = async (req, res) => {
  const userId = await authMiddleware(req);
  const body = validateRequest(req.body);
  const listing = await listingMiddleware(userId, body.listingId);

  const promotionExpire = dayjs().add(body.days, 'day').toISOString();
  await ListingService.updateOne(listing.id, {
    promote: promotionExpire,
  });
  await PaymentService.createOne({
    createdAt: dayjs().unix(),
    id: nanoid(),
    amount: businessRules.calculatePromotionCost(body.days),
    type: 'listing/promote',
  });
  return res.status(200).json(ResultSuccess({ promotionExpire }));
};

export default withApiHandler({ postHandler });
