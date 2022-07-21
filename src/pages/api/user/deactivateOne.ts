import { Api } from '@bookfair/common';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { z } from 'zod';
import { HttpException } from '../../../errors';
import { adminMiddleware } from '../../../middlewares';
import { AuthService } from '../../../modules/auth/service';
import { EmailService } from '../../../modules/email/EmailService';
import { ListingService } from '../../../modules/listing/ListingService';
import { DbSuspension, dbSuspension } from '../../../modules/user-manage';
import {
  createAssertSchema,
  ResultSuccess,
  withApiHandler,
  WithApiHandler,
} from '../../../utils';

type Data = { suspension: DbSuspension };
export type User_DeactivateOne = Api<Data, typeof requestSchema>;

const requestSchema = dbSuspension
  .pick({
    reason: true,
  })
  .extend({
    userId: z.string(),
  });
const validateRequest =
  createAssertSchema<User_DeactivateOne['input']>(requestSchema);

const patchHandler: WithApiHandler<Data> = async (req, res) => {
  const admin = await adminMiddleware(req);
  const body = validateRequest(req.body);
  const user = await AuthService.getUser(body.userId);
  if (!user) {
    throw new HttpException(404, 'User not found');
  }
  const suspension: DbSuspension = {
    adminId: admin.uid,
    reason: body.reason,
    createdAt: dayjs().unix(),
    updatedAt: dayjs().unix(),
    id: nanoid(),
  };
  const listings = await ListingService.getManyActivated(user.uid);
  await Promise.all(
    listings.map(async (listing) => await ListingService.deleteOne(listing.id))
  );
  await AuthService.deactivateUser(user.uid, suspension);
  await EmailService.sendDeactivateEmail({ suspension, to: user.email });
  return res.status(200).json(ResultSuccess({ suspension }));
};

export default withApiHandler({ patchHandler });
