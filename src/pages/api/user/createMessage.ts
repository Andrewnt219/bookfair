import { Api } from '@bookfair/common';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { z } from 'zod';
import { businessRules } from '../../../constants';
import { authMiddleware } from '../../../middlewares';
import { AuthService } from '../../../modules/auth/service';
import { EmailService } from '../../../modules/email/EmailService';
import { DbMessage } from '../../../modules/user-profile';
import { MessageService } from '../../../modules/user-profile/MessageService';
import {
  createAssertSchema,
  ResultSuccess,
  withApiHandler,
  WithApiHandler,
} from '../../../utils';

type Data = DbMessage;
export type User_CreateMessage = Api<Data, typeof requestSchema>;

const requestSchema = z.object({
  text: z.string(),
  receiverId: z.string(),
});
const validateRequest =
  createAssertSchema<User_CreateMessage['input']>(requestSchema);

const postHandler: WithApiHandler<Data> = async (req, res) => {
  const senderId = await authMiddleware(req);
  const body = validateRequest(req.body);
  if (body.receiverId === senderId)
    throw new Error('You cannot send message to yourself');

  const receiver = await AuthService.getUser(body.receiverId);
  const sender = await AuthService.getUser(senderId);
  if (!receiver) throw new Error('Receiver not found');
  if (!sender) throw new Error('Sender not found');
  if (!(await MessageService.canSendMessage(sender.uid, receiver.uid)))
    throw new Error(
      `You can send message only once in ${businessRules.MESSAGE_PERIOD_DAY} days`
    );

  await EmailService.forwardUserMessage({
    message: body.text,
    sender,
    receiver,
  });
  const message: DbMessage = {
    createdAt: dayjs().unix(),
    updatedAt: dayjs().unix(),
    id: nanoid(),
    message: body.text,
    senderId: sender.uid,
    receiverId: receiver.uid,
  };
  await MessageService.createOne(message);
  return res.status(200).json(ResultSuccess(message));
};

export default withApiHandler({ postHandler });
