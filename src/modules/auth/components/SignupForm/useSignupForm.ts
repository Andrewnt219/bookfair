import { useSubmitMutation } from "./useSubmitMutation";
import { useForm } from "./useForm";
import { usePasswordInputToggle } from "../../../../utils";

export const useSignupForm = () => {
  const submitMutation = useSubmitMutation();
  const form = useForm();
  const passwordInputToggle = usePasswordInputToggle();

  return { form, submitMutation, passwordInputToggle };
};
