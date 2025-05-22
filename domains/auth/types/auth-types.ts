import { IronSession } from 'iron-session';
import { ObjectId } from "mongodb";

export const enum LoginType {
  EMAIL = "EMAIL",
  GOOGLE = "GOOGLE",
  KAKAO = "KAKAO"
}

export interface UserData {
  _id: ObjectId;
  uid: string;
  loginType: LoginType;
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

export interface SignupData {
  email: string;
  password: string;
  profileImgFile: File | "";
  nickname: string;
  introduce: string;
}

export interface IronSessionData {
  accessToken: string;
  refreshToken: string;
}

export type IronSessionType = IronSession<IronSessionData>;

export type EmailVerificationType = "signup" | "resetPw";
export type EmailVerificationStatus = "INITIAL" | "SEND" | "VERFICATION";
