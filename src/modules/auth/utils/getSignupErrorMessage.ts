import { FirebaseError } from '@firebase/util';

type ErrorCode =
  | 'auth/invalid-password'
  | 'auth/email-already-exists'
  | 'auth/user-not-found'
  | 'auth/user-disabled';

export const getSignupErrorMessage = (error: FirebaseError) => {
  switch (error.code as ErrorCode) {
    case 'auth/invalid-password':
      return 'Need stronger password';

    case 'auth/email-already-exists':
      return 'Email has already been used';

    default:
      return error.code;
  }
};

export const getSigninErrorMessage = (error: FirebaseError) => {
  switch (error.code as ErrorCode) {
    case 'auth/user-not-found':
      return 'User not found';

    case 'auth/user-disabled':
      return 'Activate your account first or contact our support team';

    default:
      return error.code;
  }
};
