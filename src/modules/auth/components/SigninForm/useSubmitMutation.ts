import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { useAuthUserStore, useToastStore } from "../../../../stores";
import { AuthApi } from "../../api";

export const useSubmitMutation = () => {
  const toastStore = useToastStore();
  const authUserStore = useAuthUserStore();
  const router = useRouter();

  return useMutation({
    mutationFn: AuthApi.signin,
    onError: (error) => {
      toastStore.error(error);
    },
    onSuccess: (user) => {
      authUserStore.setAuthUser(user);
      toastStore.success("Login successfully");
      router.push("/");
    },
  });
};
