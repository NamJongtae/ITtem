import { getGoogleUserInfo } from "@/lib/api/auth";
import { GoogleAuthInfoResponseData } from "@/types/apiTypes";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

export default function useGoogleUserInfo() {
  const { mutate: googleUserInfoMutate, data } = useMutation<
    AxiosResponse<{ user: GoogleAuthInfoResponseData }>,
    AxiosError,
    string
  >({
    mutationFn: async (code: string) => await getGoogleUserInfo(code),
  });

  return { googleUserInfoMutate, user: data?.data.user };
}
