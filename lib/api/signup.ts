import {
  EmailDuplicationResponseData,
  NicknameDuplicationResponseData,
  VerifyEmailResponseData,
} from "@/types/apiTypes";
import axios, { AxiosResponse } from "axios";

export async function sendToVerifyEmail(
  email: string
): Promise<AxiosResponse<VerifyEmailResponseData>> {
  try {
    const response = await axios.post("/api/auth/sendVerifyEmail", {
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
): Promise<AxiosResponse<VerifyEmailResponseData>> {
  try {
    const response = await axios.post("/api/auth/verifyEmail", {
      email,
      verifyNumber,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function checkEmailDuplication(
  email: string
): Promise<AxiosResponse<EmailDuplicationResponseData>> {
  try {
    const response = await axios.post("/api/auth/duplication/email", {
      email,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function checkNicknameDuplication(
  nickname: string
): Promise<AxiosResponse<NicknameDuplicationResponseData>> {
  try {
    const response = await axios.post("/api/auth/duplication/nickname", {
      nickname,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

