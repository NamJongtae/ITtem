import { AuthData } from "../../shared/common/types/authTypes";

export interface SigninResponseData {
  user: AuthData;
  message: string;
}

export interface GoogleAuthAccessTokenResponseData {
  access_token: string;
  authuser: string;
  expires_in: number;
  prompot: string;
  scope: string;
  token_type: string;
}

export interface GoogleAuthInfoResponseData {
  email: string;
  given_name: string;
  id: string;
  locale: string;
  name: string;
  picture: string;
  verifired_email: boolean;
}

export interface KaKaoAuthAccessTokenResponseData {
  token_type: string;
  access_token: string;
  refresh_token: string;
  id_token: string;
  expires_in: number;
  refresh_token_expires_in: number;
  scope: string;
}

export interface KakaoAuthInfoResponseData {
  id: number;
  connected_at: string;
  properties: {
    nickname: string;
    profile_image?: string; // 640x640
    thumbnail_image?: string; // 110x110
  };
}
