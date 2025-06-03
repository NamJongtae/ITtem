import { ProductData } from "@/domains/product/shared/types/productTypes";
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
  followers: string[];
  followings: string[];
  productIds: string[];
  wishProductIds: string[];
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

export interface WishlistProductData extends ApiResponse {
  products: ProductData[];
}

export interface DeleteWishlistProductDataResponseData extends ApiResponse {
  wishProductIds: string[];
}

export type ProfileMenu = "판매상품" | "거래후기" | "팔로잉" | "팔로워" | "찜";

export interface FollowUserData {
  uid: string;
  nickname: string;
  profileImg: string;
  followers: string[];
  followings: string[];
  productIds: string[];
  reviewPercentage: number;
}
