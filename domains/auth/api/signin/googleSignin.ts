import customAxios from "@/utils/customAxios";
import {
  GoogleAuthInfoResponseData,
  SigninResponseData
} from "../../types/response-types";
import { AxiosResponse } from "axios";

export default async function googleSignin(
  user: GoogleAuthInfoResponseData
): Promise<AxiosResponse<SigninResponseData>> {
  try {
    const response = await customAxios.post("/api/auth/signin/google", {
      user
    });
    return response;
  } catch (error) {
    throw error;
  }
}
