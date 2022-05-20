import { ControllerRenderProps } from 'react-hook-form';
import { useReadAsDataUrl } from '../../../../utils';
import { UserProfileFormValues } from '../../types';
import { useForm } from './useForm';
import { useSubmitMutation } from './useSubmitMutation';

export const useUserProfileUpdateForm = () => {
  const form = useForm();
  const submitMutation = useSubmitMutation();
  const onSubmit = form.handleSubmit((data) => {
    submitMutation.mutate(data.avatar);
  });

  const { dataUrl, setFile } = useReadAsDataUrl();
  const onAvatarChange =
    (field: ControllerRenderProps<UserProfileFormValues, 'avatar'>) =>
    (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const files = (ev.target as HTMLInputElement).files;
      field.onChange(files);
      setFile(files?.[0] ?? null);
    };

  return { onAvatarChange, onSubmit, dataUrl, form };
};
