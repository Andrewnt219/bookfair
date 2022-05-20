import { useForm } from './useForm';
import { useResetPasswordMutation } from './useResetPasswordMutation';
import { useSubmitMutation } from './useSubmitMutation';
export const useSigninForm = () => {
  const form = useForm();
  const submitMutation = useSubmitMutation();
  const resetPasswordMutation = useResetPasswordMutation();
  const onSubmit = form.handleSubmit((data) => submitMutation.mutate(data));

  return {
    form,
    onSubmit,
    submitMutation,
    resetPasswordMutation,
  };
};
