import { Api } from '@bookfair/common';
import dayjs from 'dayjs';
import { z } from 'zod';
import { ListingService } from '../../../modules/listing/ListingService';
import {
  createAssertSchema,
  ResultSuccess,
  withApiHandler,
  WithApiHandler,
} from '../../../utils';
import groupBy from 'lodash/groupBy';
import { adminMiddleware } from '../../../middlewares';
type Data = {
  labels: string[];
  data: number[];
};
export type Stats_GetCreatedListings = Api<Data, typeof requestSchema>;

const requestSchema = z.object({
  startDate: z
    .string()
    .refine((val) => dayjs(val).isValid(), { message: 'Invalid start date' }),
  endDate: z
    .string()
    .refine((val) => dayjs(val).isValid(), { message: 'Invalid end date' }),
});
const validateRequest =
  createAssertSchema<Stats_GetCreatedListings['input']>(requestSchema);

const postHandler: WithApiHandler<Data> = async (req, res) => {
  await adminMiddleware(req);
  const body = validateRequest(req.body);
  const listings = await ListingService.getBetweenDate(
    dayjs(body.startDate).unix(),
    dayjs(body.endDate).unix()
  );
  const groupedListings = groupBy(listings, (listing) =>
    dayjs.unix(listing.createdAt).format('MMM YYYY')
  );
  const labels = Object.keys(groupedListings);
  const data = Object.values(groupedListings).map(
    (listings) => listings.length
  );

  return res.status(200).json(
    ResultSuccess({
      data,
      labels,
    })
  );
};

export default withApiHandler({ postHandler });
