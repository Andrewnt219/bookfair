import { TResultSuccess } from '@bookfair/common';
import { authMiddleware } from '../../../middlewares';
import { DbListing } from '../../../modules/listing';
import { ListingService } from '../../../modules/listing/ListingService';
import { ResultSuccess, withApiHandler, WithApiHandler } from '../../../utils';

type Data = DbListing[];
export type Listing_GetAllByUser_Return = TResultSuccess<Data>;

const getHandler: WithApiHandler<Data> = async (req, res) => {
  const userId = await authMiddleware(req);
  const dbListings = await ListingService.getAllByUserId(userId);
  return res.status(200).json(ResultSuccess(dbListings));
};

export default withApiHandler({ getHandler });
