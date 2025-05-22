import customAxios from "@/utils/customAxios";
import { VerificationEmailResponseData } from "../../types/response-types";
import { AxiosResponse } from "axios";

export default async function sendResetPwVerificationEmail(
  email: string
): Promise<AxiosResponse<VerificationEmailResponseData>> {
  try {
    const response = await customAxios.post("/api/auth/send-resetpw-code", {
      email
    });
    return response;
  } catch (error) {
    throw error;
  }
}
