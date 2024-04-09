import axios, { AxiosResponse } from "axios";

export async function sendToVerifyEmail(
  email: string
): Promise<AxiosResponse<EmailVerifyData>> {
  try {
    const response = await axios.post("/api/signup/sendVerifyEmail", {
      email,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function verifyEmail(
  email: string,
  verifyNumber: number
): Promise<AxiosResponse<EmailVerifyData>> {
  try {
    const response = await axios.post("/api/signup/verifyEmail", {
      email,
      verifyNumber,
    });
    return response;
  } catch (error) {
    throw error;
  }
}
