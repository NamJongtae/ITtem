import { ObjectId } from "mongodb";
import { IronSession } from "iron-session";

export interface VerifyEmailResponseData {
  message: string;
  ok: boolean;
}

export interface SignupRequsetData {
  socialType: SocialType;
  email: string;
  password: string;
  profileImg: File | "";
  nickname: string;
  introduce: string;
}

export interface SignupResponseData {
  message: string;
  user: { nickname: string; profileImg: string };
}

export interface EmailDuplicationResponseData {
  message: string;
  ok: boolean;
}

export interface NicknameDuplicationResponseData {
  message: string;
  ok: boolean;
}

export interface UploadImgResponseData {
  imgUrl: string;
  fileName: string;
}

export interface UserData {
  _id: ObjectId;
  uid: string;
  socialType: SocialType;
  email: string;
  password: string;
  nickname: string;
  profileImg: string;
  profieImgfilename: string;
  introduce: string;
  productList: [];
  wishList: [];
  followers: [];
  followings: [];
  chatRoomList: [];
}

export interface AuthData {
  uid: string;
  email: string;
  nickname: string;
  profileImg: string;
}

export interface SigninResponseData {
  user: AuthData;
  message: string;
}

export interface IronSessionData {
  accessToken: string;
  refreshToken: string;
}

export type IronSessionType = IronSession<IronSessionData>;

export interface SessionCookiesResponseData {
  message: string;
  ok: boolean;
}

export interface RegenerateAccessTokenResponseData {
  message: string;
}

export interface SignoutResposeData {
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

export const enum SocialType {
  EMAIL = "EMAIL",
  GOOGLE = "GOOGLE",
  KAKAO = "KAKAO",
}
