import { FirebaseError } from '@firebase/util';
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
  handleApiError,
} from '../../../utils';
import { AssertType, TResultSuccess } from '@bookfair/common';
import { AuthService } from '../../../modules/auth/service';
import { HttpException } from '../../../errors';

type Data = UserRecord;
export type User_CreateOne_Return = TResultSuccess<Data>;
export type User_CreateOne_Body = SignupSchema;

const validateBody: AssertType<User_CreateOne_Body> = (body) => {
  try {
    return signupSchema.parse(body);
  } catch (error) {
    throw new HttpException(422, 'Invalid signup values');
  }
};

const postHandler: WithApiHandler<Data> = async (req, res) => {
  try {
    const body = validateBody(req.body);
    const user = await AuthService.signupUser({
      email: body.email,
      password: body.password,
    });
    await AuthService.addUser({
      displayName: body.displayName,
      uid: user.uid,
      createdDate: new Date(user.metadata.creationTime),
      bio: 'Hello',
      rating: 0,
    });
    return res.status(201).json(ResultSuccess(user));
  } catch (error) {
    if (error instanceof FirebaseError) {
      return handleApiError(res, getSignupErrorMessage(error));
    }

    return handleApiError(res, error);
  }
};

export default withApiHandler({ postHandler });
