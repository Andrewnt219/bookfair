import { TResultSuccess } from '@bookfair/common';
import { z } from 'zod';
import { authMiddleware } from '../../../middlewares';
import { DbListing } from '../../../modules/listing';
import { ListingService } from '../../../modules/listing/ListingService';
import {
  createAssertSchema,
  ResultSuccess,
  withApiHandler,
  WithApiHandler,
} from '../../../utils';

type Data = DbListing[];
export type Listing_GetAllByUser_Return = TResultSuccess<Data>;
export type Listing_GetAllByUser_Query = z.infer<typeof querySchema>;

const querySchema = z.object({
  userId: z.string().min(1, { message: 'userId is required' }),
});

const validateQuery =
  createAssertSchema<Listing_GetAllByUser_Query>(querySchema);

const getHandler: WithApiHandler<Data> = async (req, res) => {
  const query = validateQuery(req.query);
  const dbListings = await ListingService.getAllByUserId(query.userId);
  return res.status(200).json(ResultSuccess(dbListings));
};

export default withApiHandler({ getHandler });
