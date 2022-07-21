import { Api } from '@bookfair/common';
import { z } from 'zod';
import { HttpException } from '../../../errors';
import { adminMiddleware } from '../../../middlewares';
import { AuthService } from '../../../modules/auth/service';
import { EmailService } from '../../../modules/email/EmailService';
import { ListingService } from '../../../modules/listing/ListingService';
import {
  createAssertSchema,
  useAdminRoute,
  withApiHandler,
  WithApiHandler,
} from '../../../utils';

type Data = undefined;
export type User_ActivateOne = Api<Data, typeof requestSchema>;

const requestSchema = z.object({
  userId: z.string(),
});
const validateRequest =
  createAssertSchema<User_ActivateOne['input']>(requestSchema);

const patchHandler: WithApiHandler<Data> = async (req, res) => {
  await adminMiddleware(req);
  const body = validateRequest(req.body);
  const user = await AuthService.getUser(body.userId);
  if (!user) {
    throw new HttpException(404, 'User not found');
  }
  const listings = await ListingService.getManyDeactivated(user.uid);
  await Promise.all(
    listings.map((listing) => ListingService.activateOne(listing.id))
  );
  await AuthService.activateUser(user.uid);
  await EmailService.sendActivateEmail({ to: user.email });
  return res.status(200).end();
};

export default withApiHandler({ patchHandler });
