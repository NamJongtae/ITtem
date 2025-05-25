import customAxios from "@/shared/common/utils/customAxios";
import { GoogleAuthInfoResponseData } from "@/domains/auth/signin/types/responseTypes";
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
