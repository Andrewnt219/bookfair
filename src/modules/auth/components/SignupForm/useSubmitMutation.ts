import { useMutation } from "react-query";
import { useToastStore } from "../../../../stores";
import { AuthApi } from "../../api";

export const useSubmitMutation = () => {
  const toastStore = useToastStore();

  return useMutation({
    mutationFn: AuthApi.signup,
    onError: (error) => {
      toastStore.error(error);
    },
    onSuccess: () => {
      toastStore.success("Welcome to the market");
    },
  });
};
