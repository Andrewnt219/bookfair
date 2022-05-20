import { useSubmitMutation } from './useSubmitMutation';
import { useForm } from './useForm';

export const useSignupForm = () => {
  const submitMutation = useSubmitMutation();
  const form = useForm();

  return { form, submitMutation };
};
