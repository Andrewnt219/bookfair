import LoadingButton from '@mui/lab/LoadingButton';
import React from 'react';
import { Controller } from 'react-hook-form';
import { useSigninForm } from './useSigninForm';
import { TextField } from '@mui/material';
import { useSnackbar } from 'notistack';

export interface SigninFormProps {}
export const SigninForm = () => {
  const { form, onSubmit, submitMutation, resetPasswordMutation } =
    useSigninForm();

  const { errors } = form.formState;
  const emailHelperText = errors.email?.message ?? 'Email';
  const passwordHelperText = errors.password?.message ?? 'Password';

  const emailInputValue = form.watch('email');
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

      <LoadingButton loading={submitMutation.isLoading} type="submit">
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
