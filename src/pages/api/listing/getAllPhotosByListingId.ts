import { TResultSuccess } from '@bookfair/common';
import { z } from 'zod';
import { authMiddleware } from '../../../middlewares';
import { DbListing, DbListingPhoto } from '../../../modules/listing';
import { ListingService } from '../../../modules/listing/ListingService';
import {
  createAssertSchema,
  ResultSuccess,
  withApiHandler,
  WithApiHandler,
} from '../../../utils';

type Data = DbListingPhoto[];
export type Listing_GetAllPhotosByListingId_Return = TResultSuccess<Data>;
export type Listing_GetAllPhotosByListingId_Query = z.infer<typeof querySchema>;

const querySchema = z.object({
  listingId: z.string().min(1, { message: 'userId is required' }),
});

const validateQuery =
  createAssertSchema<Listing_GetAllPhotosByListingId_Query>(querySchema);

const getHandler: WithApiHandler<Data> = async (req, res) => {
  const query = validateQuery(req.query);
  const dbListingPhotos = await ListingService.getPhotosByListingId(
    query.listingId
  );
  return res.status(200).json(ResultSuccess(dbListingPhotos));
};

export default withApiHandler({ getHandler });
