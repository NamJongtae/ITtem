import { AxiosResponse } from "axios";
import { EmailVerificationType } from "../../types/auth-types";
import { VerificationEmailResponseData } from "../../types/response-types";
import customAxios from "@/utils/customAxios";

export default async function verificationEmail(
  email: string,
  verificationCode: string,
  type: EmailVerificationType
): Promise<AxiosResponse<VerificationEmailResponseData>> {
  try {
    const response = await customAxios.post("/api/auth/verification-email", {
      email,
      verificationCode,
      type
    });
    return response;
  } catch (error) {
    throw error;
  }
}
