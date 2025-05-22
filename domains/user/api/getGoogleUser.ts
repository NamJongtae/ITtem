import customAxios from "@/utils/customAxios";
import { GoogleAuthInfoResponseData } from "../../auth/types/response-types";
import { AxiosResponse } from "axios";

export default async function getGoogleUser(
  code: string
): Promise<
  AxiosResponse<{ user: GoogleAuthInfoResponseData; message: string }>
> {
  try {
    const response = await customAxios.post("/api/auth/signin/google/user", {
      code
    });
    return response;
  } catch (error) {
    throw error;
  }
}
