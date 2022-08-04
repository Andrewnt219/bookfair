import { Api } from '@bookfair/common';
import { z } from 'zod';
import { authMiddleware, listingMiddleware } from '../../../middlewares';
import { DbTransaction } from '../../../modules/listing';
import { TransactionService } from '../../../modules/listing/TransactionService';
import {
  createAssertSchema,
  ResultSuccess,
  withApiHandler,
  WithApiHandler,
} from '../../../utils';

type Data = {
  transactions: DbTransaction[];
};
export type Listing_GetTransactions = Api<Data, typeof requestSchema>;

const requestSchema = z.object({
  listingId: z.string(),
});
const validateRequest =
  createAssertSchema<Listing_GetTransactions['input']>(requestSchema);

const getHandler: WithApiHandler<Data> = async (req, res) => {
  const query = validateRequest(req.query);
  const sellerId = await authMiddleware(req);
  const listing = await listingMiddleware(sellerId, query.listingId);
  const transactions = await TransactionService.getManyByListing(listing.id);
  return res.status(200).json(ResultSuccess({ transactions }));
};

export default withApiHandler({ getHandler });
