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
  listingId: z.string(),
});
const validateRequest =
  createAssertSchema<Listing_MarkAsUnsold['input']>(requestSchema);

const patchHandler: WithApiHandler<Data> = async (req, res) => {
  const sellerId = await authMiddleware(req);
  const body = validateRequest(req.body);

  const listing = await listingMiddleware(sellerId, body.listingId);
  const transaction = await TransactionService.getOneByListing(
    listing.id,
    sellerId
  );
  if (!transaction) throw new HttpException(404, 'Transaction not found');
  if (transaction.reviewId)
    throw new HttpException(400, 'Transaction has already been reviewed');

  await ListingService.updateOne(listing.id, { isSold: false });
  await TransactionService.updateOne(transaction.id, { isPending: true });

  return res.status(204).end();
};

export default withApiHandler({ patchHandler });
