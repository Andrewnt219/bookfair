import { useForm } from "./useForm";
import { useResetPasswordMutation } from "./useResetPasswordMutation";
import { useSubmitMutation } from "./useSubmitMutation";
import { usePasswordInputToggle } from "../../../../utils";
export const useSigninForm = () => {
  const form = useForm();
  const submitMutation = useSubmitMutation();
  const resetPasswordMutation = useResetPasswordMutation();
  const passwordInputToggle = usePasswordInputToggle();

  return {
    form,
    submitMutation,
    resetPasswordMutation,
    passwordInputToggle,
  };
};
