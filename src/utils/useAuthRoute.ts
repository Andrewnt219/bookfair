import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthUserStore } from "../stores";

export const useAuthRoute = () => {
  const authUserStore = useAuthUserStore();
  const router = useRouter();

  useEffect(() => {
    if (!authUserStore.authUser) {
      router.push("/signin");
    }
  }, [authUserStore.authUser, router]);
};
