"use client";

import api from "@/api";
import { signIn, useSession } from "next-auth/react";

export const useRefreshToken = () => {
  const { data: session } = useSession();

  const refreshToken = async () => {
    const res = await api.post("/auth/refresh", {
      refresh: session?.user.refreshToken,
    });

    if (session) session.user.accessToken = res.data.accessToken;
    else signIn();
  };
  return refreshToken;
};