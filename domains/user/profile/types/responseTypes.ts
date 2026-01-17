import { ApiResponse } from "@/shared/common/types/responseTypes";
import {
  FollowUserData,
  ProfileData,
  ProfileReviewData,
  WishlistProductData
} from "./profileTypes";

export interface ProfileResponseData extends ApiResponse {
  profile: ProfileData;
}

export interface FollowStatusResponseData extends ApiResponse {
  isFollow: boolean;
}

export interface FollowersResponseData extends ApiResponse {
  followers: FollowUserData[];
}

export interface FollowingsResponseData extends ApiResponse {
  followings: FollowUserData[];
}

export interface ReceivedReviewsResponseData extends ApiResponse {
  reviews: ProfileReviewData[];
}

export interface WishlistProductResponseData extends ApiResponse {
  products: WishlistProductData[];
}
