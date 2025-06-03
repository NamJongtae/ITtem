import { ApiResponse } from "@/shared/common/types/responseTypes";
import { FollowUserData, ProfileData, ProfileReviewData } from "./profileTypes";

export interface ProfileResponseData extends ApiResponse {
  profile: ProfileData;
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
