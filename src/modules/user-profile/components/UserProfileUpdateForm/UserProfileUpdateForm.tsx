import { Controller, ControllerRenderProps } from 'react-hook-form';
import NextImage from 'next/image';
import { useUserProfileUpdateForm } from './useUserProfileUpdateForm';
import { UserProfileFormValues } from '../../types';
import { Button, Form, Stack } from 'react-bootstrap';

export const UserProfileUpdateForm = () => {
  const { form, dataUrlFileReader, submitMutation } =
    useUserProfileUpdateForm();

  const { errors } = form.formState;
  const onSubmit = form.handleSubmit((data) => {
    submitMutation.mutate(data);
  });

  const onAvatarChange =
    (field: ControllerRenderProps<UserProfileFormValues, 'avatar'>) =>
    (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const files = (ev.target as HTMLInputElement).files;
      field.onChange(files);
      dataUrlFileReader.setFile(files?.[0] ?? null);
    };

  return (
    <Form noValidate validated={form.formState.isValid} onSubmit={onSubmit}>
      <Stack gap={2}>
        <Form.Group controlId="profile-displayName">
          <Form.Label>Display name</Form.Label>
          <Controller
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <Form.Control
                isInvalid={Boolean(errors.displayName)}
                type="text"
                {...field}
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.displayName?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="profile-bio">
          <Form.Label>Bio</Form.Label>
          <Controller
            control={form.control}
            name="bio"
            render={({ field }) => (
              <Form.Control
                isInvalid={Boolean(errors.bio)}
                type="text"
                as="textarea"
                {...field}
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.bio?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="profile-avatar">
          <Form.Label>Upload avatar</Form.Label>
          <Controller
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <Form.Control
                type="file"
                accept="image/*"
                isInvalid={Boolean(errors.avatar)}
                name={field.name}
                onBlur={field.onBlur}
                ref={field.ref}
                onChange={onAvatarChange(field)}
              />
            )}
          />
          <Form.Control.Feedback type="invalid">
            {errors.avatar?.message}
          </Form.Control.Feedback>
        </Form.Group>

        {dataUrlFileReader.result && (
          <div className="bg-light rounded">
            <NextImage
              src={dataUrlFileReader.result.toString()}
              alt=""
              width={300}
              height={300}
              layout="responsive"
              className="rounded-circle"
            />
          </div>
        )}

        <Button
          className="mt-4"
          type="submit"
          disabled={submitMutation.isLoading}
        >
          Submit
        </Button>
      </Stack>
    </Form>
  );
};
