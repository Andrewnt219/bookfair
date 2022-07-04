import { Api } from '@bookfair/common';
import omit from 'lodash/omit';
import { authMiddleware, listingMiddleware } from '../../../middlewares';
import { dbListingSchema } from '../../../modules/listing';
import { ListingService } from '../../../modules/listing/ListingService';
import { updateListingSchema } from '../../../modules/listing/types/update-listing-schema';
import {
  createAssertSchema,
  HasMessage,
  ResultSuccess,
  withApiHandler,
  WithApiHandler,
} from '../../../utils';

type Data = HasMessage;
export type Listing_UpdateOne = Api<Data, typeof bodySchema>;

const bodySchema = dbListingSchema
  .pick({
    isSold: true,
    description: true,
    price: true,
    title: true,
    viewCount: true,
    id: true,
    course: true,
    tags: true,
  })
  .partial({
    isSold: true,
    description: true,
    price: true,
    title: true,
    viewCount: true,
    course: true,
    tags: true,
  });
const validateBody = createAssertSchema<Listing_UpdateOne['input']>(bodySchema);

const patchHandler: WithApiHandler<Data> = async (req, res) => {
  const userId = await authMiddleware(req);
  const body = validateBody(req.body);
  await listingMiddleware(userId, body.id);
  await ListingService.updateOne(body.id, omit(body, 'id'));
  return res.status(201).json(ResultSuccess({ message: 'Created' }));
};

export default withApiHandler({ patchHandler });
