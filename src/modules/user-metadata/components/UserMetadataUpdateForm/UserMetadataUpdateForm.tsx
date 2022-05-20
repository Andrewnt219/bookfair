import { TextField, Button, Box } from '@mui/material';
import { Controller, ControllerRenderProps } from 'react-hook-form';
import { useReadAsDataUrl } from '../../../../utils';
import { usePostAvatarMutation } from '../../api';
import { UserMetadataFormValues } from '../../types';
import { useUserMetadataUpdateForm } from './useUserMetadataUpdateForm';
import NextImage from 'next/image';
export interface UserMetadataUpdateFormProps {}

export const UserMetadataUpdateForm = (props: UserMetadataUpdateFormProps) => {
  const postAvatarMutation = usePostAvatarMutation();
  const form = useUserMetadataUpdateForm();
  const { dataUrl, setFile } = useReadAsDataUrl();

  const { errors } = form.formState;
  const displayNameHelperText = errors.displayName?.message ?? 'Display name';
  const avatarHelperText = errors.avatar?.message ?? 'Avatar';

  const onSubmit = form.handleSubmit((data) => {
    postAvatarMutation.mutate(data.avatar);
  });

  const onAvatarChange =
    (field: ControllerRenderProps<UserMetadataFormValues, 'avatar'>) =>
    (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const files = (ev.target as HTMLInputElement).files;
      field.onChange(files);
      setFile(files?.[0] ?? null);
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
