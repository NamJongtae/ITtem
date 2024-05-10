import { ObjectId } from 'mongodb';

export const enum LoginType {
  EMAIL = "EMAIL",
  GOOGLE = "GOOGLE",
  KAKAO = "KAKAO",
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

export interface SignupData {
  email: string;
  password: string;
  profileImgFile: File | "";
  nickname: string;
  introduce: string;
}

export interface AuthData {
  uid: string;
  email: string;
  nickname: string;
  profileImg: string;
}

export interface ProfileData {
  uid: string;
  email: string;
  nickname: string;
  profileImg: string;
  followers: string[];
  followings: string[];
  productIds: string[];
  wishProductIds: string[];
  reviewPercentage: number;
}