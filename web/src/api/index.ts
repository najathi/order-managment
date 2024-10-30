import axios, { type AxiosInstance } from 'axios';
// import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';

import { __APP_API_URL__ } from '@/lib/constants';

const ApiClient = () => {
  const defaultOptions = {
    baseURL: __APP_API_URL__,
    headers: { "Content-Type": "application/json" }
  };

  const instance: AxiosInstance = axios.create(defaultOptions);

  instance.interceptors.request.use(
    async (config) => {
      const session = await getSession();
      if (session && !config.headers["Authorization"]) {
        config.headers.Authorization = `Bearer ${session?.user?.access_token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const session = await getSession();
      const prevRequest = error?.config;
      if (error?.response?.status === 401 && !prevRequest?.sent) {
        prevRequest.sent = true;
        // await refreshToken(instance, session);
        prevRequest.headers["Authorization"] = `Bearer ${session?.user?.access_token}`;
        return instance(prevRequest);
      }
      return Promise.reject(error);
    }
  );

  instance.post

  return instance;
};

// const refreshToken = async (instance: AxiosInstance, session: Session | null) => {
//   const res = await instance.post("/auth/refresh", {
//     refresh: session?.user.refreshToken,
//   });

//   if (session) session.user.accessToken = res.data.accessToken;
// }

export default ApiClient();