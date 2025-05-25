import customAxios from "@/shared/common/utils/customAxios";
import { SigninResponseData } from "../types/responseTypes";
import { AxiosResponse } from "axios";

export default async function sigin(
  email: string,
  password: string,
  isDuplicateLogin?: boolean
): Promise<AxiosResponse<SigninResponseData>> {
  try {
    const response = await customAxios.post("/api/auth/signin", {
      email,
      password,
      isDuplicateLogin
    });
    return response;
  } catch (error) {
    throw error;
  }
}
