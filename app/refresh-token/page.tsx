"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios, { isAxiosError } from "axios";
import { BASE_URL } from "@/shared/common/constants/constant";
import Loading from "@/shared/common/components/Loading";
import { ApiResponse } from "@/shared/common/types/responseTypes";

export default function RefreshToken() {
  const searchParams = useSearchParams();
  const next =
    decodeURIComponent(searchParams.toString()).replace("next=", "") || "/";
  const router = useRouter();

  useEffect(() => {
    const fechAccessToken = async () => {
      try {
        await axios.post(`${BASE_URL}/api/auth/refresh-token`, null, {
          withCredentials: true
        });
        // SSR 재요청을 위한 서버 리다이렉트
        window.location.href = next;
      } catch (error) {
        if (isAxiosError<ApiResponse>(error)) {
          if (error.response?.status === 401) {
            router.replace("/session-expired");
          } else {
            throw error;
          }
        }
      }
    };

    fechAccessToken();
  }, [next, router]);

  return <Loading />;
}
