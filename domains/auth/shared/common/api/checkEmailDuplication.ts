import customAxios from "@/shared/common/utils/customAxios";
import { EmailDuplicationResponseData } from "../types/responseTypes";
import { AxiosResponse } from "axios";

export default async function checkEmailDuplication(
  email: string
): Promise<AxiosResponse<EmailDuplicationResponseData>> {
  try {
    const response = await customAxios.post("/api/auth/duplication/email", {
      email
    });
    return response;
  } catch (error) {
    throw error;
  }
}
