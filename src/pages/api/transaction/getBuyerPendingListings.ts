import { Api } from '@bookfair/common';
import { HttpException } from '../../../errors';
import { authMiddleware } from '../../../middlewares';
import { DbListing } from '../../../modules/listing';
import { ListingService } from '../../../modules/listing/ListingService';
import { TransactionService } from '../../../modules/listing/TransactionService';
import { ResultSuccess, withApiHandler, WithApiHandler } from '../../../utils';

type Data = DbListing[];
export type Transaction_GetBuyerPendingListings = Api<Data>;

const getHandler: WithApiHandler<Data> = async (req, res) => {
  const buyerId = await authMiddleware(req);
  const transactions = (
    await TransactionService.getManyByBuyer(buyerId)
  ).filter((t) => t.isPending);
  const listings = await Promise.all(
    transactions.map(async (t) => {
      const listing = await ListingService.getOne(t.listingId);
      if (!listing) throw new HttpException(404, 'Listing not found');
      return listing;
    })
  );
  return res.status(200).json(ResultSuccess(listings));
};

export default withApiHandler({ getHandler });
