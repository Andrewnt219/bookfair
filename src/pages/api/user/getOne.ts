import { AssertType, TResultSuccess } from '@bookfair/common';
import { z } from 'zod';
import { HttpException } from '../../../errors';
import { AuthService } from '../../../modules/auth/service';
import { DbUser } from '../../../modules/user-profile';
import {
  getErrorMessage,
  ResultSuccess,
  withApiHandler,
  WithApiHandler,
} from '../../../utils';

type Data = DbUser | null;
export type User_GetOne_Return = TResultSuccess<Data>;
export type User_GetOne_Query = z.infer<typeof querySchema>;

const querySchema = z.object({
  userId: z.string().min(1, { message: 'Missing userId' }),
});

const validateQuery: AssertType<User_GetOne_Query> = (query: unknown) => {
  try {
    return querySchema.parse(query);
  } catch (error) {
    throw new HttpException(422, getErrorMessage(error));
  }
};

const getHandler: WithApiHandler<Data> = async (req, res) => {
  const query = validateQuery(req.query);
  const user = await AuthService.getUser(query.userId);
  if (!user) throw new HttpException(404, 'User not found');
  return res.status(200).json(ResultSuccess(user));
};

export default withApiHandler({ getHandler });
