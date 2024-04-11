import {
  EmailDuplicationResponseData,
  NicknameDuplicationResponseData,
  SignupRequsetData,
  SignupResponseData,
  VerifyEmailResponseData,
} from "@/types/apiTypes";
import axios, { AxiosResponse } from "axios";
import { compare, hash } from "bcryptjs";
import { uploadImgToFireStore } from "./firebase";

export async function createAccount({
  email,
  password,
  nickname,
  profileImg,
  introduce,
}: SignupRequsetData): Promise<AxiosResponse<SignupResponseData>> {
  try {
    const imgData = await uploadImgToFireStore(profileImg);

    const response = await axios.post("/api/auth/signup", {
      email,
      password,
      nickname,
      profileImg: imgData || "/icons/user_icon.svg",
      introduce,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getHasdPassword(password: string) {
  try {
    const hashedPassword = await hash(password, 12);
    return hashedPassword;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function verifyPassword(password: string, hashedPassword: string) {
  try {
    const isVerify = await compare(password, hashedPassword);
    return isVerify;
  } catch (error) {
    throw error;
  }
}

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
  verifyCode: string
): Promise<AxiosResponse<VerifyEmailResponseData>> {
  try {
    const response = await axios.post("/api/auth/verifyEmail", {
      email,
      verifyCode,
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
