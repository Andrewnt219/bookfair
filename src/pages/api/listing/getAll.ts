import { Api } from '@bookfair/common';
import { z } from 'zod';
import { DbListing } from '../../../modules/listing';
import { ListingService } from '../../../modules/listing/ListingService';
import {
  compareListingDate,
  createAssertSchema,
  ResultSuccess,
  withApiHandler,
  WithApiHandler,
} from '../../../utils';
import { isActiveListing } from '../../../utils/filter';

type Data = DbListing[];
export type Listing_GetAll = Api<Data>;

const getHandler: WithApiHandler<Data> = async (req, res) => {
  const dbListings = (await ListingService.getAll())
    .filter(isActiveListing)
    .sort(compareListingDate);
  return res.status(200).json(ResultSuccess(dbListings));
};

export default withApiHandler({ getHandler });
