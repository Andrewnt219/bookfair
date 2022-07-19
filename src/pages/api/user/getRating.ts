import { Api } from '@bookfair/common';
import { z } from 'zod';
import { authMiddleware } from '../../../middlewares';
import { ReviewService } from '../../../modules/listing/ReviewService';
import {
  createAssertSchema,
  ResultSuccess,
  withApiHandler,
  WithApiHandler,
} from '../../../utils';

type Data = { rating: number };
export type User_GetRating = Api<Data, typeof requestSchema>;

const requestSchema = z.object({
  userId: z.string(),
});
const validateRequest =
  createAssertSchema<User_GetRating['input']>(requestSchema);

const getHandler: WithApiHandler<Data> = async (req, res) => {
  const query = validateRequest(req.query);
  const reviews = await ReviewService.getBySellerId(query.userId);
  const rating =
    reviews.reduce((rating, review) => rating + review.rating, 0) /
    reviews.length;
  return res.status(200).json(ResultSuccess({ rating }));
};

export default withApiHandler({ getHandler });
