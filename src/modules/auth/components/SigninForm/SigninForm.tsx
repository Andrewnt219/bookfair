import LoadingButton from '@mui/lab/LoadingButton';
import React from 'react';
import { Controller } from 'react-hook-form';
import { useResetPasswordMutation, useSigninMutation } from '../../api';
import { useSigninForm } from './useSigninForm';
import { TextField } from '@mui/material';
import { useSnackbar } from 'notistack';

export interface SigninFormProps {}
export const SigninForm = () => {
  const { enqueueSnackbar } = useSnackbar();

  const form = useSigninForm();
  const { errors } = form.formState;
  const emailInputValue = form.watch('email');
  const emailHelperText = errors.email?.message ?? 'Email';
  const passwordHelperText = errors.password?.message ?? 'Password';

  const signinMutation = useSigninMutation();
  const onSubmit = form.handleSubmit((data) => signinMutation.mutate(data));

  const onResetPasswordSuccess = () => {
    enqueueSnackbar('Reset password sent! Check your email.', {
      variant: 'success',
    });
  };
  const resetPasswordMutation = useResetPasswordMutation({
    config: {
      onSuccess: onResetPasswordSuccess,
    },
  });
  const onResetPasswordClick = () =>
    resetPasswordMutation.mutate(emailInputValue);

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

      <LoadingButton
        loading={resetPasswordMutation.isLoading}
        onClick={onResetPasswordClick}
      >
        Reset password
      </LoadingButton>
    </form>
  );
};
