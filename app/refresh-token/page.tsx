"use client";

import React, { useEffect } from "react";
import Loading from "../loading";
import { useRouter, useSearchParams } from "next/navigation";
import axios, { isAxiosError } from "axios";
import { BASE_URL } from "@/constants/constant";
import { RegenerateAccessTokenResponseData } from "@/types/api-types";

export default function RefreshToken() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/";
  const router = useRouter();

  useEffect(() => {
    const fechAccessToken = async () => {
      try {
        await axios.post(`${BASE_URL}/api/auth/refresh-token`, {
          withCredentials: true
        });
        // SSR 재요청을 위한 서버 리다이렉트
        window.location.href = next;
      } catch (error) {
        if (isAxiosError<RegenerateAccessTokenResponseData>(error)) {
          if (error.response?.status === 401) {
            router.replace("/session-expired");
          } else {
            throw error;
          }
        }
      }
    };

    fechAccessToken();
  }, []);

  return <Loading />;
}
