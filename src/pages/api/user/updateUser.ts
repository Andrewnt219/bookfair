import { TResultSuccess, AssertType } from '@bookfair/common';
import { z } from 'zod';
import { HttpException } from '../../../errors';
import { AuthService } from '../../../modules/auth/service';
import { dbUserSchema } from '../../../modules/user-profile';
import {
  getErrorMessage,
  HasMessage,
  ResultError,
  ResultOk,
  withApiHandler,
  WithApiHandler,
} from '../../../utils';

type Data = HasMessage;
export type User_UpdateUser_Return = TResultSuccess<Data>;
export type User_UpdateUser_Body = z.infer<typeof bodySchema>;

const bodySchema = z.object({
  uid: z.string(),
  data: dbUserSchema.partial(),
});

const validateBody: AssertType<User_UpdateUser_Body> = (body: unknown) => {
  try {
    return bodySchema.parse(body);
  } catch (error) {
    throw new HttpException(422, 'Invalid body');
  }
};

const post: WithApiHandler<Data> = async (req, res) => {
  try {
    const body = validateBody(req.body);
    await AuthService.updateUser(body.uid, body.data);
    return res.status(200).json(ResultOk());
  } catch (error) {
    console.error({ error });
    return res.status(400).json(ResultError(getErrorMessage(error)));
  }
};

export default withApiHandler({ post });
