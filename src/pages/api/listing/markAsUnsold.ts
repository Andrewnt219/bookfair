import { Api } from '@bookfair/common';
import { z } from 'zod';
import { HttpException } from '../../../errors';
import { authMiddleware, listingMiddleware } from '../../../middlewares';
import { ListingService } from '../../../modules/listing/ListingService';
import { TransactionService } from '../../../modules/listing/TransactionService';
import {
  createAssertSchema,
  withApiHandler,
  WithApiHandler,
} from '../../../utils';

type Data = undefined;
export type Listing_MarkAsUnsold = Api<Data, typeof requestSchema>;

const requestSchema = z.object({
  transactionId: z.string(),
});
const validateRequest =
  createAssertSchema<Listing_MarkAsUnsold['input']>(requestSchema);

const patchHandler: WithApiHandler<Data> = async (req, res) => {
  const sellerId = await authMiddleware(req);
  const body = validateRequest(req.body);

  const transaction = await TransactionService.getOne(body.transactionId);
  if (!transaction) throw new HttpException(404, 'Transaction not found');
  if (transaction.reviewId)
    throw new HttpException(400, 'Transaction has already been reviewed');

  const listing = await listingMiddleware(sellerId, transaction.listingId);
  await ListingService.updateOne(listing.id, { isSold: false });
  await TransactionService.updateOne(transaction.id, { isPending: true });

  return res.status(204).end();
};

export default withApiHandler({ patchHandler });
