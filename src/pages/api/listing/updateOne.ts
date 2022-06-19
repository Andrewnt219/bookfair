import { Api } from '@bookfair/common';
import omit from 'lodash/omit';
import { authMiddleware } from '../../../middlewares';
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

const bodySchema = updateListingSchema.omit({ photos: true });
const validateBody = createAssertSchema<Listing_UpdateOne['input']>(bodySchema);

const patchHandler: WithApiHandler<Data> = async (req, res) => {
  await authMiddleware(req);
  const body = validateBody(req.body);
  await ListingService.updateOne(body.listingId, omit(body, 'listingId'));
  return res.status(201).json(ResultSuccess({ message: 'Created' }));
};

export default withApiHandler({ patchHandler });
