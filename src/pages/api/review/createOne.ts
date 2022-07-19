import { Api } from '@bookfair/common';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { HttpException } from '../../../errors';
import { authMiddleware } from '../../../middlewares';
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
  const userId = await authMiddleware(req);
  const body = validateRequest(req.body);
  const transaction = await TransactionService.getOne(body.transactionId);
  if (!transaction) throw new HttpException(404, 'Transaction not found');
  const review: DbReview = {
    ...body,
    id: nanoid(),
    listingId: transaction.listingId,
    userId,
    createdAt: dayjs().unix(),
    updatedAt: dayjs().unix(),
    sellerId: transaction.sellerId,
  };
  await ReviewService.createOne(review);
  await TransactionService.updateOne(body.transactionId, {
    reviewId: review.id,
  });
  return res.status(201).json(ResultSuccess(review));
};

export default withApiHandler({ postHandler });
