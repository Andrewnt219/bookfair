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

  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
  }[];
};
export type Stats_GetCreatedListings = Api<Data, typeof requestSchema>;

const color = 'rgb(255, 99, 132)';

const requestSchema = z
  .object({
    startDate: z
      .string()
      .refine((val) => dayjs(val).isValid(), { message: 'Invalid start date' }),
    endDate: z
      .string()
      .refine((val) => dayjs(val).isValid(), { message: 'Invalid end date' }),
  })
  .refine((data) => dayjs(data.startDate).isBefore(data.endDate), {
    message: 'Start date cannot be after end date',
    path: ['startDate'],
  });
const validateRequest =
  createAssertSchema<Stats_GetCreatedListings['input']>(requestSchema);

const getHandler: WithApiHandler<Data> = async (req, res) => {
  await adminMiddleware(req);
  const query = validateRequest(req.query);
  const listings = await ListingService.getBetweenDate(
    dayjs(query.startDate).unix(),
    dayjs(query.endDate).unix()
  );
  const groupedListings = groupBy(listings, (listing) =>
    dayjs.unix(listing.createdAt).format('MM/YYYY')
  );
  const labels = Object.keys(groupedListings);
  const data = Object.values(groupedListings).map(
    (listings) => listings.length
  );
  const datasets = [
    {
      label: 'Created listings',
      data,
      backgroundColor: color,
      borderColor: color,
    },
  ];

  return res.status(200).json(
    ResultSuccess({
      labels,
      datasets,
    })
  );
};

export default withApiHandler({ getHandler });
