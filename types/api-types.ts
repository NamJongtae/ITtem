import { IronSession } from "iron-session";
import {
  ProductData,
  ProductDetailData,
  ProductReviewData,
  PurchaseTradingData,
  SaleTradingData,
} from "./product-types";
import { AuthData, ProfileData, ProfileReviewData } from "./auth-types";
import { NotificationMessageData } from "./notification-types";

export interface VerifyEmailResponseData {
  message: string;
  ok: boolean;
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
  url: string;
  name: string;
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

export interface KaKaoAuthAccessTokenResponseData {
  token_type: string;
  access_token: string;
  refresh_token: string;
  id_token: string;
  expires_in: number;
  refresh_token_expires_in: string;
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

export interface ApiResponse<T> {
  message: string;
}

export interface ProductListResponseData extends ApiResponse<ProductData[]> {
  products: ProductData[];
}

export interface ProductResponseData extends ApiResponse<ProductData> {
  product: ProductData;
}

export interface ProductDetailResponseData
  extends ApiResponse<ProductDetailData> {
  product: ProductDetailData;
}

export interface ProfileResponseData extends ApiResponse<ProfileData> {
  profile: ProfileData;
}

export interface FollowersResponseData extends ApiResponse<ProfileData[]> {
  followers: ProfileData[];
}

export interface FollowingsResponseData extends ApiResponse<ProfileData[]> {
  followings: ProfileData[];
}

export interface WishResponseData extends ApiResponse<ProductData[]> {
  products: ProductData[];
}

export interface ReviewsResponseData extends ApiResponse<ProfileReviewData[]> {
  reviews: ProfileReviewData[];
}

export interface SalesTradingResponseData
  extends ApiResponse<SaleTradingData[]> {
  saleTrading: SaleTradingData[];
}

export interface PurchaseTradingResponseData
  extends ApiResponse<PurchaseTradingData[]> {
  purchaseTrading: PurchaseTradingData[];
}

export interface ReviewResponseData extends ApiResponse<ProductReviewData> {
  review: ProductReviewData;
}

export interface NotificationResponseData
  extends ApiResponse<{
    messages: NotificationMessageData[];
    nextKey: string;
  }> {
  messages: NotificationMessageData[];
  nextKey: string;
}

export interface StartChatResponseData extends ApiResponse<string> {
  chatRoomId: string;
}
