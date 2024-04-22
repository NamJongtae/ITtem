import {
  AuthData,
  EmailDuplicationResponseData,
  GoogleAuthAccessTokenResponseData,
  GoogleAuthInfoResponseData,
  NicknameDuplicationResponseData,
  RegenerateAccessTokenResponseData,
  SessionCookiesResponseData,
  SigninResponseData,
  SignoutResposeData,
  SignupRequsetData,
  SignupResponseData,
  SocialType,
  VerifyEmailResponseData,
} from "@/types/apiTypes";
import { AxiosResponse } from "axios";
import { compare, hash } from "bcryptjs";
import { uploadImgToFireStore } from "./firebase";
import customAxios from "../customAixos";

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
  } catch (error) {
    throw error;
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
export async function regenerateAccessToken(): Promise<
  AxiosResponse<RegenerateAccessTokenResponseData>
> {
  try {
    const respose = await customAxios("/api/auth/refreshToken");
    return respose;
  } catch (error) {
    throw error;
  }
}

export async function getGoogleAuthAccessToken(
  code: string
): Promise<AxiosResponse<GoogleAuthAccessTokenResponseData>> {
  const params = new URLSearchParams({
    code: code,
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
    client_secret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
    redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI as string,
    grant_type: "authorization_code",
  });

  try {
    const response = await customAxios.post(
      `https://oauth2.googleapis.com/token`,
      params.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getGoogleAuthInfo(
  accessToken: string
): Promise<AxiosResponse<GoogleAuthInfoResponseData>> {
  try {
    const response = await customAxios(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function googleSignin(
  code: string
): Promise<AxiosResponse<SigninResponseData>> {
  try {
    const response = await customAxios.post("/api/auth/signin/google", {
      code,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

