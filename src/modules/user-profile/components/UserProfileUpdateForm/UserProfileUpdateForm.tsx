import { TextField, Button, Box } from '@mui/material';
import { Controller } from 'react-hook-form';
import NextImage from 'next/image';
import { useUserProfileUpdateForm } from './useUserProfileUpdateForm';
export interface UserProfileUpdateFormProps {}

export const UserProfileUpdateForm = (props: UserProfileUpdateFormProps) => {
  const { form, onSubmit, dataUrl, onAvatarChange } =
    useUserProfileUpdateForm();

  const { errors } = form.formState;
  const displayNameHelperText = errors.displayName?.message ?? 'Display name';
  const avatarHelperText = errors.avatar?.message ?? 'Avatar';

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

      {dataUrl && (
        <Box width={150} height={150} sx={{ position: 'relative' }}>
          <NextImage src={dataUrl.toString()} alt="" layout="fill" />
        </Box>
      )}
      <Button type="submit">Submit</Button>
    </form>
  );
};
