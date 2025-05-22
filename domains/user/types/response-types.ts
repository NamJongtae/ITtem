import { ApiResponse } from "@/types/response-types";
import { ProfileData, ProfileReviewData } from "./profile-types";

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
