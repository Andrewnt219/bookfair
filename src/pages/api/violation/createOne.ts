import { Api } from '@bookfair/common';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { z } from 'zod';
import { businessRules } from '../../../constants';
import { HttpException } from '../../../errors';
import { authMiddleware } from '../../../middlewares';
import { ListingService } from '../../../modules/listing/ListingService';
import { DbViolation } from '../../../modules/violations';
import { ViolationService } from '../../../modules/violations/violation-services';
import {
  createAssertSchema,
  ResultSuccess,
  WithApiHandler,
  withApiHandler,
} from '../../../utils';

type Data = { violation: DbViolation };
export type Violation_CreateOne = Api<Data, typeof requestSchema>;

const requestSchema = z.object({
  description: z.string(),
  listingId: z.string(),
  type: z.enum(businessRules.VIOLATION_TYPES),
});

const validateRequest =
  createAssertSchema<Violation_CreateOne['input']>(requestSchema);

const postHandler: WithApiHandler<Data> = async (req, res) => {
  const userId = await authMiddleware(req);
  const body = validateRequest(req.body);
  const listing = await ListingService.getOne(body.listingId);
  if (!listing) {
    throw new HttpException(404, 'Listing is not found');
  }
  if (userId === listing.id) {
    throw new HttpException(400, 'Cannot report your own listing');
  }
  const violation: DbViolation = {
    ...body,
    id: nanoid(),
    reporterId: userId,
    createdAt: dayjs().unix(),
    updatedAt: dayjs().unix(),
    result: 'pending',
  };
  await ViolationService.createOne(violation);
  return res.status(201).json(ResultSuccess({ violation }));
};

export default withApiHandler({ postHandler });
