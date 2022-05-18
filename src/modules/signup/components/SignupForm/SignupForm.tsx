import { ErrorMessage } from '@hookform/error-message';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import React from 'react';
import { Controller } from 'react-hook-form';
import { useSignupMutation } from '../../api';
import { SignupSchema } from '../../types';
import { useSignupForm } from './useSignupForm';

interface SignupFormProps {}

export const SignupForm = () => {
  const form = useSignupForm();
  const signupMutation = useSignupMutation();

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
            {...field}
          />
        )}
      />
      <ErrorMessage errors={form.formState.errors} name="email" />

      <Controller
        control={form.control}
        name="password"
        render={({ field }) => (
          <TextField
            id="user-password"
            type="password"
            autoComplete="new-password"
            label="Password"
            variant="filled"
            {...field}
          />
        )}
      />
      <ErrorMessage errors={form.formState.errors} name="password" />

      <Controller
        control={form.control}
        name="confirm"
        render={({ field }) => (
          <TextField
            id="user-password-confirm"
            type="password"
            autoComplete="new-password"
            label="Confirm password"
            variant="filled"
            {...field}
          />
        )}
      />
      <ErrorMessage errors={form.formState.errors} name="confirm" />

      <Button type="submit">Submit</Button>
    </form>
  );
};
