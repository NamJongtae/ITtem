import { getKakaoUserInfo } from "@/lib/api/auth";
import { KakaoAuthInfoResponseData } from "@/types/api-types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

export default function useKakaoUserInfoMutate() {
  const { mutate: kakaoUserInfoMutate, data } = useMutation<
    AxiosResponse<{ user: KakaoAuthInfoResponseData; message: string }>,
    AxiosError,
    string
  >({
    mutationFn: async (code: string) => await getKakaoUserInfo(code),
  });

  return { kakaoUserInfoMutate, user: data?.data.user };
}
