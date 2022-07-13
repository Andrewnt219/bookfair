import { Api } from '@bookfair/common';
import omit from 'lodash/omit';
import { authMiddleware, listingMiddleware } from '../../../middlewares';
import { dbListingSchema } from '../../../modules/listing';
import { ListingService } from '../../../modules/listing/ListingService';
import {
  createAssertSchema,
  HasMessage,
  ResultOk,
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
  const listing = await listingMiddleware(userId, body.id);
  await ListingService.updateOne(listing.id, omit(body, 'id'));
  return res.status(200).json(ResultOk());
};

export default withApiHandler({ patchHandler });
