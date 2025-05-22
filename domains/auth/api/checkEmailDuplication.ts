import customAxios from "@/utils/customAxios";
import { EmailDuplicationResponseData } from "../types/response-types";
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
