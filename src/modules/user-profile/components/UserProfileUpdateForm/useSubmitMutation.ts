import { useMutation } from "react-query";
import { useToastStore } from "../../../../stores";
import { UserProfileApi } from "../../api";

export const useSubmitMutation = () => {
  const toastStore = useToastStore();

  return useMutation({
    mutationFn: UserProfileApi.postAvatar,
    onSuccess: () => {
      toastStore.success("Profile is updated successfully");
    },
    onError: (error) => {
      toastStore.error(error);
    },
  });
};
