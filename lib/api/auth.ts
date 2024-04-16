import {
  AuthData,
  EmailDuplicationResponseData,
  NicknameDuplicationResponseData,
  RegenerateAccessTokenResponseData,
  SessionCookiesResponseData,
  SigninResponseData,
  SignoutResposeData,
  SignupRequsetData,
  SignupResponseData,
  VerifyEmailResponseData,
} from "@/types/apiTypes";
import { AxiosResponse } from "axios";
import { compare, hash } from "bcryptjs";
import { uploadImgToFireStore } from "./firebase";
import customAxios from '../customAixos';

export async function createAccount({
  email,
  password,
  nickname,
  profileImg,
  introduce,
}: SignupRequsetData): Promise<AxiosResponse<SignupResponseData>> {
  try {
    const imgData = await uploadImgToFireStore(profileImg);

    const response = await customAxios.post("/api/auth/signup", {
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
    const response = await customAxios.post("/api/auth/sendVerifyEmail", {
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
    const response = await customAxios.post("/api/auth/verifyEmail", {
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
    const response = await customAxios.post("/api/auth/duplication/email", {
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
    const response = await customAxios.post("/api/auth/duplication/nickname", {
      nickname,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function sigin(
  email: string,
  password: string,
  isDuplicateLogin?: boolean
): Promise<AxiosResponse<SigninResponseData>> {
  try {
    const response = await customAxios.post("/api/auth/signin", {
      email,
      password,
      isDuplicateLogin,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function signout(): Promise<AxiosResponse<SignoutResposeData>> {
  try {
    const response = await customAxios("/api/auth/signout");
    return response;
  } catch(error) {
    throw error
  }
}

export async function getUser(): Promise<AuthData> {
  try {
    const response = await customAxios.get("/api/auth/user");
    return response.data.user;
  } catch (error) {
    throw error;
  }
}

export async function getSessionCookies(): Promise<
  AxiosResponse<SessionCookiesResponseData>
> {
  try {
    const response = await customAxios.get("/api/auth/session");
    return response;
  } catch (error) {
    throw error;
  }
}
export async function regenerateAccessToken(): Promise<AxiosResponse<RegenerateAccessTokenResponseData>> {
  try {
    const respose = await customAxios("/api/auth/refreshToken");
    return respose;
  } catch (error) {
    throw error;
  }
}
