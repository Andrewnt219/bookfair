import { TResultSuccess } from '@bookfair/common';
import { nanoid } from 'nanoid';
import z from 'zod';
import { ListingService } from '../../../modules/listing/ListingService';
import { createListingSchema } from '../../../modules/listing/types/create-listing-schema';
import {
  createAssertSchema,
  HasMessage,
  ResultSuccess,
  withApiHandler,
  WithApiHandler,
} from '../../../utils';

type Data = HasMessage;
export type Listing_CreateOne_Return = TResultSuccess<Data>;

export type Listing_CreateOne_Body = z.infer<typeof bodySchema>;

const bodySchema = createListingSchema.omit({ photos: true });
const validateBody = createAssertSchema<Listing_CreateOne_Body>(bodySchema);

const postHandler: WithApiHandler<Data> = async (req, res) => {
  const body = validateBody(req.body);
  await ListingService.createOne({
    ...body,
    id: nanoid(),
    createdAt: new Date().toISOString(),
    isSold: false,
    updatedAt: new Date().toISOString(),
    viewCount: 0,
  });
  return res.status(201).json(ResultSuccess({ message: 'Created' }));
};

export default withApiHandler({ postHandler });
