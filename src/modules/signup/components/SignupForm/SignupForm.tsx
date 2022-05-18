import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import React from 'react';
import { Controller, FieldErrors } from 'react-hook-form';
import { useSignupMutation } from '../../api';
import { useSignupForm } from './useSignupForm';
import { isNullOrUndefined } from '../../../../utils';

interface SignupFormProps {}

export const SignupForm = () => {
  const form = useSignupForm();
  const signupMutation = useSignupMutation();

  const { errors } = form.formState;

  const emailHelpText = isNullOrUndefined(errors.email)
    ? 'Email'
    : errors.email.message;
  const passwordHelpText = isNullOrUndefined(errors.password)
    ? 'Password'
    : errors.password.message;
  const retypePasswordHelpText = isNullOrUndefined(errors.retypePassword)
    ? 'Retype Password'
    : errors.retypePassword.message;
  const displayNameHelpText = isNullOrUndefined(errors.displayName)
    ? 'Display name'
    : errors.displayName.message;

  const onSubmit = form.handleSubmit((data) => {
    signupMutation.mutate(data);
  });

  return (
    <form onSubmit={onSubmit}>
      <Controller
        name="email"
        control={form.control}
        render={({ field }) => (
          <TextField
            id="user-email"
            autoComplete="email"
            label="Email"
            variant="filled"
            error={!isNullOrUndefined(errors.email)}
            helperText={emailHelpText}
            {...field}
          />
        )}
      />

      <Controller
        control={form.control}
        name="displayName"
        render={({ field }) => (
          <TextField
            error={!isNullOrUndefined(errors.displayName)}
            helperText={displayNameHelpText}
            id="user-displayName"
            label="Display name"
            variant="filled"
            {...field}
          />
        )}
      />

      <Controller
        control={form.control}
        name="password"
        render={({ field }) => (
          <TextField
            error={!isNullOrUndefined(errors.password)}
            helperText={passwordHelpText}
            id="user-password"
            type="password"
            autoComplete="new-password"
            label="Password"
            variant="filled"
            {...field}
          />
        )}
      />

      <Controller
        control={form.control}
        name="retypePassword"
        render={({ field }) => (
          <TextField
            error={!isNullOrUndefined(errors.retypePassword)}
            helperText={retypePasswordHelpText}
            id="user-retypePassword"
            type="password"
            autoComplete="new-password"
            label="Retype password"
            variant="filled"
            {...field}
          />
        )}
      />

      <LoadingButton type="submit" loading={signupMutation.isLoading}>
        Submit
      </LoadingButton>
    </form>
  );
};
