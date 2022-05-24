import { Controller, ControllerRenderProps } from 'react-hook-form';
import NextImage from 'next/image';
import { useUserProfileUpdateForm } from './useUserProfileUpdateForm';
import { UserProfileFormValues } from '../../types';
import { Button, Form, Ratio, Stack } from 'react-bootstrap';
export interface UserProfileUpdateFormProps {}

export const UserProfileUpdateForm = (props: UserProfileUpdateFormProps) => {
  const { form, dataUrlFileReader, submitMutation } =
    useUserProfileUpdateForm();

  const { errors } = form.formState;
  console.log({ errors });
  const onSubmit = form.handleSubmit((data) => {
    submitMutation.mutate(data.avatar);
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

        <Button className="mt-4" type="submit">
          Submit
        </Button>
      </Stack>
    </Form>
  );
};
