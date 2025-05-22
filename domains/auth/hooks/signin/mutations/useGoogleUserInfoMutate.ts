import getGoogleUser from "@/domains/user/api/getGoogleUser";
import { GoogleAuthInfoResponseData } from "../../../types/response-types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

export default function useGoogleUserInfo() {
  const { mutate: googleUserInfoMutate, data } = useMutation<
    AxiosResponse<{ user: GoogleAuthInfoResponseData; message: string }>,
    AxiosError,
    string
  >({
    mutationFn: async (code: string) => await getGoogleUser(code)
  });

  return { googleUserInfoMutate, user: data?.data.user };
}
