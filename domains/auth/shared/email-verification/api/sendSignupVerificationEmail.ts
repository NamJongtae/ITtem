import customAxios from "@/shared/common/utils/customAxios";
import { VerificationEmailResponseData } from "../types/responseTypes";
import { AxiosResponse } from "axios";

export default async function sendSignupVerificationEmail(
  email: string
): Promise<AxiosResponse<VerificationEmailResponseData>> {
  try {
    const response = await customAxios.post("/api/auth/send-signup-code", {
      email
    });
    return response;
  } catch (error) {
    throw error;
  }
}
