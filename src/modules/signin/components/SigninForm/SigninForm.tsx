import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import React from 'react';
import { Controller } from 'react-hook-form';
import { useSigninMutation } from '../../api';
import { useSigninForm } from './useSigninForm';

export interface SigninFormProps {}
export const SigninForm = () => {
  const signinMutation = useSigninMutation();
  const form = useSigninForm();
  const { errors } = form.formState;

  const emailHelperText = errors.email?.message ?? 'Email';
  const passwordHelperText = errors.password?.message ?? 'Password';

  const onSubmit = form.handleSubmit((data) => signinMutation.mutate(data));

  return (
    <form onSubmit={onSubmit}>
      <Controller
        control={form.control}
        name="email"
        render={({ field }) => (
          <TextField
            type="email"
            autoComplete="username"
            error={Boolean(errors.email)}
            helperText={emailHelperText}
            label="Email"
            {...field}
          />
        )}
      />

      <Controller
        control={form.control}
        name="password"
        render={({ field }) => (
          <TextField
            type="password"
            autoComplete="password"
            error={Boolean(errors.password)}
            helperText={passwordHelperText}
            label="Password"
            {...field}
          />
        )}
      />

      <LoadingButton loading={signinMutation.isLoading} type="submit">
        Sign in
      </LoadingButton>
    </form>
  );
};
