import { KakaoAuthInfoResponseData } from "../../types/responseTypes";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import getKakaoUser from "@/domains/user/shared/api/getKakaoUser";

export default function useKakaoUserInfoMutate() {
  const { mutate: kakaoUserInfoMutate, data } = useMutation<
    AxiosResponse<{ user: KakaoAuthInfoResponseData; message: string }>,
    AxiosError,
    string
  >({
    mutationFn: async (code: string) => await getKakaoUser(code)
  });

  return { kakaoUserInfoMutate, user: data?.data.user };
}
