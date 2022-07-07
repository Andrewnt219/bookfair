import { Api } from '@bookfair/common';
import { z } from 'zod';
import { HttpException } from '../../../errors';
import { authMiddleware } from '../../../middlewares';
import { ListingService } from '../../../modules/listing/ListingService';
import { TransactionService } from '../../../modules/listing/TransactionService';
import {
  createAssertSchema,
  withApiHandler,
  WithApiHandler,
} from '../../../utils';

type Data = undefined;
export type Listing_MarkAsSold = Api<Data, typeof requestSchema>;

const requestSchema = z.object({
  listingId: z.string(),
});
const validateRequest =
  createAssertSchema<Listing_MarkAsSold['input']>(requestSchema);

const patchHandler: WithApiHandler<Data> = async (req, res) => {
  const sellerId = await authMiddleware(req);
  const body = validateRequest(req.body);

  const listing = await ListingService.getOne(body.listingId);
  if (!listing) throw new HttpException(404, 'Listing not found');
  const transaction = await TransactionService.getOneByListing(
    listing.id,
    sellerId
  );
  if (!transaction) throw new HttpException(404, 'Transaction not found');

  await ListingService.updateOne(listing.id, { isSold: true });
  await TransactionService.updateOne(transaction.id, { isPending: false });

  return res.status(204).end();
};

export default withApiHandler({ patchHandler });
