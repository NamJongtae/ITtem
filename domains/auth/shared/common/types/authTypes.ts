import { IronSession } from "iron-session";
import { ObjectId } from "mongodb";
import { LoginType } from "../../../signin/types/signinTypes";

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

export interface IronSessionData {
  accessToken: string;
  refreshToken: string;
}

export type IronSessionType = IronSession<IronSessionData>;

