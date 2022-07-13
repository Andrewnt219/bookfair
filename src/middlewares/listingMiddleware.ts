import { HttpException } from '../errors';
import { DbListing } from '../modules/listing';
import { ListingService } from '../modules/listing/ListingService';

export const listingMiddleware = async (
  userId: string,
  listingId: string
): Promise<DbListing> => {
  const listing = await ListingService.getOne(listingId);
  if (!listing) throw new HttpException(404, 'Listing not found');
  if (listing.userId !== userId) {
    throw new HttpException(401, 'Listing does not belong to user');
  }
  return listing;
};
