import { Api } from '@bookfair/common';
import { z } from 'zod';
import { ListingService } from '../../../modules/listing/ListingService';
import {
  createAssertSchema,
  HasMessage,
  ResultOk,
  withApiHandler,
  WithApiHandler,
} from '../../../utils';
import admin from 'firebase-admin';

type Data = HasMessage;
export type Listing_IncreaseView = Api<Data, typeof querySchema>;

const querySchema = z.object({ listingId: z.string() });
const validateBody =
  createAssertSchema<Listing_IncreaseView['input']>(querySchema);

const patchHandler: WithApiHandler<Data> = async (req, res) => {
  const body = validateBody(req.body);
  await ListingService.updateOne(body.listingId, {
    viewCount: admin.firestore.FieldValue.increment(1) as unknown as number,
  });
  return res.status(200).json(ResultOk());
};

export default withApiHandler({ patchHandler });
