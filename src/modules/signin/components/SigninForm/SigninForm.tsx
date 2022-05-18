import React, { useEffect } from 'react';
import { useSigninMutation } from '../../api';

export interface SigninFormProps {}
export const SigninForm = () => {
  const signinMutation = useSigninMutation();

  return (
    <button
      onClick={() =>
        signinMutation.mutate({
          email: 'phongnguyentuan20@gmail.com',
          password: 'dsadsa',
        })
      }
    >
      Sign in
    </button>
  );
};
