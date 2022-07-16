import { Api } from '@bookfair/common';
import dayjs from 'dayjs';
import { z } from 'zod';
import { adminMiddleware } from '../../../middlewares';
import { ListingService } from '../../../modules/listing/ListingService';
import {
  createAssertSchema,
  formatCurrency,
  ResultSuccess,
  withApiHandler,
  WithApiHandler,
} from '../../../utils';
import groupBy from 'lodash/groupBy';
import { colors } from '../../../constants';

type Data = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
  }[];
};
export type Stats_GetListingsPrice = Api<Data, typeof requestSchema>;

const bgColors = [
  colors.chart.red,
  colors.chart.green,
  colors.chart.blue,
  colors.chart.yellow,
];

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
  createAssertSchema<Stats_GetListingsPrice['input']>(requestSchema);

const getHandler: WithApiHandler<Data> = async (req, res) => {
  await adminMiddleware(req);
  const query = validateRequest(req.query);
  const listings = await ListingService.getBetweenDate(
    dayjs(query.startDate).unix(),
    dayjs(query.endDate).unix()
  );
  const groupedByPriceRangeListings = groupBy(listings, (listing) => {
    if (listing.price <= 5) {
      return `${formatCurrency(0)} - ${formatCurrency(5)}`;
    }
    if (listing.price <= 20) {
      return `${formatCurrency(5)} - ${formatCurrency(20)}`;
    }
    if (listing.price <= 50) {
      return `${formatCurrency(20)} - ${formatCurrency(50)}`;
    }
    return `${formatCurrency(50)}+`;
  });
  const labels = Object.keys(groupedByPriceRangeListings);
  const data = Object.values(groupedByPriceRangeListings).map(
    (listings) => listings.length
  );

  return res.status(200).json(
    ResultSuccess({
      labels,
      datasets: [
        {
          label: 'Price range',
          data,
          backgroundColor: bgColors,
          borderColor: bgColors,
        },
      ],
    })
  );
};

export default withApiHandler({ getHandler });
