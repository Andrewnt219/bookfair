import { UserRecord } from 'firebase-admin/auth';
import {
  SignupSchema,
  getSignupErrorMessage,
  signupSchema,
} from '../../../modules/auth';
import {
  withApiHandler,
  ResultSuccess,
  WithApiHandler,
  createAssertSchema,
} from '../../../utils';
import { AssertType, TResultSuccess } from '@bookfair/common';
import { AuthService } from '../../../modules/auth/service';
import { HttpException } from '../../../errors';
import { businessRules } from '../../../constants';
import dayjs from 'dayjs';

type Data = UserRecord;
export type User_CreateOne_Return = TResultSuccess<Data>;
export type User_CreateOne_Body = SignupSchema;

const validateBody = createAssertSchema<User_CreateOne_Body>(signupSchema);

const postHandler: WithApiHandler<Data> = async (req, res) => {
  const body = validateBody(req.body);
  const user = await AuthService.signupUser({
    email: body.email,
    password: body.password,
  });
  await AuthService.addUser({
    displayName: body.displayName,
    uid: user.uid,
    createdDate: dayjs().unix(),
    bio: 'Hello',
    isActive: true,
    listingLimit: businessRules.DEFAULT_MAX_LISTINGS,
    email: body.email,
    role: 'user',
    suspension: null,
  }).catch((error) => {
    throw new HttpException(422, getSignupErrorMessage(error));
  });
  return res.status(201).json(ResultSuccess(user));
};

export default withApiHandler({ postHandler });
