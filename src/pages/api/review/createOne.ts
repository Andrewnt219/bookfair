import { Api } from '@bookfair/common';
import { nanoid } from 'nanoid';
import { DbReview, dbReviewSchema } from '../../../modules/listing';
import { ReviewService } from '../../../modules/listing/ReviewService';
import { TransactionService } from '../../../modules/listing/TransactionService';
import {
  createAssertSchema,
  ResultSuccess,
  withApiHandler,
  WithApiHandler,
} from '../../../utils';

type Data = DbReview;
export type Review_CreateOne = Api<Data, typeof requestSchema>;

const requestSchema = dbReviewSchema.pick({
  body: true,
  transactionId: true,
  title: true,
  rating: true,
});
const validateRequest =
  createAssertSchema<Review_CreateOne['input']>(requestSchema);

const postHandler: WithApiHandler<Data> = async (req, res) => {
  const body = validateRequest(req.body);
  const review: DbReview = {
    ...body,
    id: nanoid(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  await ReviewService.createOne(review);
  await TransactionService.updateOne(body.transactionId, {
    reviewId: review.id,
  });
  return res.status(201).json(ResultSuccess(review));
};

export default withApiHandler({ postHandler });
