import { TextField } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';
import { usePostAvatarMutation } from '../../api';
import { useUserMetadataUpdateForm } from './useUserMetadataUpdateForm';

export interface UserMetadataUpdateFormProps {}

export const UserMetadataUpdateForm = (props: UserMetadataUpdateFormProps) => {
  const postAvatarMutation = usePostAvatarMutation();
  const form = useUserMetadataUpdateForm();
  const { errors } = form.formState;

  const displayNameHelperText = errors.displayName?.message ?? 'Display name';
  const avatarHelperText = errors.avatar?.message ?? 'Avatar';

  const onSubmit = form.handleSubmit((data) => {
    postAvatarMutation.mutate(data.avatar);
  });

  return (
    <form onSubmit={onSubmit}>
      <Controller
        control={form.control}
        name="displayName"
        render={({ field }) => (
          <TextField
            label="Display name"
            error={Boolean(errors.displayName)}
            helperText={displayNameHelperText}
            id="profile-displayName"
            type="text"
            {...field}
          />
        )}
      />

      <Controller
        control={form.control}
        name="avatar"
        render={({ field }) => (
          <TextField
            type="file"
            id="profile-avatar"
            error={Boolean(errors.avatar)}
            helperText={avatarHelperText}
            name={field.name}
            onBlur={field.onBlur}
            onChange={(ev) =>
              field.onChange((ev.target as HTMLInputElement).files)
            }
          />
        )}
      />
      <button>submit</button>
    </form>
  );
};
