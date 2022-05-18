import { TResultSuccess, ValidateBody } from '@bookfair/common';
import { signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { ValidationError } from 'yup';
import { firebaseAuth } from '../../../lib/firebase';
import { signinSchema, SigninSchema } from '../../../modules/signin';
import {
  getErrorMessage,
  ResultError,
  ResultSuccess,
  withApiHandler,
  WithApiHandler,
} from '../../../utils';

type Data = UserCredential['user'];
export type User_Signin_Body = SigninSchema;
export type User_Signin_Return = TResultSuccess<Data>;

const validateBody: ValidateBody<User_Signin_Body> = async (body) => {
  try {
    const validBody = await signinSchema.validate(body);
    return ResultSuccess(validBody);
  } catch (error) {
    return ResultError((error as ValidationError).message);
  }
};

const post: WithApiHandler<Data> = async (req, res) => {
  const bodyResult = await validateBody(req.body);
  if (bodyResult.type !== 'success') {
    return res.status(422).json(bodyResult);
  }

  const { email, password } = bodyResult.data;
  try {
    const { user } = await signInWithEmailAndPassword(
      firebaseAuth,
      email,
      password
    );
    return res.status(200).json(ResultSuccess(user));
  } catch (error) {
    return res.status(400).json(ResultError(getErrorMessage(error)));
  }
};

export default withApiHandler({ post });
