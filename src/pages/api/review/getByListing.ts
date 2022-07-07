import { Api } from '@bookfair/common';
import { z } from 'zod';
import { HttpException } from '../../../errors';
import { DbReview } from '../../../modules/listing';
import { ReviewService } from '../../../modules/listing/ReviewService';
import {
  createAssertSchema,
  ResultSuccess,
  withApiHandler,
  WithApiHandler,
} from '../../../utils';

type Data = DbReview;
export type Review_GetByListing = Api<Data, typeof requestSchema>;

const requestSchema = z.object({
  listingId: z.string(),
});
const validateRequest =
  createAssertSchema<Review_GetByListing['input']>(requestSchema);

const getHandler: WithApiHandler<Data> = async (req, res) => {
  const query = validateRequest(req.query);
  const review = await ReviewService.getByListing(query.listingId);
  if (!review) throw new HttpException(404, 'Review not found');
  return res.status(200).json(ResultSuccess(review));
};

export default withApiHandler({ getHandler });
