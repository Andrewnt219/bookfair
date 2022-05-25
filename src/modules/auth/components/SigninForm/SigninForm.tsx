import React from 'react';
import { Controller } from 'react-hook-form';
import { useSigninForm } from './useSigninForm';
import { Button, Form, InputGroup, Stack } from 'react-bootstrap';
import { Icon } from '@iconify/react';
import Link from 'next/link';

export interface SigninFormProps {}
export const SigninForm = () => {
  const { form, submitMutation, resetPasswordMutation, passwordInputToggle } =
    useSigninForm();

  const { errors } = form.formState;

  const emailInputValue = form.watch('email');
  const onResetPasswordClick = () =>
    resetPasswordMutation.mutate(emailInputValue);

  const onSubmit = form.handleSubmit((data) => submitMutation.mutate(data));

  return (
    <Form noValidate validated={form.formState.isValid} onSubmit={onSubmit}>
      <Stack gap={2}>
        <Form.Group controlId="user-email">
          <Form.Label>Email</Form.Label>
          <Controller
            control={form.control}
            name="email"
            render={({ field }) => (
              <Form.Control
                type="email"
                autoComplete="username"
                isInvalid={Boolean(errors.email)}
                placeholder="Username"
                {...field}
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="user-password">
          <Form.Label>Password</Form.Label>
          <InputGroup hasValidation>
            <Controller
              control={form.control}
              name="password"
              render={({ field }) => (
                <Form.Control
                  isInvalid={Boolean(errors.password)}
                  type={passwordInputToggle.currentKey}
                  autoComplete="new-password"
                  {...field}
                />
              )}
            />

            <Button
              variant="outline-secondary"
              onClick={passwordInputToggle.toggle}
            >
              <Icon
                icon={
                  passwordInputToggle.currentKey === 'password'
                    ? 'bi:eye-fill'
                    : 'bi:eye-slash-fill'
                }
              />
            </Button>

            <Form.Control.Feedback type="invalid">
              {errors.password?.message}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>{' '}
      </Stack>

      <Stack className="mt-4" gap={1}>
        <Button type="submit" disabled={submitMutation.isLoading}>
          Submit
        </Button>

        <a href="#" className="text-center" onClick={onResetPasswordClick}>
          Forgot password
        </a>
      </Stack>

      <p className="mt-3 d-flex gap-1 justify-content-center">
        New to the market?
        <Link href="/signup">
          <a>Sign up</a>
        </Link>
      </p>
    </Form>
  );
};
