import { DbListing } from '../modules/listing';

export const isActiveListing = (listing: DbListing) => listing.isActive;
