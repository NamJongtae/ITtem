import { ApiResponse } from "@/shared/common/types/responseTypes";
import { ProfileData, ProfileReviewData } from "./profileTypes";

export interface ProfileResponseData extends ApiResponse {
  profile: ProfileData;
}

export interface FollowersResponseData extends ApiResponse {
  followers: ProfileData[];
}

export interface FollowingsResponseData extends ApiResponse {
  followings: ProfileData[];
}

export interface ReceivedReviewsResponseData extends ApiResponse {
  reviews: ProfileReviewData[];
}
