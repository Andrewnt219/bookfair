import { TResultSuccess, ValidateBody } from '@bookfair/common';
import { z } from 'zod';
import { AuthService } from '../../../modules/auth/service';
import { DbUser, dbUserSchema } from '../../../modules/user-profile';
import {
  getErrorMessage,
  HasMessage,
  ResultError,
  ResultOk,
  ResultSuccess,
  withApiHandler,
  WithApiHandler,
} from '../../../utils';

type Data = HasMessage;
export type User_UpdateUser_Return = TResultSuccess<Data>;
export type User_UpdateUser_Body = { uid: string; data: Partial<DbUser> };

const validateBody: ValidateBody<User_UpdateUser_Body> = (body: unknown) => {
  const schema = z.object({
    uid: z.string(),
    data: dbUserSchema.partial(),
  });
  try {
    const result = schema.parse(body);
    return ResultSuccess(result);
  } catch (error) {
    console.error({ error });
    return ResultError('Invalid /updateUser values');
  }
};

const post: WithApiHandler<Data> = async (req, res) => {
  const bodyResult = validateBody(req.body);
  if (bodyResult.type !== 'success') {
    return res.status(400).json(bodyResult);
  }

  const { data } = bodyResult;
  try {
    await AuthService.updateUser(data.uid, data.data);
    return res.status(200).json(ResultOk());
  } catch (error) {
    console.error({ error });
    return res.status(400).json(ResultError(getErrorMessage(error)));
  }
};

export default withApiHandler({ post });
