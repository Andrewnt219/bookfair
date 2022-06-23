import { Api } from '@bookfair/common';
import { nanoid } from 'nanoid';
import z from 'zod';
import { HttpException } from '../../../errors';
import { authMiddleware } from '../../../middlewares';
import { AuthService } from '../../../modules/auth/service';
import { DbListing, DbListingPhoto } from '../../../modules/listing';
import { ListingService } from '../../../modules/listing/ListingService';
import { createListingSchema } from '../../../modules/listing/types/create-listing-schema';
import {
  createAssertSchema,
  ResultSuccess,
  withApiHandler,
  WithApiHandler,
} from '../../../utils';

type Data = DbListing;

export type Listing_CreateOne = Api<Data, typeof bodySchema>;

const bodySchema = createListingSchema
  .omit({ photos: true })
  .merge(z.object({ photoPaths: z.string().array() }));
const validateBody = createAssertSchema<Listing_CreateOne['input']>(bodySchema);

const postHandler: WithApiHandler<Data> = async (req, res) => {
  const userId = await authMiddleware(req);
  const { photoPaths, ...body } = validateBody(req.body);

  const user = await AuthService.getUser(userId);
  if (!user) throw new HttpException(401, 'Invalid user token');
  const listings = (await ListingService.getAllByUserId(userId)).filter(
    (listing) => listing.isActive
  );
  if (listings.length === user.listingLimit) {
    throw new HttpException(422, 'Max number of listings reached');
  }

  const listingId = nanoid();
  const timestamp = new Date().toISOString();
  const photos: DbListingPhoto[] = photoPaths.map((path) => {
    return {
      createdAt: timestamp,
      id: nanoid(),
      listingId,
      mediaUrl: path,
      updatedAt: timestamp,
    };
  });
  const newListing: DbListing = {
    ...body,
    userId,
    id: listingId,
    createdAt: timestamp,
    isSold: false,
    updatedAt: timestamp,
    viewCount: 0,
    photos,
    promote: null,
    isActive: true,
  };

  await ListingService.createOne(newListing);
  return res.status(201).json(ResultSuccess(newListing));
};

export default withApiHandler({ postHandler });
