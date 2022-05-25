import Axios, { AxiosRequestConfig } from "axios";
import { firebaseAuth } from "../firebase";

export const axios = Axios.create({
  baseURL: "/api",
});

async function authRequestInterceptor(config: AxiosRequestConfig) {
  const { currentUser } = firebaseAuth;

  if (currentUser) {
    const idToken = await currentUser.getIdToken();

    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${idToken}`,
    };
  }

  return config;
}

axios.interceptors.request.use(authRequestInterceptor);
