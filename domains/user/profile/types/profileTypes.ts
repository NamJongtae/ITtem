import { ProductImgData } from "@/domains/product/shared/types/productTypes";
import { ApiResponse } from "@/shared/common/types/responseTypes";

export interface ReviewSummaryData {
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
  followersCount: number;
  followingsCount: number;
  isFollow?: boolean;
  wishCount?: number;
  productIds: string[];
  saleCount: number;
  purchaseCount: number;
  transactionCount: number;
  reviewInfo?: ReviewSummaryData;
  reviewPercentage: number;
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

export interface WishlistProductData {
  _id: string;
  name: string;
  createdAt?: Date | string;
  imgData: ProductImgData[];
  location: string;
  price: number;
}

export interface DeleteWishlistProductDataResponseData extends ApiResponse {
  wishProductIds: string[];
}

export type ProfileMenu =
  | "products"
  | "reviews"
  | "followers"
  | "followings"
  | "wishlist";

export interface FollowUserData {
  uid: string;
  nickname: string;
  profileImg: string;
  followersCount: number;
  followingsCount: number;
  isFollow: boolean;
  productIds: string[];
  reviewPercentage: number;
}
