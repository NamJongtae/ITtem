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
  VerificationEmailResponseData
} from "@/types/api-types";
import { AxiosResponse } from "axios";
import { uploadImgToFireStore } from "./firebase";
import customAxios from "../customAxios";
import {
  AuthData,
  SignupData,
  EmailVerificationType
} from "@/types/auth-types";
import { toast } from "react-toastify";

export async function createAccount({
  email,
  password,
  nickname,
  profileImgFile,
  introduce
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
      profileImgData: imgData || { url: "/icons/user-icon.svg", name: "" },
      introduce
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

export async function verificationPassword(
  password: string,
  hashedPassword: string
) {
  try {
    const { compare } = await import("bcryptjs");

    const isVerification = await compare(password, hashedPassword);
    return isVerification;
  } catch (error) {
    throw error;
  }
}

export async function sendToSignupVerificationEmail(
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

export async function sendToResetPwVerificationEmail(
  email: string
): Promise<AxiosResponse<VerificationEmailResponseData>> {
  try {
    const response = await customAxios.post("/api/auth/send-resetpw-code", {
      email
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function verificationEmail(
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

export async function checkEmailDuplication(
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

export async function checkNicknameDuplication(
  nickname: string
): Promise<AxiosResponse<NicknameDuplicationResponseData>> {
  try {
    const response = await customAxios.post("/api/auth/duplication/nickname", {
      nickname
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
    const response = await customAxios.post("/api/auth/check-email", {
      email
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
      isDuplicateLogin
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function signout(
  uid: string
): Promise<AxiosResponse<SignoutResposeData>> {
  try {
    const response = await customAxios.post("/api/auth/signout", {
      uid
    });
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
    const respose = await customAxios("/api/auth/refresh-token");
    return respose;
  } catch (error) {
    throw error;
  }
}

export async function deleteAllToken(
  email: string
): Promise<AxiosResponse<{ message: string }>> {
  try {
    const response = customAxios.delete("/api/auth/delete-token", {
      data: { email }
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
    grant_type: "authorization_code"
  });

  try {
    const response = await customAxios.post(
      `https://oauth2.googleapis.com/token`,
      params.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
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
      code
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
      user
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
        Authorization: `Bearer ${accessToken}`
      }
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
      code
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
      user
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function changePassword({
  password,
  currentPassword
}: {
  password: string;
  currentPassword: string;
}): Promise<AxiosResponse<{ message: string }>> {
  try {
    const response = await customAxios.patch("/api/auth/change-password", {
      password,
      currentPassword
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export async function resetPassword({
  email,
  password
}: {
  email?: string;
  password: string;
}): Promise<AxiosResponse<{ message: string }>> {
  try {
    const response = await customAxios.patch("/api/auth/reset-password", {
      email,
      password
    });
    return response;
  } catch (error) {
    throw error;
  }
}
