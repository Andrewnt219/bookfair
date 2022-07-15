import { Api } from '@bookfair/common';
import { z } from 'zod';
import { DbListing } from '../../../modules/listing';
import { ListingService } from '../../../modules/listing/ListingService';
import {
  compareListingDate,
  createAssertSchema,
  ResultSuccess,
  withApiHandler,
  WithApiHandler,
} from '../../../utils';

type Data = DbListing[];
export type Listing_GetAllByUserId = Api<Data, typeof querySchema>;

const querySchema = z.object({
  userId: z.string().min(1, { message: 'userId is required' }),
});

const validateQuery =
  createAssertSchema<Listing_GetAllByUserId['input']>(querySchema);

const getHandler: WithApiHandler<Data> = async (req, res) => {
  const query = validateQuery(req.query);
  const dbListings = (await ListingService.getAllByUserId(query.userId))
    .filter((listing) => listing.isActive)
    .sort(compareListingDate);
  return res.status(200).json(ResultSuccess(dbListings));
};

export default withApiHandler({ getHandler });
