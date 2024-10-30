"use client";

import api from "@/api";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
// import { useRefreshToken } from "./useRefreshToken";

const useApiAuth = () => {
  const { data: session } = useSession();
  // const refreshToken = useRefreshToken();

  useEffect(() => {
    const requestIntercept = api.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${session?.user?.access_token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          // await refreshToken();
          prevRequest.headers["Authorization"] = `Bearer ${session?.user?.access_token}`;
          return api(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestIntercept);
      api.interceptors.response.eject(responseIntercept);
    };
  }, [session]);

  return api;
};

export default useApiAuth;