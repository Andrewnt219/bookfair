import { TResultSuccess } from '@bookfair/common';
import z from 'zod';
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
export type Listing_UpdateOne_Return = TResultSuccess<Data>;

export type Listing_UpdateOne_Body = z.infer<typeof bodySchema>;

const bodySchema = updateListingSchema.omit({ photos: true });
const validateBody = createAssertSchema<Listing_UpdateOne_Body>(bodySchema);

const patchHandler: WithApiHandler<Data> = async (req, res) => {
  const { userId, ...body } = validateBody(req.body);
  await ListingService.updateOne(userId, body);
  return res.status(201).json(ResultSuccess({ message: 'Created' }));
};

export default withApiHandler({ patchHandler });
