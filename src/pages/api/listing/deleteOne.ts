import { Api } from '@bookfair/common';
import { z } from 'zod';
import { ListingService } from '../../../modules/listing/ListingService';
import {
  createAssertSchema,
  HasMessage,
  ResultSuccess,
  withApiHandler,
  WithApiHandler,
} from '../../../utils';

type Data = HasMessage;
export type Listing_DeleteOne = Api<Data, typeof bodySchema>;

const bodySchema = z.object({
  listingId: z.string().min(1, { message: 'listingId is required' }),
});
const validateBody = createAssertSchema<Listing_DeleteOne['input']>(bodySchema);

const deleteHandler: WithApiHandler<Data> = async (req, res) => {
  const body = validateBody(req.body);
  // TODO delete uploaded images
  await ListingService.deleteOne(body.listingId);
  return res.status(204).json(ResultSuccess({ message: 'ok' }));
};

export default withApiHandler({ deleteHandler });
