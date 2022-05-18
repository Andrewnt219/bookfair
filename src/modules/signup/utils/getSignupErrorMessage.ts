import { FirebaseError } from '@firebase/util';

type ErrorCode = 'auth/weak-password' | 'auth/email-already-in-use';

export const getSignupErrorMessage = (error: FirebaseError) => {
  switch (error.code as ErrorCode) {
    case 'auth/weak-password':
      return 'Need stronger password';

    case 'auth/email-already-in-use':
      return 'Email has already been used';

    default:
      return 'Something went wrong';
  }
};
