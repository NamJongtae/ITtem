import {
  EmailDuplicationResponseData,
  GoogleAuthAccessTokenResponseData,
  GoogleAuthInfoResponseData,
  KaKaoAuthAccessTokenResponseData,
  KakaoAuthInfoResponseData,
  NicknameDuplicationResponseData,
  RegenerateAccessTokenResponseData,
  SessionCookiesResponseData,
  SigninResponseData,
  SignoutResposeData,
  SignupResponseData,
  VerifyEmailResponseData,
} from "@/types/apiTypes";
import { AxiosResponse } from "axios";
import { uploadImgToFireStore } from "./firebase";
import customAxios from "../customAxios";
import { AuthData, SignupData } from "@/types/authTypes";
import { toast } from "react-toastify";

export async function createAccount({
  email,
  password,
  nickname,
  profileImgFile,
  introduce,
}: SignupData): Promise<AxiosResponse<SignupResponseData>> {
  let imgData;
  try {
    imgData = await uploadImgToFireStore(profileImgFile);
  } catch (error) {
    if (error instanceof Error) {
      toast.warn(error.message);
    }
  }
  try {
    const response = await customAxios.post("/api/auth/signup", {
      email,
      password,
      nickname,
      profileImgData: imgData || { url: "/icons/user_icon.svg", name: "" },
      introduce,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getHasdPassword(password: string) {
  try {
    const { hash } = await import("bcryptjs");

    const hashedPassword = await hash(password, 12);
    return hashedPassword;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function verifyPassword(password: string, hashedPassword: string) {
  try {
    const { compare } = await import("bcryptjs");

    const isVerify = await compare(password, hashedPassword);
    return isVerify;
  } catch (error) {
    throw error;
  }
}

export async function sendToVerifyEmail(
  email: string,
  isFindPw?: boolean
): Promise<AxiosResponse<VerifyEmailResponseData>> {
  try {
    const response = await customAxios.post("/api/auth/sendVerifyEmail", {
      email,
      isFindPw,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function verifyEmail(
  email: string,
  verifyCode: string,
  isFindPw?: boolean
): Promise<AxiosResponse<VerifyEmailResponseData>> {
  try {
    const response = await customAxios.post("/api/auth/verifyEmail", {
      email,
      verifyCode,
      isFindPw,
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

export async function checkEmail(
  email: string
): Promise<AxiosResponse<{ message: string }>> {
  try {
    const response = await customAxios.post("/api/auth/checkEmail", {
      email,
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

export async function deleteAllToken(
  email: string
): Promise<AxiosResponse<{ message: string }>> {
  try {
    const response = customAxios.delete("/api/auth/deleteToken", {
      data: { email },
    });
    return response;
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

export async function getGoogleUserInfo(
  code: string
): Promise<
  AxiosResponse<{ user: GoogleAuthInfoResponseData; message: string }>
> {
  try {
    const response = await customAxios.post("/api/auth/signin/google/user", {
      code,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function googleSignin(
  user: GoogleAuthInfoResponseData
): Promise<AxiosResponse<SigninResponseData>> {
  try {
    const response = await customAxios.post("/api/auth/signin/google", {
      user,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getKakaoAuthAccessToken(
  code: string
): Promise<AxiosResponse<KaKaoAuthAccessTokenResponseData>> {
  try {
    const response = await customAxios(
      `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&code=${code}`
    );
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getKaKaoAuthInfo(
  accessToken: string
): Promise<AxiosResponse<KakaoAuthInfoResponseData>> {
  try {
    const userInfoUrl = "https://kapi.kakao.com/v2/user/me";
    const response = await customAxios(userInfoUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function getKakaoUserInfo(
  code: string
): Promise<
  AxiosResponse<{ user: KakaoAuthInfoResponseData; message: string }>
> {
  try {
    const response = await customAxios.post("/api/auth/signin/kakao/user", {
      code,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function kakaoSignin(
  user: KakaoAuthInfoResponseData
): Promise<AxiosResponse<SigninResponseData>> {
  try {
    const response = await customAxios.post("/api/auth/signin/kakao", {
      user,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function changePassword({
  email,
  password,
  currentPassword,
  isFindPw,
}: {
  email?: string;
  password: string;
  currentPassword?: string;
  isFindPw?: boolean;
}): Promise<AxiosResponse<{ message: string }>> {
  try {
    const response = await customAxios.patch("/api/auth/changePassword", {
      email,
      password,
      currentPassword,
      isFindPw,
    });
    return response;
  } catch (error) {
    throw error;
  }
}
