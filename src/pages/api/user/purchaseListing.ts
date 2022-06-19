import { Api } from '@bookfair/common';
import { z } from 'zod';
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
type Data = HasMessage;
export type User_PurchaseListing = Api<Data, typeof requestSchema>;

const requestSchema = z.object({
  quantity: z.number().min(1, { message: 'quantity must be 1 or more' }),
});
const validateRequest =
  createAssertSchema<User_PurchaseListing['input']>(requestSchema);

const postHandler: WithApiHandler<Data> = async (req, res) => {
  const userId = await authMiddleware(req);
  const body = validateRequest(req.body);

  await PaymentService.createOne({
    amount: priceListingSlot(body.quantity),
    createdAt: new Date().toISOString(),
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
