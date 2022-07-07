import { Api } from '@bookfair/common';
import { nanoid } from 'nanoid';
import { z } from 'zod';
import { HttpException } from '../../../errors';
import { authMiddleware } from '../../../middlewares';
import { AuthService } from '../../../modules/auth/service';
import { EmailService } from '../../../modules/email/EmailService';
import { DbTransaction } from '../../../modules/listing';
import { ListingService } from '../../../modules/listing/ListingService';
import { TransactionService } from '../../../modules/listing/TransactionService';
import {
  createAssertSchema,
  ResultSuccess,
  withApiHandler,
  WithApiHandler,
} from '../../../utils';

type Data = DbTransaction;
export type Listing_Contact = Api<Data, typeof requestSchema>;

const requestSchema = z.object({
  listingId: z.string().min(1),
});
const validateRequest =
  createAssertSchema<Listing_Contact['input']>(requestSchema);

const postHandler: WithApiHandler<Data> = async (req, res) => {
  const buyerId = await authMiddleware(req);
  const body = validateRequest(req.body);

  const listing = await ListingService.getOne(body.listingId);
  if (!listing) throw new HttpException(404, 'Listing not found');
  if (buyerId === listing.userId)
    throw new HttpException(400, 'You cannot contact yourself');
  if (await TransactionService.isBuyerExist(listing.id, buyerId))
    throw new HttpException(
      400,
      'You have already made a contact for this listing'
    );

  const buyer = await AuthService.getUser(buyerId);
  const seller = await AuthService.getUser(listing.userId);

  if (!buyer || !seller) throw new HttpException(404, 'User not found');
  await EmailService.sendContactMail({
    buyer,
    to: seller.email,
    listing,
  });
  const transaction: DbTransaction = {
    id: nanoid(),
    buyerId,
    sellerId: listing.userId,
    listingId: listing.id,
    createdAt: new Date().toISOString(),
    isPending: true,
  };
  await TransactionService.createOne(transaction);
  return res.status(201).json(ResultSuccess(transaction));
};

export default withApiHandler({ postHandler });
