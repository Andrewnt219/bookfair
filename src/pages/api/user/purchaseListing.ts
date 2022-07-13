import { Api } from '@bookfair/common';
import { authMiddleware } from '../../../middlewares';
import { AuthService } from '../../../modules/auth/service';
import {
  createAssertSchema,
  HasMessage,
  priceListingSlot,
  ResultSuccess,
  WithApiHandler,
  withApiHandler,
} from '../../../utils';
import admin from 'firebase-admin';
import { PaymentService } from '../../../modules/payments/PaymentService';
import { nanoid } from 'nanoid';
import { purchaseSlotSchema } from '../../../modules/user-profile/types/purchase-slot-schema';
type Data = HasMessage;
export type User_PurchaseListing = Api<Data, typeof purchaseSlotSchema>;

const validateRequest =
  createAssertSchema<User_PurchaseListing['input']>(purchaseSlotSchema);

const postHandler: WithApiHandler<Data> = async (req, res) => {
  const userId = await authMiddleware(req);
  const body = validateRequest(req.body);

  await PaymentService.createOne({
    amount: priceListingSlot(body.quantity),
    createdAt: new Date().getTime(),
    id: nanoid(),
    type: 'listing/slot',
  });
  await AuthService.updateUser(userId, {
    listingLimit: admin.firestore.FieldValue.increment(
      body.quantity
    ) as unknown as number,
  });
  return res.status(200).json(ResultSuccess({ message: 'ok' }));
};

export default withApiHandler({ postHandler });
