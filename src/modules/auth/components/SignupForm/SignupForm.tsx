import React from "react";
import { Controller } from "react-hook-form";
import { useSignupForm } from "./useSignupForm";
import { Button, Form, InputGroup, Stack } from "react-bootstrap";
import { Icon } from "@iconify/react";
import Link from "next/link";

export const SignupForm = () => {
  const { form, submitMutation, passwordInputToggle } = useSignupForm();

  const { errors } = form.formState;

  const onSubmit = form.handleSubmit((data) => {
    submitMutation.mutate(data);
  });

  console.log({ errors });

  return (
    <Form
      className="d-flex flex-column gap-2"
      noValidate
      validated={form.formState.isValid}
      onSubmit={onSubmit}
    >
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
              {...field}
            />
          )}
        />
        <Form.Control.Feedback type="invalid">
          {errors.email?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="user-dislay-name">
        <Form.Label>Display name</Form.Label>
        <Controller
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <Form.Control isInvalid={Boolean(errors.displayName)} {...field} />
          )}
        />
        <Form.Control.Feedback type="invalid">
          {errors.displayName?.message}
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
                passwordInputToggle.currentKey === "password"
                  ? "bi:eye-fill"
                  : "bi:eye-slash-fill"
              }
            />
          </Button>

          <Form.Control.Feedback type="invalid">
            {errors.password?.message}
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      <Form.Group controlId="user-retye-password">
        <Form.Label>Retype Password</Form.Label>
        <InputGroup hasValidation>
          <Controller
            control={form.control}
            name="retypePassword"
            render={({ field }) => (
              <Form.Control
                isInvalid={Boolean(errors.retypePassword)}
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
                passwordInputToggle.currentKey === "password"
                  ? "bi:eye-fill"
                  : "bi:eye-slash-fill"
              }
            />
          </Button>
          <Form.Control.Feedback type="invalid">
            {errors.retypePassword?.message}
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>

      <Stack gap={2}>
        <Button
          variant="primary"
          className="mt-3"
          type="submit"
          disabled={submitMutation.isLoading}
        >
          Signup
        </Button>

        <p className="d-flex gap-1 justify-content-center">
          Already has an account?
          <Link href="/signin">
            <a>Sign in</a>
          </Link>
        </p>
      </Stack>
    </Form>
  );
};
