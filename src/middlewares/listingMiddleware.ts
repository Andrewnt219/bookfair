import { HttpException } from '../errors';
import { ListingService } from '../modules/listing/ListingService';

export const listingMiddleware = async (userId: string, listingId: string) => {
  const listing = await ListingService.getOne(listingId);
  if (listing?.userId !== userId) {
    throw new HttpException(401, 'Listing does not belong to user');
  }
};
