import { ObjectId } from "mongodb";

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

export type ReviewTagsData =
  | "상품 정보와 실제 상품이 동일해요"
  | "친절해요"
  | "배송이 빨라요"
  | "채팅 답변이 빨라요"
  | "제품이 깔끔해요";

export interface ReivewInfoData {
  totalReviewScore: number;
  totalReviewCount: number;
  reviewPercentage: number;
  reviewTags: number[];
}
export interface ProfileData {
  uid: string;
  email: string;
  nickname: string;
  profileImg: string;
  profileImgFilename: string;
  introduce: string;
  followers: string[];
  followings: string[];
  productIds: string[];
  wishProductIds: string[];
  saleCount: number;
  purchaseCount: number;
  transactionCount: number;
  reviewInfo?: ReivewInfoData;
  reviewPercentage: number;
}

export interface ProfileEditData {
  profileImg: string;
  profileImgFilename: string;
  nickname: string;
  introduce: string;
}

export interface ProfileReviewData {
  _id: string;
  reviewScore: number;
  productName: string;
  productId: string;
  reviewContent: string;
  sellerId: string;
  createdAt: string;
  reviewTags: number[];
  reviewer: {
    nickname: string;
    profileImg: string;
    uid: string;
  };
}
