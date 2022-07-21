import { Api } from '@bookfair/common';
import { adminMiddleware } from '../../../middlewares';
import { dbViolationSchema } from '../../../modules/violations';
import { ListingService } from '../../../modules/listing/ListingService';
import { ViolationService } from '../../../modules/violations/violation-services';
import {
  createAssertSchema,
  WithApiHandler,
  withApiHandler,
} from '../../../utils';
import { EmailService } from '../../../modules/email/EmailService';
import { HttpException } from '../../../errors';
import { AuthService } from '../../../modules/auth/service';

type Data = undefined;
export type Violation_ResolveOne = Api<Data, typeof requestSchema>;

const requestSchema = dbViolationSchema.pick({
  id: true,
  result: true,
  listingId: true,
});
const validateRequest =
  createAssertSchema<Violation_ResolveOne['input']>(requestSchema);

const patchHandler: WithApiHandler<Data> = async (req, res) => {
  const admin = await adminMiddleware(req);
  const body = validateRequest(req.body);

  const violation = await ViolationService.getOne(body.id);

  if (!violation) {
    throw new HttpException(404, 'Violation not found');
  }
  if (violation.result !== 'pending' && admin.uid !== violation.adminId) {
    throw new HttpException(
      400,
      'Resolved violation can only be changed by the same admin'
    );
  }
  const listing = await ListingService.getOne(violation.listingId);
  if (!listing) {
    throw new HttpException(404, 'Listing not found');
  }
  const relatedViolations = await ViolationService.getManyByListingId(
    listing.id
  );
  const seller = await AuthService.getUser(listing.userId);
  if (!seller) {
    throw new HttpException(404, 'Seller not found');
  }

  if (body.result === 'accepted') {
    await ListingService.deleteOne(body.listingId);
    await EmailService.sendRemoveListingMail({
      listing,
      to: seller.email,
      violation,
    });
    await Promise.all(
      relatedViolations.map((violation) =>
        ViolationService.resolveOne({
          id: violation.id,
          result: 'accepted',
          adminId: admin.uid,
        })
      )
    );
  }
  await ViolationService.resolveOne({
    ...body,
    adminId: admin.uid,
  });
  return res.status(204).end();
};

export default withApiHandler({ patchHandler });
