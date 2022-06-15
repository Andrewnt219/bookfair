import { TResultSuccess } from '@bookfair/common';
import { z } from 'zod';
import { HttpException } from '../../../errors';
import { authMiddleware } from '../../../middlewares';
import { DbListing } from '../../../modules/listing';
import { ListingService } from '../../../modules/listing/ListingService';
import {
  createAssertSchema,
  ResultSuccess,
  withApiHandler,
  WithApiHandler,
} from '../../../utils';

type Data = DbListing;
export type Listing_GetOne_Return = TResultSuccess<Data>;
export type Listing_GetOne_Query = z.infer<typeof querySchema>;

const querySchema = z.object({
  listingId: z.string(),
});

const validateQuery = createAssertSchema<Listing_GetOne_Query>(querySchema);

const getHandler: WithApiHandler<Data> = async (req, res) => {
  await authMiddleware(req);
  const query = validateQuery(req.query);
  const dbListing = await ListingService.getOne(query.listingId);
  if (!dbListing) throw new HttpException(404, 'Listing not found');
  return res.status(200).json(ResultSuccess(dbListing));
};

export default withApiHandler({ getHandler });
