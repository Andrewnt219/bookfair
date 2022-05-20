import { TextField, Button, Box } from '@mui/material';
import { Controller, ControllerRenderProps } from 'react-hook-form';
import NextImage from 'next/image';
import { useUserProfileUpdateForm } from './useUserProfileUpdateForm';
import { UserProfileFormValues } from '../../types';
export interface UserProfileUpdateFormProps {}

export const UserProfileUpdateForm = (props: UserProfileUpdateFormProps) => {
  const { form, dataUrlFileReader, submitMutation } =
    useUserProfileUpdateForm();

  const { errors } = form.formState;
  const displayNameHelperText = errors.displayName?.message ?? 'Display name';
  const avatarHelperText = errors.avatar?.message ?? 'Avatar';

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
            inputProps={{ accept: 'image/*' }}
            id="profile-avatar"
            error={Boolean(errors.avatar)}
            helperText={avatarHelperText}
            name={field.name}
            onBlur={field.onBlur}
            onChange={onAvatarChange(field)}
          />
        )}
      />

      {dataUrlFileReader.result && (
        <Box width={150} height={150} sx={{ position: 'relative' }}>
          <NextImage
            src={dataUrlFileReader.result.toString()}
            alt=""
            layout="fill"
          />
        </Box>
      )}
      <Button type="submit">Submit</Button>
    </form>
  );
};
